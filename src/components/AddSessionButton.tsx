import React from "react";

type Props = {
  onClick: () => void;
};

export function AddSessionButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full border-2 border-dashed border-blue-500 text-blue-600 rounded-lg py-3 mt-4 hover:bg-blue-50 transition"
    >
      ＋ 新しいセッションを追加
    </button>
  );
}
