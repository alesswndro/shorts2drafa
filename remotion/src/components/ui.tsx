import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, strokeText} from '../theme';
import {pop, ramp, shake} from './anim';

// ---------- HUD (medido pixel a pixel do EP04 original) ----------
// cartões: y 170–309 (140 px, borda 8) · x [32–327] [338–681] [692–1047] · raio 22
// ícone 96x96 (borda 6, raio 20) a 19 px da borda externa · rótulo cinza cap 22 px · valor cap 36 px
// meta: pílula x 304–775, y 324–407, anel amarelo 6 px, fundo #1D1B25, ícone ◎ 48 px, texto cap 40 px
const HUD = {ink: '#1E1B28', card: '#FAF7F0', label: '#8F82A1', teal: '#2F7E8E', green: '#1F9C54', purple: '#7A4EC9', red: '#D93A3F', yellow: '#F5C13A', metaBg: '#1D1B25'};

const HudIcon: React.FC<{kind: 'clock' | 'money' | 'house'}> = ({kind}) => (
  <svg viewBox="0 0 84 84" width={84} height={84}>
    {kind === 'clock' && (
      <g fill="none" stroke="#fff" strokeWidth={5.5} strokeLinecap="round">
        <circle cx={42} cy={42} r={16} />
        <path d="M42,26 L42,42 L58,42" />
      </g>
    )}
    {kind === 'money' && <text x={42} y={58} textAnchor="middle" fontFamily="Oswald" fontWeight={700} fontSize={50} fill="#fff">$</text>}
    {kind === 'house' && <path d="M32,54 L32,41 L42,32 L52,41 L52,54 Z" fill="none" stroke="#fff" strokeWidth={3.5} strokeLinejoin="round" />}
  </svg>
);

const HudCard: React.FC<{x: number; w: number; icon: 'clock' | 'money' | 'house'; iconBg: string; label: string; value: string; valueColor?: string; s: number; flash?: string; dx?: number}> = ({
  x, w, icon, iconBg, label, value, valueColor = HUD.ink, s, flash, dx = 0,
}) => (
  <div style={{position: 'absolute', left: x + dx, top: 170, width: w, height: 140, boxSizing: 'border-box', background: flash ?? HUD.card, border: `8px solid ${HUD.ink}`, borderRadius: 22, transform: `scale(${s})`, opacity: Math.min(1, s * 1.5)}}>
    <div style={{position: 'absolute', left: 11, top: 14, width: 96, height: 96, boxSizing: 'border-box', background: iconBg, border: `6px solid ${HUD.ink}`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <HudIcon kind={icon} />
    </div>
    <div style={{position: 'absolute', left: 124, top: 27, fontFamily: FONT, fontWeight: 500, fontSize: 27.5, lineHeight: 1, color: HUD.label, whiteSpace: 'nowrap'}}>{label}</div>
    <div style={{position: 'absolute', left: 122, top: 61, fontFamily: FONT, fontWeight: 700, fontSize: 45, lineHeight: 1, color: valueColor, whiteSpace: 'nowrap'}}>{value}</div>
  </div>
);

export type HudState = {dia: number; guardado: number; despejo: number; meta: number; metaAlert?: boolean; despejoAlert?: boolean; guardadoShakeAt?: number; hideMeta?: boolean};

export const MetaPill: React.FC<{meta: React.ReactNode; alert?: boolean; style?: React.CSSProperties}> = ({meta, alert, style}) => {
  const col = alert ? C.red : HUD.yellow;
  return (
    <div style={{width: 472, height: 84, boxSizing: 'border-box', background: HUD.metaBg, border: `6px solid ${col}`, borderRadius: 42, display: 'flex', alignItems: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 42, letterSpacing: 1.2, lineHeight: 1, color: col, whiteSpace: 'nowrap', ...style}}>
      <svg width={45} height={45} viewBox="0 0 48 48" style={{marginLeft: 22, marginRight: 30, flex: 'none'}}>
        <circle cx={24} cy={24} r={21} fill="none" stroke={col} strokeWidth={5} />
        <circle cx={24} cy={24} r={8.5} fill={col} />
      </svg>
      <span>{meta}</span>
    </div>
  );
};

export const Hud: React.FC<{s: HudState; enterAt: number}> = ({s, enterAt}) => {
  const f = useCurrentFrame();
  const blink = s.despejoAlert && Math.floor(f / 8) % 2 === 0;
  const sx = s.guardadoShakeAt != null ? shake(f, s.guardadoShakeAt, 16, 12) : 0;
  const m = pop(f, enterAt + 12, 14);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <HudCard x={32} w={296} icon="clock" iconBg={HUD.teal} label="BELÉM" value={`DIA ${s.dia}`} s={pop(f, enterAt, 14)} />
      <HudCard x={338} w={344} icon="money" iconBg={HUD.green} label="GUARDADO" value={`R$ ${s.guardado},00`} valueColor={HUD.green} s={pop(f, enterAt + 4, 14)} dx={sx} />
      <HudCard x={692} w={356} icon="house" iconBg={blink ? HUD.red : HUD.purple} label="DESPEJO" value={`${s.despejo} DIAS`} valueColor={blink ? HUD.red : HUD.ink} s={pop(f, enterAt + 8, 14)} />
      {!s.hideMeta && (
        <div style={{position: 'absolute', left: 304, top: 324, transform: `scale(${m})`}}>
          <MetaPill meta={`META: R$ ${s.meta}/DIA`} alert={s.metaAlert} />
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
export const TitleCard: React.FC<{parte: number; big: string; bigColor: string; l2: string; l3: string; l3Color: string; out: number; bigSize?: number}> = ({parte, big, bigColor, l2, l3, l3Color, out, bigSize = 290}) => {
  const f = useCurrentFrame();
  const o = 1 - ramp(f, out - 6, out);
  if (o <= 0) return null;
  const a = pop(f, 0, 12);
  return (
    <AbsoluteFill style={{fontFamily: FONT, fontWeight: 700, alignItems: 'center', opacity: o}}>
      <div style={{marginTop: 120, background: C.redPill, color: '#fff', border: `7px solid ${C.ink}`, borderRadius: 60, padding: '6px 54px', fontSize: 84, transform: `scale(${a})`}}>PARTE {parte}</div>
      <div style={{fontSize: bigSize, lineHeight: 0.95, color: bigColor, whiteSpace: 'nowrap', marginTop: 6, ...strokeText(26), transform: `scale(${pop(f, 3, 10)})`}}>{big}</div>
      <div style={{fontSize: 150, lineHeight: 0.95, color: '#fff', ...strokeText(22), transform: `scale(${pop(f, 6, 12)})`}}>{l2}</div>
      <div style={{fontSize: 130, lineHeight: 1, color: l3Color, ...strokeText(22), transform: `scale(${pop(f, 9, 12)})`}}>{l3}</div>
    </AbsoluteFill>
  );
};

// ---------- enquete ----------
export const Poll: React.FC<{parte: number; a: string; b: string; at: number; aAt: number; bAt: number; voteAt: number; cta?: string}> = ({parte, a, b, at, aAt, bAt, voteAt, cta = 'COMENTA AÍ: A OU B? ↓'}) => {
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
        <div style={{marginTop: 50, fontSize: 80, color: C.yellow, ...strokeText(14), transform: `scale(${pop(f, voteAt, 10)}) translateY(${Math.sin(f / 5) * 8}px)`}}>{cta}</div>
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
