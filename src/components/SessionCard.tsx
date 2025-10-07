import React from "react";

type Props = {
  date: string;
  part: string;
  volume: number;
  onDelete?: () => void;
};

export function SessionCard({ date, part, volume, onDelete }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">📅 {date}</p>
          <p className="text-lg font-medium">
            {part}（{volume.toLocaleString()}kg）
          </p>
        </div>

        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition"
          >
            🗑️ 削除
          </button>
        )}
      </div>
    </div>
  );
}
