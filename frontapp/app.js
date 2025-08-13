// APIのURL
const apiUrl = 'http://localhost:8000/memos/';

// メモ一覧取得（キャッシュ回避付き）
async function fetchAndDisplayMemos() {
    try {
        const response = await fetch(apiUrl + '?t=' + new Date().getTime(), { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const memos = await response.json();
        const memosTableBody = document.querySelector('#memos tbody');
        memosTableBody.innerHTML = '';

        memos.forEach(memo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${memo.title}</td>
                <td>${memo.description}</td>
                <td>${memo.status.priority}</td>
                <td>${memo.status.due_date ? memo.status.due_date.split('T')[0] : ''}</td>
                <td>${memo.status.is_completed ? '完了' : '未完了'}</td>
            `;
            memosTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('メモ一覧取得中にエラー:', error);
    }
}

// ページ読み込み後に実行
document.addEventListener('DOMContentLoaded', fetchAndDisplayMemos);
