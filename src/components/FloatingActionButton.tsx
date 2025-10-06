import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface FloatingActionButtonProps {
  onAddSession: () => void;
}

export function FloatingActionButton({ onAddSession }: FloatingActionButtonProps) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        size="lg"
        onClick={onAddSession}
        className="w-14 h-14 rounded-full bg-[#007AFF] hover:bg-[#0056CC] text-white shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </motion.div>
  );
}