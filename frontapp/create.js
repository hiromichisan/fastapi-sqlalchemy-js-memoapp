document.getElementById("createMemoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // 入力値の取得
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const dueDateValue = document.getElementById("due_date").value;
    const isCompleted = document.getElementById("is_completed").checked;

    // due_dateは空欄ならnull、値があればISO8601形式の文字列に
    const dueDateISO = dueDateValue ? `${dueDateValue}T00:00:00` : null;

    // Pydanticに合わせたネスト構造
    const memoData = {
        title: title,
        description: description,
        status: {
            priority: priority,
            due_date: dueDateISO,
            is_completed: isCompleted
        }
    };

    try {
        const res = await fetch("http://127.0.0.1:8000/memos/", { // ← 末尾スラッシュ必須
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(memoData)
        });

        if (res.ok) {
            alert("メモを作成しました");
            window.location.href = "list.html";
        } else {
            const err = await res.json();
            console.error("エラー詳細:", err);
            alert("エラー: " + JSON.stringify(err.detail || err));
        }
    } catch (error) {
        console.error("通信エラー:", error);
        alert("通信エラーが発生しました");
    }
});
