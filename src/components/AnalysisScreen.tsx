import { useState } from 'react';
import { ArrowLeft, BarChart3, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalysisScreenProps {
  onBack: () => void;
}

const exerciseData = [
  { date: '9/20', weight: 80 },
  { date: '9/25', weight: 85 },
  { date: '10/01', weight: 90 }
];

const bodyPartData = [
  { name: '胸', value: 30, color: '#FF4B4B' },
  { name: '肩', value: 20, color: '#FF9500' },
  { name: '脚', value: 25, color: '#007AFF' },
  { name: '背中', value: 15, color: '#00C853' },
  { name: '二頭', value: 5, color: '#9C27B0' },
  { name: '三頭', value: 5, color: '#795548' }
];

const exercises = ['ベンチプレス', 'スクワット', 'デッドリフト', 'ショルダープレス'];

export function AnalysisScreen({ onBack }: AnalysisScreenProps) {
  const [selectedExercise, setSelectedExercise] = useState('ベンチプレス');

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
            分析
          </h1>
          <div className="w-16"></div>
        </header>

        <main className="p-4 space-y-6">
          {/* 種目ごとの推移 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-[#007AFF]" />
              <h2 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                種目ごとの推移
              </h2>
            </div>
            
            <div className="mb-4">
              <label className="text-sm text-[#666666] mb-2 block" style={{ fontFamily: 'Noto Sans JP' }}>
                種目：
              </label>
              <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                <SelectTrigger className="border-[#E0E0E0]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {exercises.map((exercise) => (
                    <SelectItem key={exercise} value={exercise}>
                      {exercise}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card className="p-4 border-[#E0E0E0]">
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={exerciseData}>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666666' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666666' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#007AFF" 
                      strokeWidth={2}
                      dot={{ fill: '#007AFF', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="text-sm text-[#666666] space-y-1">
                <div style={{ fontFamily: 'Inter' }}>9/20: 80kg</div>
                <div style={{ fontFamily: 'Inter' }}>9/25: 85kg</div>
                <div className="flex items-center gap-1" style={{ fontFamily: 'Inter' }}>
                  10/01: 90kg
                  <Trophy className="w-4 h-4 text-[#00C853]" />
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-[#F8F9FA] rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666]" style={{ fontFamily: 'Noto Sans JP' }}>
                    📝 最大重量：
                  </span>
                  <span className="text-[#333333]" style={{ fontFamily: 'Inter' }}>
                    90kg
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[#666666]" style={{ fontFamily: 'Noto Sans JP' }}>
                    更新日：
                  </span>
                  <span className="text-[#333333]" style={{ fontFamily: 'Inter' }}>
                    10/01
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* 部位比率 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-[#007AFF]" />
              <h2 className="text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                部位比率（今週）
              </h2>
            </div>
            
            <Card className="p-4 border-[#E0E0E0]">
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bodyPartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {bodyPartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {bodyPartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-[#333333]" style={{ fontFamily: 'Noto Sans JP' }}>
                      {item.name} {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}