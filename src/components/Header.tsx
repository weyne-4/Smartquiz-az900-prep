import { Cloud, Boxes, Settings2, Volume2, VolumeX, Brain } from 'lucide-react';
import type { Topic } from '@/data/questions';
import { TOPICS } from '@/data/questions';

const ICONS: Record<Topic, typeof Cloud> = {
  'cloud-concepts': Cloud,
  'architecture-core-services': Boxes,
  'management-governance': Settings2,
};

interface HeaderProps {
  activeTopic: Topic | 'all';
  onSelectTopic: (topic: Topic | 'all') => void;
  soundOn: boolean;
  onToggleSound: () => void;
}

export default function Header({ activeTopic, onSelectTopic, soundOn, onToggleSound }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass border-b border-white/5">
      <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 shadow-lg shadow-sky-500/20">
              <Brain className="h-5 w-5 text-slate-900" strokeWidth={2.4} />
            </div>
            <div className="min-w-0 leading-tight">
              <h1 className="truncate text-[15px] font-bold tracking-tight text-white sm:text-base">
                SmartQuiz <span className="text-gradient">AZ-900 Prep</span>
              </h1>
              <p className="hidden text-[11px] text-slate-400 sm:block">Practice for the Azure Fundamentals exam</p>
            </div>
          </div>

          <button
            onClick={onToggleSound}
            aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white active:scale-95"
          >
            {soundOn ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
          </button>
        </div>

        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TopicPill
            label="All Topics"
            active={activeTopic === 'all'}
            onClick={() => onSelectTopic('all')}
            Icon={Brain}
          />
          {TOPICS.map((t) => (
            <TopicPill
              key={t.id}
              label={t.label}
              active={activeTopic === t.id}
              onClick={() => onSelectTopic(t.id)}
              Icon={ICONS[t.id]}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

function TopicPill({
  label,
  active,
  onClick,
  Icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  Icon: typeof Cloud;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all active:scale-95 ${
        active
          ? 'border-sky-400/40 bg-sky-500/15 text-sky-200 shadow-sm shadow-sky-500/10'
          : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200'
      }`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
