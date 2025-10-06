import { useState, useEffect } from "react";

type Session = {
  date: string;
  part: string;
  volume: number;
};

function App() {
  // 1️⃣ 保存データの読み込み
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });

  // 2️⃣ 入力フォームの状態を管理
  const [date, setDate] = useState("");
  const [part, setPart] = useState("");
  const [volume, setVolume] = useState<number | "">("");

  // 3️⃣ データが変わるたび localStorage に保存
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  // 4️⃣ 新しいセッションを追加
  const addSession = () => {
    if (!date || !part || !volume) {
      alert("日付・部位・ボリュームをすべて入力してください！");
      return;
    }
    const newSession = { date, part, volume: Number(volume) };
    setSessions([...sessions, newSession]);
    // 入力欄をリセット
    setDate("");
    setPart("");
    setVolume("");
  };

  // 5️⃣ セッション削除
  const deleteSession = (index: number) => {
    const updated = sessions.filter((_, i) => i !== index);
    setSessions(updated);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>筋録</h1>

      {/* 📋 記録一覧 */}
      {sessions.length === 0 ? (
        <p>記録がまだありません。</p>
      ) : (
        sessions.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f4f4f4",
              margin: "8px 0",
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            <p style={{ margin: 0 }}>
              📅 {s.date}：{s.part}（{s.volume}kg）
            </p>
            <button
              onClick={() => deleteSession(i)}
              style={{
                background: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              🗑️削除
            </button>
          </div>
        ))
      )}

      {/* ✏️ 入力フォーム */}
      <div
        style={{
          background: "#fafafa",
          marginTop: "20px",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <h3>新しい記録を追加</h3>
        <label>
          📅 日付：
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="例：10/08"
            style={{ width: "100%", marginBottom: "8px" }}
          />
        </label>

        <label>
          💪 部位：
          <input
            type="text"
            value={part}
            onChange={(e) => setPart(e.target.value)}
            placeholder="例：胸・脚・背中"
            style={{ width: "100%", marginBottom: "8px" }}
          />
        </label>

        <label>
          🏋️‍♂️ ボリューム（kg）：
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            placeholder="例：12000"
            style={{ width: "100%", marginBottom: "8px" }}
          />
        </label>

        <button
          onClick={addSession}
          style={{
            width: "100%",
            background: "#007AFF",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          ＋ 記録を追加
        </button>
      </div>
    </div>
  );
}

export default App;
