import { Flame, Target, CheckCircle2 } from 'lucide-react';

interface StatsBarProps {
  streak: number;
  bestStreak: number;
  correctCount: number;
  answeredCount: number;
  total: number;
}

export default function StatsBar({ streak, bestStreak, correctCount, answeredCount, total }: StatsBarProps) {
  const accuracy = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);
  const pct = total === 0 ? 0 : Math.round((answeredCount / total) * 100);

  return (
    <div className="grid grid-cols-3 gap-2">
      <Stat
        Icon={Flame}
        label="Streak"
        value={`${streak}`}
        accent={streak >= 3 ? 'text-amber-300' : 'text-slate-200'}
        hint={`Best ${bestStreak}`}
      />
      <Stat
        Icon={Target}
        label="Accuracy"
        value={`${accuracy}%`}
        accent={accuracy >= 80 ? 'text-teal-300' : 'text-slate-200'}
        hint={`${correctCount}/${answeredCount} correct`}
      />
      <Stat
        Icon={CheckCircle2}
        label="Progress"
        value={`${pct}%`}
        accent="text-sky-300"
        hint="of quiz"
      />
    </div>
  );
}

function Stat({
  Icon,
  label,
  value,
  hint,
  accent,
}: {
  Icon: typeof Flame;
  label: string;
  value: string;
  hint: string;
  accent: string;
}) {
  return (
    <div className="glass rounded-xl border border-white/5 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-slate-400">
        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
        <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className={`mt-1 font-mono text-lg font-bold tabular-nums ${accent}`}>{value}</div>
      <div className="text-[10px] text-slate-500">{hint}</div>
    </div>
  );
}
