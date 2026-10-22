import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import StatsBar from '@/components/StatsBar';
import QuizCard from '@/components/QuizCard';
import ResultsScreen from '@/components/ResultsScreen';
import Confetti from '@/components/Confetti';
import { QUESTIONS, PASS_THRESHOLD, type Topic } from '@/data/questions';
import { setSoundEnabled, playSound } from '@/lib/sound';

type Phase = 'quiz' | 'results';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [activeTopic, setActiveTopic] = useState<Topic | 'all'>('all');
  const [soundOn, setSoundOn] = useState(true);
  const [phase, setPhase] = useState<Phase>('quiz');

  const [deck, setDeck] = useState(() => shuffle(QUESTIONS));
  const [cursor, setCursor] = useState(0);

  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const filteredDeck = useMemo(
    () => (activeTopic === 'all' ? deck : deck.filter((q) => q.topic === activeTopic)),
    [deck, activeTopic]
  );

  const total = filteredDeck.length;
  const current = filteredDeck[cursor];

  const reset = useCallback((topic?: Topic | 'all') => {
    const topicValue = topic ?? activeTopic;
    const base = shuffle(QUESTIONS);
    setDeck(base);
    setCursor(0);
    setCorrectCount(0);
    setAnsweredCount(0);
    setStreak(0);
    setBestStreak(0);
    setShowConfetti(false);
    setPhase('quiz');
    if (topic) setActiveTopic(topic);
  }, [activeTopic]);

  const handleTopicSelect = (topic: Topic | 'all') => {
    playSound('click');
    reset(topic);
  };

  const handleAnswered = (correct: boolean) => {
    setAnsweredCount((n) => n + 1);
    if (correct) {
      setCorrectCount((n) => n + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (cursor + 1 >= total) {
      const finalCorrect = correctCount;
      const finalTotal = answeredCount;
      const pct = finalTotal === 0 ? 0 : Math.round((finalCorrect / finalTotal) * 100);
      if (pct >= PASS_THRESHOLD) {
        setShowConfetti(true);
        playSound('complete');
      } else {
        playSound('click');
      }
      setPhase('results');
    } else {
      setCursor((c) => c + 1);
    }
  };

  const toggleSound = () => {
    setSoundOn((s) => {
      const next = !s;
      setSoundEnabled(next);
      if (next) playSound('click');
      return next;
    });
  };

  useEffect(() => {
    setSoundEnabled(soundOn);
  }, [soundOn]);

  if (total === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header activeTopic={activeTopic} onSelectTopic={handleTopicSelect} soundOn={soundOn} onToggleSound={toggleSound} />
        <main className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center px-4 py-12 sm:px-6">
          <p className="text-sm text-slate-400">No questions available for this topic yet.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {showConfetti && <Confetti count={140} />}

      <Header activeTopic={activeTopic} onSelectTopic={handleTopicSelect} soundOn={soundOn} onToggleSound={toggleSound} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-8 pt-5 sm:px-6">
        {phase === 'quiz' && (
          <>
            <ProgressBar current={answeredCount} total={total} />
            <div className="mt-3">
              <StatsBar
                streak={streak}
                bestStreak={bestStreak}
                correctCount={correctCount}
                answeredCount={answeredCount}
                total={total}
              />
            </div>
            <div className="mt-5 rounded-2xl border border-white/5 bg-[#0e1320]/60 p-4 card-shadow sm:p-6">
              {current && (
                <QuizCard
                  key={current.id}
                  question={current}
                  index={cursor}
                  total={total}
                  onAnswered={handleAnswered}
                  onNext={handleNext}
                  isLast={cursor + 1 >= total}
                />
              )}
            </div>
          </>
        )}

        {phase === 'results' && (
          <div className="mx-auto max-w-md py-8">
            <ResultsScreen
              correct={correctCount}
              total={answeredCount}
              bestStreak={bestStreak}
              onRestart={() => reset()}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
