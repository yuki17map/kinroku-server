import { Calendar, Trophy } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface Exercise {
  name: string;
  weight: number;
  reps: number;
  sets: number;
  isPR?: boolean;
}

interface SessionCardProps {
  date: string;
  bodyPart: string;
  bodyPartColor: string;
  bodyPartEmoji: string;
  exercises: Exercise[];
}

export function SessionCard({ date, bodyPart, bodyPartColor, bodyPartEmoji, exercises }: SessionCardProps) {
  return (
    <Card className="mx-4 mb-4 p-4 bg-white border-[#E0E0E0]">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-[#666666]" />
        <span className="text-[#666666]" style={{ fontFamily: 'Inter' }}>
          {date}
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: bodyPartColor }}
        />
        <span className="text-lg">{bodyPartEmoji}</span>
        <Badge 
          variant="secondary" 
          className="text-[#333333]"
          style={{ 
            backgroundColor: `${bodyPartColor}15`,
            color: bodyPartColor,
            fontFamily: 'Noto Sans JP'
          }}
        >
          {bodyPart}
        </Badge>
      </div>

      <div className="space-y-2">
        {exercises.map((exercise, index) => (
          <div key={index} className="flex items-center justify-between pl-4">
            <div className="flex items-center gap-2">
              <span className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                ・{exercise.name}
              </span>
              {exercise.isPR && (
                <Trophy className="w-4 h-4 text-[#00C853]" />
              )}
            </div>
            <span className="text-[#666666]" style={{ fontFamily: 'Inter' }}>
              {exercise.weight}kg × {exercise.reps}回 × {exercise.sets}set
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}