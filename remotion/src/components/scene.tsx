import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {ramp} from './anim';
import {Caption, CapWord} from './ui';
import {FPS} from '../theme';

/**
 * Cena com câmera viva (regra do usuário: nada parado, nada exagerado):
 * zoom lento (zoom), deslize leve (pan, em px ao longo da cena) e micro-pop no corte.
 * Filhos podem usar <Par depth> pra paralaxe (cenário anda menos que personagem).
 */
type Ctx = {k: number; pan: [number, number]};
const SceneCtx = createContext<Ctx>({k: 0, pan: [0, 0]});

export const Scene: React.FC<{from: number; to: number; children: React.ReactNode; zoom?: number; pan?: [number, number]}> = ({
  from, to, children, zoom = 0.05, pan = [0, -30],
}) => {
  const f = useCurrentFrame();
  if (f < from || f >= to) return null;
  const k = interpolate(f, [from, to], [0, 1], {easing: Easing.inOut(Easing.sin)});
  const intro = interpolate(f - from, [0, 5], [1.05, 1], {extrapolateRight: 'clamp'});
  const s = (zoom >= 0 ? 1 + zoom * k : 1 - zoom + zoom * k) * intro;
  return (
    <SceneCtx.Provider value={{k, pan}}>
      <AbsoluteFill style={{transform: `translate(${pan[0] * k}px, ${pan[1] * k}px) scale(${s})`}}>{children}</AbsoluteFill>
    </SceneCtx.Provider>
  );
};

/** paralaxe: depth < 1 anda menos que a câmera (fundo); > 1 anda mais (primeiro plano) */
export const Par: React.FC<{depth: number; children: React.ReactNode}> = ({depth, children}) => {
  const {k, pan} = useContext(SceneCtx);
  return <AbsoluteFill style={{transform: `translate(${pan[0] * k * (depth - 1)}px, ${pan[1] * k * (depth - 1)}px)`}}>{children}</AbsoluteFill>;
};

export const At: React.FC<{x: number; y: number; children: React.ReactNode; s?: number; r?: number; o?: number}> = ({x, y, children, s = 1, r = 0, o = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `scale(${s}) rotate(${r}deg)`, transformOrigin: 'center bottom', opacity: o}}>{children}</div>
);

export const Write: React.FC<{at: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, dur = 16, children, style}) => {
  const f = useCurrentFrame();
  const p = ramp(f, at, at + dur);
  return <div style={{clipPath: `inset(0 ${100 - p * 100}% 0 0)`, ...style}}>{children}</div>;
};

export type Word = {w: string; start: number; end: number};
export type Chunk = [number, number, string?, Record<number, string>?];
const sec = (s: number) => Math.round(s * FPS);

/** legendas por blocos de palavras alinhadas */
export const makeCaptions = (W: Word[], CHUNKS: Chunk[], capY: (s: number) => number): React.FC => () => {
  const f = useCurrentFrame();
  const t = (i: number) => sec(W[i].start);
  for (let k = CHUNKS.length - 1; k >= 0; k--) {
    const [a, b, txt, colors] = CHUNKS[k];
    const start = t(a);
    if (f < start) continue;
    const nextStart = k + 1 < CHUNKS.length ? t(CHUNKS[k + 1][0]) : Infinity;
    const end = Math.min(nextStart, sec(W[b].end + 0.35));
    if (f >= end) return null;
    const words: CapWord[] = (txt ?? W.slice(a, b + 1).map((x) => x.w).join(' ')).split(' ').map((w, i) => ({t: w, color: colors?.[i]}));
    return <Caption words={words} startFrame={start} y={capY(W[a].start)} />;
  }
  return null;
};
