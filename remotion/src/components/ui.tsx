import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, strokeText} from '../theme';
import {pop, ramp, shake} from './anim';

// ---------- HUD ----------
const HudPill: React.FC<{icon: string; iconBg: string; label: string; value: string; valueColor?: string; alert?: boolean; dx?: number}> = ({
  icon, iconBg, label, value, valueColor = C.ink, alert, dx = 0,
}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, background: alert ? '#FFE3E3' : C.cream, border: `5px solid ${C.ink}`, borderRadius: 18, padding: '8px 18px 8px 10px', transform: `translateX(${dx}px)`}}>
    <div style={{width: 50, height: 50, borderRadius: 12, background: alert ? C.redPill : iconBg, border: `4px solid ${C.ink}`, color: '#fff', fontSize: 30, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
    <div style={{lineHeight: 1}}>
      <div style={{fontSize: 17, fontWeight: 500, color: '#6B6A75'}}>{label}</div>
      <div style={{fontSize: 34, fontWeight: 700, color: alert ? C.redPill : valueColor}}>{value}</div>
    </div>
  </div>
);

export type HudState = {dia: number; guardado: number; despejo: number; meta: number; metaAlert?: boolean; despejoAlert?: boolean; guardadoShakeAt?: number; hideMeta?: boolean};

export const Hud: React.FC<{s: HudState; enterAt: number}> = ({s, enterAt}) => {
  const f = useCurrentFrame();
  const a = pop(f, enterAt, 14);
  const m = pop(f, enterAt + 6, 14);
  const blink = s.despejoAlert && Math.floor(f / 8) % 2 === 0;
  const sx = s.guardadoShakeAt != null ? shake(f, s.guardadoShakeAt, 16, 12) : 0;
  return (
    <AbsoluteFill style={{fontFamily: FONT, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: 40, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 14, transform: `translateY(${(1 - a) * -160}px)`}}>
        <HudPill icon="◷" iconBg={C.teal} label="BELÉM" value={`DIA ${s.dia}`} />
        <HudPill icon="$" iconBg={C.greenDark} label="GUARDADO" value={`R$ ${s.guardado},00`} valueColor={C.greenDark} dx={sx} />
        <HudPill icon="⌂" iconBg={C.purple} label="DESPEJO" value={`${s.despejo} DIAS`} alert={blink} />
      </div>
      {!s.hideMeta && (
        <div style={{position: 'absolute', top: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${m})`}}>
          <div style={{background: C.ink, color: s.metaAlert ? C.red : C.yellow, border: `4px solid ${s.metaAlert ? C.red : C.yellow}`, borderRadius: 30, padding: '4px 24px', fontSize: 30, fontWeight: 700}}>
            ◎ META: R$ {s.meta}/DIA
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- legenda (1–3 palavras) ----------
export type CapWord = {t: string; color?: string};
export const Caption: React.FC<{words: CapWord[]; startFrame: number; y?: number; size?: number}> = ({words, startFrame, y = 1180, size = 96}) => {
  const f = useCurrentFrame();
  const s = interpolate(f - startFrame, [0, 3, 6], [0.82, 1.06, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top: y, left: 40, right: 40, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: size, lineHeight: 1.05, color: '#fff', textTransform: 'uppercase', transform: `scale(${s})`, ...strokeText(18)}}>
      {words.map((w, i) => (
        <span key={i} style={{color: w.color ?? '#fff'}}>{w.t}{i < words.length - 1 ? ' ' : ''}</span>
      ))}
    </div>
  );
};

// ---------- balão de fala ----------
export const Balloon: React.FC<{text: React.ReactNode; at: number; x: number; y: number; w?: number; tail?: 'left' | 'right' | 'down'; size?: number}> = ({text, at, x, y, w = 760, tail = 'down', size = 52}) => {
  const f = useCurrentFrame();
  const s = pop(f, at, 12);
  if (f < at) return null;
  const tailPos = tail === 'left' ? {left: 80} : tail === 'right' ? {right: 80} : {left: w / 2 - 30};
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, transform: `scale(${s})`, transformOrigin: 'bottom center'}}>
      <div style={{background: '#fff', border: `7px solid ${C.ink}`, borderRadius: 34, padding: '26px 34px', fontFamily: FONT, fontWeight: 700, fontSize: size, color: C.ink, textAlign: 'center', lineHeight: 1.12, textTransform: 'uppercase'}}>{text}</div>
      <svg width={60} height={50} style={{position: 'absolute', bottom: -43, ...tailPos}}>
        <path d="M4,0 L56,0 L14,46 Z" fill="#fff" stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
        <rect x={8} y={-4} width={44} height={9} fill="#fff" />
      </svg>
    </div>
  );
};

// ---------- capa / título ----------
export const TitleCard: React.FC<{parte: number; big: string; bigColor: string; l2: string; l3: string; l3Color: string; out: number}> = ({parte, big, bigColor, l2, l3, l3Color, out}) => {
  const f = useCurrentFrame();
  const o = 1 - ramp(f, out - 6, out);
  if (o <= 0) return null;
  const a = pop(f, 0, 12);
  return (
    <AbsoluteFill style={{fontFamily: FONT, fontWeight: 700, alignItems: 'center', opacity: o}}>
      <div style={{marginTop: 120, background: C.redPill, color: '#fff', border: `7px solid ${C.ink}`, borderRadius: 60, padding: '6px 54px', fontSize: 84, transform: `scale(${a})`}}>PARTE {parte}</div>
      <div style={{fontSize: 290, lineHeight: 0.95, color: bigColor, marginTop: 6, ...strokeText(26), transform: `scale(${pop(f, 3, 10)})`}}>{big}</div>
      <div style={{fontSize: 150, lineHeight: 0.95, color: '#fff', ...strokeText(22), transform: `scale(${pop(f, 6, 12)})`}}>{l2}</div>
      <div style={{fontSize: 130, lineHeight: 1, color: l3Color, ...strokeText(22), transform: `scale(${pop(f, 9, 12)})`}}>{l3}</div>
    </AbsoluteFill>
  );
};

// ---------- enquete ----------
export const Poll: React.FC<{parte: number; a: string; b: string; at: number; aAt: number; bAt: number; voteAt: number}> = ({parte, a, b, at, aAt, bAt, voteAt}) => {
  const f = useCurrentFrame();
  const dim = ramp(f, at, at + 10, 0, 0.62);
  const card = (letter: string, text: string, color: string, t: number) => {
    const s = pop(f, t, 12);
    return (
      <div style={{display: 'flex', alignItems: 'center', gap: 30, background: C.cream, border: `8px solid ${C.ink}`, borderRadius: 34, padding: '26px 40px', width: 880, transform: `translateX(${(1 - s) * 1100}px)`}}>
        <div style={{width: 120, height: 120, flex: 'none', borderRadius: 60, background: color, border: `7px solid ${C.ink}`, color: '#fff', fontSize: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', ...strokeText(10)}}>{letter}</div>
        <div style={{fontSize: 68, lineHeight: 1.05, color: C.ink, textAlign: 'center', flex: 1}}>{text}</div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{fontFamily: FONT, fontWeight: 700}}>
      <AbsoluteFill style={{background: `rgba(15,12,25,${dim})`}} />
      <AbsoluteFill style={{alignItems: 'center', paddingTop: 300, gap: 40}}>
        <div style={{background: C.redPill, color: '#fff', border: `7px solid ${C.ink}`, borderRadius: 50, padding: '6px 44px', fontSize: 72, transform: `scale(${pop(f, at + 4, 12) * (1 + 0.03 * Math.sin(f / 6))})`}}>PARTE {parte}: VOCÊ DECIDE</div>
        <div style={{fontSize: 70, color: '#fff', ...strokeText(16), opacity: ramp(f, at + 8, at + 14)}}>O QUE O RAFA DEVE FAZER?</div>
        <div style={{height: 20}} />
        {card('A', a, C.orange, aAt)}
        {card('B', b, C.teal, bAt)}
        <div style={{marginTop: 50, fontSize: 80, color: C.yellow, ...strokeText(14), transform: `scale(${pop(f, voteAt, 10)}) translateY(${Math.sin(f / 5) * 8}px)`}}>VOTA NA ENQUETE ↓</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- fundo com raios ----------
export const Sunburst: React.FC<{color: string; ray: string; spin?: number}> = ({color, ray, spin = 0}) => {
  const f = useCurrentFrame();
  const rays = Array.from({length: 18}, (_, i) => i);
  return (
    <AbsoluteFill style={{background: color, overflow: 'hidden'}}>
      <svg viewBox="-100 -100 200 200" style={{position: 'absolute', left: -900, top: -400, width: 2880, height: 2880, transform: `rotate(${f * spin}deg)`}}>
        {rays.map((i) => {
          const a0 = (i / 18) * Math.PI * 2, a1 = a0 + Math.PI / 18;
          return <path key={i} d={`M0,0 L${Math.cos(a0) * 150},${Math.sin(a0) * 150} L${Math.cos(a1) * 150},${Math.sin(a1) * 150} Z`} fill={ray} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const ClockPill: React.FC<{text: string; x: number; y: number; at?: number; size?: number; red?: boolean}> = ({text, x, y, at = 0, size = 64, red}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `scale(${pop(f, at, 12)})`, display: 'flex', alignItems: 'center', gap: 16, background: C.ink, border: `6px solid ${C.ink}`, borderRadius: 60, padding: '10px 34px', fontFamily: FONT, fontWeight: 700, fontSize: size, color: red ? C.red : C.yellow}}>
      <span style={{fontSize: size * 0.8}}>◷</span>{text}
    </div>
  );
};
