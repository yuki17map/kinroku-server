import { useState } from 'react';
import { ArrowLeft, Calendar, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

interface NewSessionScreenProps {
  onBack: () => void;
}

interface WorkoutSet {
  id: number;
  weight: number;
  reps: number;
}

const bodyParts = [
  { name: '胸', color: '#FF4B4B', emoji: '💪' },
  { name: '肩', color: '#FF9500', emoji: '🏋️' },
  { name: '背中', color: '#00C853', emoji: '💚' },
  { name: '二頭', color: '#9C27B0', emoji: '💜' },
  { name: '三頭', color: '#795548', emoji: '🤎' },
  { name: '脚', color: '#007AFF', emoji: '🦵' }
];

const exercises = {
  '胸': ['ベンチプレス', 'ダンベルフライ', 'インクラインベンチプレス'],
  '肩': ['ショルダープレス', 'サイドレイズ', 'リアレイズ'],
  '背中': ['デッドリフト', 'ラットプルダウン', 'ベントオーバーロウ'],
  '二頭': ['バーベルカール', 'ダンベルカール', 'ハンマーカール'],
  '三頭': ['ディップス', 'トライセプスエクステンション', 'プッシュダウン'],
  '脚': ['スクワット', 'レッグプレス', 'レッグエクステンション']
};

export function NewSessionScreen({ onBack }: NewSessionScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [sets, setSets] = useState<WorkoutSet[]>([
    { id: 1, weight: 80, reps: 10 }
  ]);

  const addSet = () => {
    const newSet: WorkoutSet = {
      id: Date.now(),
      weight: sets[sets.length - 1]?.weight || 80,
      reps: sets[sets.length - 1]?.reps || 10
    };
    setSets([...sets, newSet]);
  };

  const updateSet = (id: number, field: 'weight' | 'reps', value: number) => {
    setSets(sets.map(set => 
      set.id === id ? { ...set, [field]: value } : set
    ));
  };

  const selectedBodyPartData = bodyParts.find(bp => bp.name === selectedBodyPart);

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
            新規セッション
          </h1>
          <div className="w-16"></div>
        </header>

        <main className="p-4 space-y-6">
          {/* 日付選択 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-[#007AFF]" />
              <h2 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                日付
              </h2>
            </div>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-[#E0E0E0]"
            />
          </div>

          {/* 部位選択 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-[#007AFF] rounded"></div>
              <h2 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                部位
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {bodyParts.map((bodyPart) => (
                <Button
                  key={bodyPart.name}
                  variant={selectedBodyPart === bodyPart.name ? "default" : "outline"}
                  className={`h-12 ${
                    selectedBodyPart === bodyPart.name 
                      ? `bg-[${bodyPart.color}] text-white hover:bg-[${bodyPart.color}]` 
                      : 'border-[#E0E0E0] text-[#333333] hover:bg-[#F8F9FA]'
                  }`}
                  onClick={() => setSelectedBodyPart(bodyPart.name)}
                  style={{
                    backgroundColor: selectedBodyPart === bodyPart.name ? bodyPart.color : undefined,
                    fontFamily: 'Noto Sans JP'
                  }}
                >
                  {bodyPart.emoji} {bodyPart.name}
                </Button>
              ))}
            </div>
          </div>

          {/* 種目選択 */}
          {selectedBodyPart && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🏋️</span>
                <h2 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                  種目
                </h2>
              </div>
              <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                <SelectTrigger className="border-[#E0E0E0]">
                  <SelectValue placeholder="種目を選択" />
                </SelectTrigger>
                <SelectContent>
                  {exercises[selectedBodyPart as keyof typeof exercises]?.map((exercise) => (
                    <SelectItem key={exercise} value={exercise}>
                      {exercise}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="ghost" 
                className="w-full mt-2 text-[#007AFF] border-dashed border border-[#007AFF]"
                style={{ fontFamily: 'Noto Sans JP' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                新しい種目を追加
              </Button>
            </div>
          )}

          {/* セット管理 */}
          {selectedExercise && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📋</span>
                <h2 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                  セット
                </h2>
              </div>
              <div className="space-y-3">
                {sets.map((set, index) => (
                  <Card key={set.id} className="p-3 border-[#E0E0E0]">
                    <div className="flex items-center gap-3">
                      <span className="text-[#666666] min-w-[60px]" style={{ fontFamily: 'Noto Sans JP' }}>
                        {index + 1}セット目：
                      </span>
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          type="number"
                          value={set.weight}
                          onChange={(e) => updateSet(set.id, 'weight', parseInt(e.target.value) || 0)}
                          className="w-16 h-8 text-center border-[#E0E0E0]"
                        />
                        <span className="text-sm text-[#666666]">kg ×</span>
                        <Input
                          type="number"
                          value={set.reps}
                          onChange={(e) => updateSet(set.id, 'reps', parseInt(e.target.value) || 0)}
                          className="w-16 h-8 text-center border-[#E0E0E0]"
                        />
                        <span className="text-sm text-[#666666]">回</span>
                      </div>
                    </div>
                  </Card>
                ))}
                <Button 
                  variant="ghost" 
                  onClick={addSet}
                  className="w-full text-[#007AFF] border-dashed border border-[#007AFF]"
                  style={{ fontFamily: 'Noto Sans JP' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  セットを追加
                </Button>
              </div>
            </div>
          )}

          {/* 保存ボタン */}
          <div className="pt-6">
            <Button 
              className="w-full h-12 bg-[#007AFF] hover:bg-[#0056CC] text-white"
              style={{ fontFamily: 'Noto Sans JP' }}
              disabled={!selectedBodyPart || !selectedExercise || sets.length === 0}
            >
              <span className="mr-2">💾</span>
              保存する（このセッションを登録）
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}