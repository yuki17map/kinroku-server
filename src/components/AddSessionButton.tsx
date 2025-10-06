import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface AddSessionButtonProps {
  onAddSession: () => void;
}

export function AddSessionButton({ onAddSession }: AddSessionButtonProps) {
  return (
    <div className="mx-4 mb-4">
      <Button 
        onClick={onAddSession}
        className="w-full bg-white border-2 border-dashed border-[#007AFF] text-[#007AFF] hover:bg-[#F0F8FF] h-12"
        style={{ fontFamily: 'Noto Sans JP' }}
      >
        <Plus className="w-4 h-4 mr-2" />
        新しいセッションを追加
      </Button>
    </div>
  );
}