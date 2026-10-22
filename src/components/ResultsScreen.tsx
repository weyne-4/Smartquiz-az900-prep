import { Trophy, RotateCcw, Flame, Target } from 'lucide-react';
import { PASS_THRESHOLD } from '@/data/questions';
import { playSound } from '@/lib/sound';

interface ResultsScreenProps {
  correct: number;
  total: number;
  bestStreak: number;
  onRestart: () => void;
}

export default function ResultsScreen({ correct, total, bestStreak, onRestart }: ResultsScreenProps) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  const passed = pct >= PASS_THRESHOLD;

  return (
    <div className="animate-fade-in-up text-center">
      <div
        className={`mx-auto grid h-20 w-20 place-items-center rounded-2xl ${
          passed ? 'bg-gradient-to-br from-amber-400 to-teal-400' : 'bg-white/10'
        } shadow-lg`}
      >
        <Trophy className={`h-10 w-10 ${passed ? 'text-slate-900' : 'text-slate-300'}`} strokeWidth={2} />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-white">
        {passed ? 'You passed!' : 'Keep practicing'}
      </h2>
      <p className="mt-1.5 text-sm text-slate-400">
        {passed
          ? `You scored ${pct}% — above the ${PASS_THRESHOLD}% passing mark.`
          : `You scored ${pct}%. The passing mark is ${PASS_THRESHOLD}%. Review and try again.`}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <Stat Icon={Target} label="Score" value={`${pct}%`} accent={passed ? 'text-teal-300' : 'text-slate-200'} />
        <Stat Icon={Trophy} label="Correct" value={`${correct}/${total}`} accent="text-sky-300" />
        <Stat Icon={Flame} label="Best Streak" value={`${bestStreak}`} accent="text-amber-300" />
      </div>

      <button
        onClick={() => {
          playSound('click');
          onRestart();
        }}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 px-6 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-sky-500/20 transition hover:brightness-110 active:scale-[0.98]"
      >
        <RotateCcw className="h-4 w-4" strokeWidth={2.4} />
        Try Again
      </button>
    </div>
  );
}

function Stat({
  Icon,
  label,
  value,
  accent,
}: {
  Icon: typeof Trophy;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="glass rounded-xl border border-white/5 px-3 py-3">
      <Icon className="mx-auto h-4 w-4 text-slate-400" strokeWidth={2.2} />
      <div className={`mt-1.5 font-mono text-lg font-bold ${accent}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}
