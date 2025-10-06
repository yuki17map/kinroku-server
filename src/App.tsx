import { useState } from 'react';
import { KinrokuHeader } from './components/KinrokuHeader';
import { WeeklyStats } from './components/WeeklyStats';
import { AddSessionButton } from './components/AddSessionButton';
import { SessionCard } from './components/SessionCard';
import { BottomActions } from './components/BottomActions';
import { FloatingActionButton } from './components/FloatingActionButton';
import { NewSessionScreen } from './components/NewSessionScreen';
import { AnalysisScreen } from './components/AnalysisScreen';
import { HistoryScreen } from './components/HistoryScreen';

const sessionsData = [
  {
    date: '10/03（金）',
    bodyPart: '脚',
    bodyPartColor: '#007AFF',
    bodyPartEmoji: '🦵',
    exercises: [
      { name: 'スクワット', weight: 100, reps: 8, sets: 3 },
      { name: 'レッグプレス', weight: 140, reps: 12, sets: 2 }
    ]
  },
  {
    date: '10/01（水）',
    bodyPart: '肩',
    bodyPartColor: '#FF9500',
    bodyPartEmoji: '🏋️',
    exercises: [
      { name: 'ショルダープレス', weight: 40, reps: 8, sets: 3 },
      { name: 'サイドレイズ', weight: 10, reps: 15, sets: 3 }
    ]
  },
  {
    date: '09/29（月）',
    bodyPart: '胸',
    bodyPartColor: '#FF4B4B',
    bodyPartEmoji: '💪',
    exercises: [
      { name: 'ベンチプレス', weight: 85, reps: 10, sets: 3, isPR: true },
      { name: 'ダンベルフライ', weight: 20, reps: 12, sets: 3 }
    ]
  }
];

type Screen = 'home' | 'newSession' | 'analysis' | 'history';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    setCurrentScreen('home');
  };

  if (currentScreen === 'newSession') {
    return <NewSessionScreen onBack={navigateBack} />;
  }

  if (currentScreen === 'analysis') {
    return <AnalysisScreen onBack={navigateBack} />;
  }

  if (currentScreen === 'history') {
    return <HistoryScreen onBack={navigateBack} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* iPhone 16 Pro想定のモバイルレイアウト */}
      <div className="max-w-sm mx-auto min-h-screen bg-white relative">
        <KinrokuHeader onAddSession={() => navigateToScreen('newSession')} />
        
        <main className="pb-20">
          <WeeklyStats />
          <AddSessionButton onAddSession={() => navigateToScreen('newSession')} />
          
          {/* セッション履歴 */}
          <div className="space-y-0">
            {sessionsData.map((session, index) => (
              <SessionCard
                key={index}
                date={session.date}
                bodyPart={session.bodyPart}
                bodyPartColor={session.bodyPartColor}
                bodyPartEmoji={session.bodyPartEmoji}
                exercises={session.exercises}
              />
            ))}
          </div>
          
          <BottomActions 
            onHistory={() => navigateToScreen('history')}
            onAnalysis={() => navigateToScreen('analysis')}
          />
        </main>
        
        <FloatingActionButton onAddSession={() => navigateToScreen('newSession')} />
      </div>
    </div>
  );
}