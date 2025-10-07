import { useState, useEffect } from "react";
import { KinrokuHeader } from "./components/KinrokuHeader";
import { WeeklyStats } from "./components/WeeklyStats";
import { SessionCard } from "./components/SessionCard";
import { AddSessionButton } from "./components/AddSessionButton";
import "./styles/globals.css";

// 型定義
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

  // 2️⃣ 入力フォームの状態
  const [date, setDate] = useState("");
  const [part, setPart] = useState("");
  const [volume, setVolume] = useState<number | "">("");

  // 3️⃣ localStorageへ自動保存
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  // 4️⃣ 新しいセッション追加
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

  // 5️⃣ セッション削除
  const deleteSession = (index: number) => {
    const updated = sessions.filter((_, i) => i !== index);
    setSessions(updated);
  };

  // 6️⃣ 統計（セッション数と総ボリューム）
  const totalVolume = sessions.reduce((sum, s) => sum + s.volume, 0);
  const sessionCount = sessions.length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#333333] font-sans p-4 max-w-md mx-auto">
      {/* ヘッダー */}
      <KinrokuHeader title="筋録" />

      {/* 今週の統計 */}
      <WeeklyStats sessionCount={sessionCount} totalVolume={totalVolume} />

      {/* 記録一覧 */}
      <div className="mt-4 space-y-3">
        {sessions.length === 0 ? (
          <p className="text-gray-500">記録がまだありません。</p>
        ) : (
          sessions.map((s, i) => (
            <SessionCard
              key={i}
              date={s.date}
              part={s.part}
              volume={s.volume}
              onDelete={() => deleteSession(i)}
            />
          ))
        )}
      </div>

      {/* 新規追加フォーム */}
      <div className="bg-white p-4 mt-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-medium mb-3">新しい記録を追加</h3>

        <label className="block mb-2 text-sm font-medium">📅 日付</label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="例：10/08"
          className="w-full mb-3 p-2 border rounded-md focus:ring focus:ring-blue-300"
        />

        <label className="block mb-2 text-sm font-medium">💪 部位</label>
        <input
          type="text"
          value={part}
          onChange={(e) => setPart(e.target.value)}
          placeholder="例：胸・脚・背中"
          className="w-full mb-3 p-2 border rounded-md focus:ring focus:ring-blue-300"
        />

        <label className="block mb-2 text-sm font-medium">🏋️‍♂️ ボリューム（kg）</label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          placeholder="例：12000"
          className="w-full mb-4 p-2 border rounded-md focus:ring focus:ring-blue-300"
        />

        <AddSessionButton onClick={addSession} />
      </div>
    </div>
  );
}

export default App;
