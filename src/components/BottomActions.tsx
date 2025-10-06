import { Calendar, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

interface BottomActionsProps {
  onHistory: () => void;
  onAnalysis: () => void;
}

export function BottomActions({ onHistory, onAnalysis }: BottomActionsProps) {
  return (
    <div className="flex gap-3 mx-4 mb-6">
      <Button 
        variant="outline" 
        onClick={onHistory}
        className="flex-1 h-12 border-[#E0E0E0] text-[#666666] hover:bg-[#F8F9FA]"
        style={{ fontFamily: 'Noto Sans JP' }}
      >
        <Calendar className="w-4 h-4 mr-2" />
        履歴（カレンダー表示）
      </Button>
      <Button 
        variant="outline" 
        onClick={onAnalysis}
        className="flex-1 h-12 border-[#E0E0E0] text-[#666666] hover:bg-[#F8F9FA]"
        style={{ fontFamily: 'Noto Sans JP' }}
      >
        <TrendingUp className="w-4 h-4 mr-2" />
        詳細統計を見る
      </Button>
    </div>
  );
}