import { useState, useEffect } from "react";

type Session = {
  id?: number;
  date: string;
  part: string;
  volume: number;
};

const API_URL = "http://localhost:5000/sessions";

function App() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [date, setDate] = useState("");
  const [part, setPart] = useState("");
  const [volume, setVolume] = useState<number | "">("");
  const [loading, setLoading] = useState(true);

  // ✅ サーバーからデータ取得
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch((err) => console.error("取得エラー:", err));
  }, []);

  // ✅ 新しいセッション追加
  const addSession = async () => {
    if (!date || !part || !volume) {
      alert("日付・部位・ボリュームをすべて入力してください！");
      return;
    }
    const newSession = { date, part, volume: Number(volume) };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSession),
    });

    if (res.ok) {
      const updated = await fetch(API_URL).then((r) => r.json());
      setSessions(updated);
      setDate("");
      setPart("");
      setVolume("");
    }
  };

  // ✅ セッション削除
  const deleteSession = async (id?: number) => {
    if (!id) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const updated = await fetch(API_URL).then((r) => r.json());
    setSessions(updated);
  };

  if (loading) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>筋録</h1>

      {sessions.length === 0 ? (
        <p>記録がまだありません。</p>
      ) : (
        sessions.map((s) => (
          <div
            key={s.id}
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
              onClick={() => deleteSession(s.id)}
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

      {/* 入力フォーム */}
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
