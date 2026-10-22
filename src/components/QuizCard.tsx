import { useState } from 'react';
import { Check, X, Lightbulb, ChevronDown, Sparkles } from 'lucide-react';
import type { Question } from '@/data/questions';
import { playSound } from '@/lib/sound';

interface QuizCardProps {
  question: Question;
  index: number;
  total: number;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizCard({ question, index, total, onAnswered, onNext, isLast }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [showAnalogy, setShowAnalogy] = useState(false);

  const handleSelect = (i: number) => {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    const correct = i === question.correctIndex;
    playSound(correct ? 'correct' : 'wrong');
    onAnswered(correct);
  };

  const handleNext = () => {
    playSound('click');
    setSelected(null);
    setLocked(false);
    setShowAnalogy(false);
    onNext();
  };

  return (
    <div key={question.id} className="animate-fade-in-up">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-xs font-semibold text-slate-500">
          Question {index + 1} of {total}
        </span>
        <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
          {question.topic.split('-').join(' ')}
        </span>
      </div>

      <h2 className="text-balance text-lg font-semibold leading-snug text-white sm:text-xl">
        {question.question}
      </h2>

      <div className="mt-4 grid gap-2.5">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isPicked = i === selected;
          let cls = 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]';
          if (locked && isCorrect) cls = 'border-teal-400/60 bg-teal-500/10 glow-correct';
          else if (locked && isPicked && !isCorrect) cls = 'border-red-400/60 bg-red-500/10 glow-wrong';
          else if (locked) cls = 'border-white/5 bg-white/[0.02] opacity-60';

          return (
            <button
              key={i}
              disabled={locked}
              onClick={() => handleSelect(i)}
              className={`group flex items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-200 active:scale-[0.99] disabled:cursor-default ${cls}`}
            >
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md font-mono text-xs font-bold transition ${
                  locked && isCorrect
                    ? 'bg-teal-400 text-slate-900'
                    : locked && isPicked
                    ? 'bg-red-400 text-slate-900'
                    : 'bg-white/10 text-slate-300 group-hover:bg-white/20'
                }`}
              >
                {locked && isCorrect ? <Check className="h-4 w-4" strokeWidth={3} /> : locked && isPicked ? <X className="h-4 w-4" strokeWidth={3} /> : LETTERS[i]}
              </span>
              <span className="text-sm leading-snug text-slate-200">{opt}</span>
            </button>
          );
        })}
      </div>

      {locked && (
        <div className="mt-4 animate-pop-in space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-2 flex items-center gap-2">
              {selected === question.correctIndex ? (
                <>
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-400 text-slate-900">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-teal-300">Correct!</span>
                </>
              ) : (
                <>
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-red-400 text-slate-900">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-red-300">Not quite</span>
                </>
              )}
            </div>

            <p className="text-sm leading-relaxed text-slate-300">
              <span className="font-semibold text-teal-200">Why {LETTERS[question.correctIndex]} is correct: </span>
              {question.whyCorrect}
            </p>

            <div className="mt-3 space-y-2 border-t border-white/5 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why the others are wrong</p>
              {question.options.map((_, i) => {
                if (i === question.correctIndex) return null;
                const reason = question.whyWrong[i];
                if (!reason || reason === 'This is the correct option.') return null;
                return (
                  <div key={i} className="flex gap-2 text-xs leading-relaxed text-slate-400">
                    <span className="font-mono font-bold text-slate-500">{LETTERS[i]}</span>
                    <span>{reason}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              setShowAnalogy((s) => !s);
            }}
            className="flex w-full items-center justify-between rounded-xl border border-amber-400/20 bg-amber-500/[0.07] px-4 py-3 text-left transition hover:bg-amber-500/[0.12] active:scale-[0.99]"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-amber-200">
              <Lightbulb className="h-4 w-4" strokeWidth={2.2} />
              Explain like I&apos;m a Beginner
            </span>
            <ChevronDown className={`h-4 w-4 text-amber-200 transition-transform ${showAnalogy ? 'rotate-180' : ''}`} />
          </button>

          {showAnalogy && (
            <div className="animate-fade-in-up rounded-xl border border-amber-400/15 bg-amber-500/[0.05] p-4">
              <div className="mb-1.5 flex items-center gap-1.5 text-amber-200">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
                <span className="text-xs font-semibold uppercase tracking-wide">Beginner Analogy</span>
              </div>
              <p className="text-sm leading-relaxed text-amber-50/90">{question.beginnerAnalogy}</p>
            </div>
          )}

          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-sky-500/20 transition hover:brightness-110 active:scale-[0.98]"
          >
            {isLast ? 'See Results' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
}
