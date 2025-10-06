import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface KinrokuHeaderProps {
  onAddSession: () => void;
}

export function KinrokuHeader({ onAddSession }: KinrokuHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
      <h1 className="text-2xl text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
        筋録
      </h1>
      <Button 
        size="sm" 
        onClick={onAddSession}
        className="bg-[#007AFF] hover:bg-[#0056CC] text-white rounded-full w-8 h-8 p-0"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </header>
  );
}