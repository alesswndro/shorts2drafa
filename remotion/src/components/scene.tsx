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

export const Scene: React.FC<{from: number; to: number; children: React.ReactNode; zoom?: number; pan?: [number, number]; hardCut?: boolean}> = ({
  from, to, children, zoom = 0.05, pan = [0, -30], hardCut = false,
}) => {
  const f = useCurrentFrame();
  if (f < from || f >= to) return null;
  const k = interpolate(f, [from, to], [0, 1], {easing: Easing.inOut(Easing.sin)});
  const intro = hardCut ? 1 : interpolate(f - from, [0, 5], [1.05, 1], {extrapolateRight: 'clamp'});
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

// ---------- recursos de retenção (regra do usuário: visual apelativo, sem fugir da estética) ----------

/** "tranco" de zoom que decai (punch-in) — some 1 + valor ao scale nas palavras/números-chave */
export const punch = (f: number, at: number, amt = 0.07, dur = 9) => {
  const t = f - at;
  if (t < 0 || t > dur) return 0;
  return amt * Math.sin((t / dur) * Math.PI) * (1 - t / (dur * 1.4));
};

/** câmera com punch-ins: envolve o conteúdo e soma os trancos nos frames dados */
export const Punch: React.FC<{at: number[]; amt?: number; children: React.ReactNode}> = ({at, amt = 0.07, children}) => {
  const f = useCurrentFrame();
  const s = 1 + at.reduce((a, x) => a + punch(f, x, amt), 0);
  return <AbsoluteFill style={{transform: `scale(${s})`}}>{children}</AbsoluteFill>;
};

/** clarão branco curto nas viradas */
export const Flash: React.FC<{at: number; dur?: number; color?: string; max?: number}> = ({at, dur = 7, color = '#fff', max = 0.85}) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0 || t > dur) return null;
  return <AbsoluteFill style={{background: color, opacity: max * (1 - t / dur), pointerEvents: 'none'}} />;
};

/** explosão de brilhos a partir de um ponto */
export const Sparkles: React.FC<{at: number; x: number; y: number; n?: number; color?: string; spread?: number}> = ({at, x, y, n = 14, color = '#F5C431', spread = 380}) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0 || t > 26) return null;
  return (
    <>
      {Array.from({length: n}, (_, i) => {
        const a = (i / n) * Math.PI * 2 + i;
        const r = spread * (1 - Math.pow(1 - t / 26, 2)) * (0.6 + ((i * 37) % 10) / 25);
        const s = (1 - t / 26) * (0.8 + (i % 3) * 0.3);
        return <div key={i} style={{position: 'absolute', left: x + Math.cos(a) * r - 22, top: y + Math.sin(a) * r - 22, fontSize: 44, color, transform: `scale(${s}) rotate(${t * 12}deg)`, WebkitTextStroke: '3px #1E1B26'}}>✦</div>;
      })}
    </>
  );
};

/** chuva de moedas (vitória) */
export const CoinRain: React.FC<{from: number; to: number; n?: number}> = ({from, to, n = 16}) => {
  const f = useCurrentFrame();
  if (f < from || f > to + 40) return null;
  return (
    <>
      {Array.from({length: n}, (_, i) => {
        const start = from + ((i * 7) % 24);
        const t = f - start;
        if (t < 0) return null;
        const y = -120 + t * (22 + (i % 4) * 4);
        if (y > 2000) return null;
        const x = ((i * 137) % 1000) + 20;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 70, height: 70, borderRadius: 35, background: '#F5C431', border: '6px solid #1E1B26', fontFamily: 'Oswald', fontWeight: 700, fontSize: 40, lineHeight: '58px', textAlign: 'center', color: '#1E1B26', transform: `rotateY(${t * 18}deg)`}}>$</div>;
      })}
    </>
  );
};

/** número contando de a até b entre os frames f0 e f1 */
export const countUp = (f: number, f0: number, f1: number, a: number, b: number) =>
  Math.round(interpolate(f, [f0, f1], [a, b], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}));
