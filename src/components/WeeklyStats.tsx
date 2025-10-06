import { BarChart3 } from 'lucide-react';
import { Card } from './ui/card';

export function WeeklyStats() {
  return (
    <Card className="mx-4 my-4 p-4 bg-[#F8F9FA] border-[#E0E0E0]">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-5 h-5 text-[#007AFF]" />
        <h2 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
          今週の統計
        </h2>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[#666666]" style={{ fontFamily: 'Noto Sans JP' }}>
            セッション数
          </span>
          <span className="text-[#333333]" style={{ fontFamily: 'Inter' }}>
            3回
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#666666]" style={{ fontFamily: 'Noto Sans JP' }}>
            合計ボリューム
          </span>
          <span className="text-[#333333]" style={{ fontFamily: 'Inter' }}>
            15,000kg
          </span>
        </div>
      </div>
    </Card>
  );
}