import { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface HistoryScreenProps {
  onBack: () => void;
}

const months = [
  '2025年10月', '2025年9月', '2025年8月', '2025年7月'
];

const calendarData = {
  '2025年10月': [
    { date: 1, bodyPart: '肩', color: '#FF9500', emoji: '🟠' },
    { date: 3, bodyPart: '脚', color: '#007AFF', emoji: '🔵' },
    { date: 8, bodyPart: '胸', color: '#FF4B4B', emoji: '🔴' }
  ]
};

const sessionDetails = {
  '10/03': {
    bodyPart: '脚',
    color: '#007AFF',
    emoji: '🦵',
    exercises: [
      { name: 'スクワット', weight: 100, reps: 8, sets: 3 },
      { name: 'レッグプレス', weight: 140, reps: 12, sets: 2 }
    ]
  },
  '10/01': {
    bodyPart: '肩',
    color: '#FF9500',
    emoji: '🏋️',
    exercises: [
      { name: 'ショルダープレス', weight: 40, reps: 8, sets: 3 },
      { name: 'サイドレイズ', weight: 10, reps: 15, sets: 3 }
    ]
  }
};

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [selectedMonth, setSelectedMonth] = useState('2025年10月');
  const [selectedDate, setSelectedDate] = useState<string | null>('10/03');

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfWeek = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const renderCalendar = () => {
    const year = 2025;
    const month = 10;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);
    const workoutDays = calendarData[selectedMonth as keyof typeof calendarData] || [];
    
    const days = [];
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    
    // 曜日ヘッダー
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`weekday-${i}`} className="h-8 flex items-center justify-center">
          <span className="text-sm text-[#666666]" style={{ fontFamily: 'Noto Sans JP' }}>
            {weekdays[i]}
          </span>
        </div>
      );
    }
    
    // 空白セル
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }
    
    // 日付セル
    for (let day = 1; day <= daysInMonth; day++) {
      const workout = workoutDays.find(w => w.date === day);
      const dateString = `10/${day.toString().padStart(2, '0')}`;
      const isSelected = selectedDate === dateString;
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(dateString)}
          className={`h-12 flex flex-col items-center justify-center relative rounded-lg ${
            isSelected ? 'bg-[#007AFF] text-white' : 'hover:bg-[#F8F9FA]'
          }`}
        >
          <span className={`text-sm ${isSelected ? 'text-white' : 'text-[#333333]'}`}>
            {day}
          </span>
          {workout && (
            <span className="text-xs absolute bottom-0">
              {workout.emoji}
            </span>
          )}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto min-h-screen bg-white">
        {/* ヘッダー */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-[#E0E0E0]">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-[#007AFF] p-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            戻る
          </Button>
          <h1 className="text-lg text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
            履歴
          </h1>
          <div className="w-16"></div>
        </header>

        <main className="p-4 space-y-6">
          {/* 月選択 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-[#007AFF]" />
              <h2 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                月を選択
              </h2>
            </div>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="border-[#E0E0E0]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* カレンダー */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-[#007AFF]" />
              <h2 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                カレンダー（{selectedMonth}）
              </h2>
            </div>
            <Card className="p-4 border-[#E0E0E0]">
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </Card>
          </div>

          {/* 部位カラー説明 */}
          <Card className="p-3 border-[#E0E0E0]">
            <div className="text-sm text-[#666666] mb-2" style={{ fontFamily: 'Noto Sans JP' }}>
              ※ 部位アイコンで表示
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <span>🔴</span>
                <span className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>胸</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🟠</span>
                <span className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>肩</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🟢</span>
                <span className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>背中</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🟣</span>
                <span className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>二頭</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🟤</span>
                <span className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>三頭</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🔵</span>
                <span className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>脚</span>
              </div>
            </div>
          </Card>

          {/* 選択された日のセッション詳細 */}
          {selectedDate && sessionDetails[selectedDate as keyof typeof sessionDetails] && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#666666]" />
                <h3 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                  選択：{selectedDate}（金）
                </h3>
              </div>
              
              {Object.entries(sessionDetails).map(([date, session]) => {
                if (date !== selectedDate) return null;
                
                return (
                  <Card key={date} className="p-4 border-[#E0E0E0]">
                    <div className="flex items-center gap-2 mb-4">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: session.color }}
                      />
                      <span className="text-lg">{session.emoji}</span>
                      <Badge 
                        variant="secondary" 
                        className="text-[#333333]"
                        style={{ 
                          backgroundColor: `${session.color}15`,
                          color: session.color,
                          fontFamily: 'Noto Sans JP'
                        }}
                      >
                        {session.bodyPart}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {session.exercises.map((exercise, index) => (
                        <div key={index} className="flex items-center justify-between pl-4">
                          <span className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                            ・{exercise.name}
                          </span>
                          <span className="text-[#666666]" style={{ fontFamily: 'Inter' }}>
                            {exercise.weight}kg × {exercise.reps}回 × {exercise.sets}set
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}