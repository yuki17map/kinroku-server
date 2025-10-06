import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Session = {
  date: string;
  part: string;
  volume: number;
};

function App() {
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });

  const [date, setDate] = useState("");
  const [part, setPart] = useState("");
  const [volume, setVolume] = useState<number | "">("");

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = () => {
    if (!date || !part || !volume) {
      alert("日付・部位・ボリュームをすべて入力してください！");
      return;
    }
    const newSession = { date, part, volume: Number(volume) };
    setSessions([...sessions, newSession]);
    setDate("");
    setPart("");
    setVolume("");
  };

  const deleteSession = (index: number) => {
    const updated = sessions.filter((_, i) => i !== index);
    setSessions(updated);
  };

  // 🧮 合計ボリュームを計算
  const totalVolume = sessions.reduce((sum, s) => sum + s.volume, 0);

  // 📊 グラフ用データ（日付ごとの合計）
  const volumeByDate = Object.values(
    sessions.reduce((acc: any, s) => {
      if (!acc[s.date]) acc[s.date] = { date: s.date, volume: 0 };
      acc[s.date].volume += s.volume;
      return acc;
    }, {})
  );

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>筋録</h1>

      {/* 🧮 合計ボリューム */}
      <h2 style={{ color: "#007AFF" }}>合計ボリューム：{totalVolume.toLocaleString()} kg</h2>

      {/* 📊 グラフ表示 */}
      {sessions.length > 0 && (
        <div
          style={{
            height: 200,
            margin: "20px 0",
            background: "#f9f9f9",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeByDate}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#007AFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

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
            placeholder="例：10/10"
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
            placeholder="例：15000"
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
