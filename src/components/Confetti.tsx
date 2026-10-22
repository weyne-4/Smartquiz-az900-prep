import { useEffect, useRef } from 'react';

interface ConfettiOptions {
  count?: number;
}

interface Piece {
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotate: number;
  shape: 'rect' | 'circle';
}

const COLORS = ['#38bdf8', '#2dd4bf', '#fbbf24', '#f472b6', '#a78bfa', '#34d399'];

export default function Confetti({ count = 120 }: ConfettiOptions) {
  const piecesRef = useRef<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pieces: Piece[] = Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.2 + Math.random() * 2.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }));

    piecesRef.current = pieces.map((p, i) => {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.left = `${p.left}%`;
      el.style.top = '-5%';
      el.style.width = `${p.size}px`;
      el.style.height = `${p.shape === 'rect' ? p.size * 0.5 : p.size}px`;
      el.style.background = p.color;
      el.style.borderRadius = p.shape === 'circle' ? '9999px' : '2px';
      el.style.opacity = '0';
      el.style.animation = `confettiFall ${p.duration}s cubic-bezier(0.2, 0.7, 0.4, 1) ${p.delay}s forwards`;
      el.style.transform = `rotateZ(${p.rotate}deg)`;
      el.style.zIndex = '50';
      el.setAttribute('data-i', String(i));
      containerRef.current?.appendChild(el);
      return el;
    });

    const timer = window.setTimeout(() => {
      piecesRef.current.forEach((el) => el.remove());
      piecesRef.current = [];
    }, 5000);

    return () => {
      window.clearTimeout(timer);
      piecesRef.current.forEach((el) => el.remove());
      piecesRef.current = [];
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <span className="sr-only">Celebration animation</span>
    </div>
  );
}
