import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Geladinho} from './sets2';

const ink = {stroke: C.ink, strokeWidth: 8, strokeLinejoin: 'round' as const};
const FLAVOR = {cupu: '#EFE3C8', acai: '#7B3F8C', mara: '#F4C27A'};
export const flavor = FLAVOR;

/** freezer de casa aberto: grade com `cap` vagas, `filled` ocupadas */
export const Freezer: React.FC<{cap?: number; filled?: number; w?: number}> = ({cap = 20, filled = 20, w = 460}) => {
  const cols = 5, rows = Math.ceil(cap / cols);
  return (
    <div style={{width: w, background: '#F4F6FA', border: `9px solid ${C.ink}`, borderRadius: 26, padding: 22, boxSizing: 'border-box'}}>
      <div style={{background: '#CFE8F5', border: `6px solid ${C.ink}`, borderRadius: 14, padding: 14, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10}}>
        {Array.from({length: rows * cols}, (_, i) => (
          <div key={i} style={{height: 92, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: i < cap ? 1 : 0}}>
            {i < filled ? <Geladinho w={26} color={i % 2 ? FLAVOR.acai : FLAVOR.cupu} /> : <div style={{width: 26, height: 80, border: '4px dashed #8AA6B8', borderRadius: 12}} />}
          </div>
        ))}
      </div>
      <div style={{marginTop: 14, height: 18, width: 120, background: '#9AA3AE', border: `5px solid ${C.ink}`, borderRadius: 9}} />
    </div>
  );
};

/** fileira de geladinhos (com gotas se derretendo) */
export const GeladinhoRow: React.FC<{n: number; w?: number; melting?: boolean; at?: number}> = ({n, w = 44, melting, at = 0}) => {
  const f = useCurrentFrame();
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
      {Array.from({length: n}, (_, i) => (
        <div key={i} style={{position: 'relative', transform: `rotate(${(i % 5 - 2) * 4}deg) scaleY(${melting ? 1 - 0.06 * Math.sin((f + i * 7) / 9) : 1})`}}>
          <Geladinho w={w} color={i % 3 === 2 ? FLAVOR.acai : FLAVOR.cupu} />
          {melting && <div style={{position: 'absolute', left: w * 0.4, top: w * 3.2 + ((f * 2 + i * 13) % 40), width: 12, height: 16, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#7EC8F0', border: `3px solid ${C.ink}`}} />}
        </div>
      ))}
    </div>
  );
};

export const SaltShaker: React.FC<{w?: number}> = ({w = 150}) => (
  <svg viewBox="0 0 150 220" width={w} height={w * 1.47}>
    <rect x={30} y={60} width={90} height={150} rx={20} fill="#fff" {...ink} />
    <path d="M35,62 Q75,0 115,62 Z" fill="#9AA3AE" {...ink} />
    {[[60, 40], [75, 30], [90, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill={C.ink} />)}
    <text x={75} y={150} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={C.ink}>SAL</text>
  </svg>
);

export const MilkBox: React.FC<{w?: number}> = ({w = 130}) => (
  <svg viewBox="0 0 130 210" width={w} height={w * 1.6}>
    <path d="M15,50 L65,10 L115,50 Z" fill="#E9ECEF" {...ink} />
    <rect x={15} y={50} width={100} height={150} fill="#fff" {...ink} />
    <rect x={15} y={95} width={100} height={50} fill="#3C86D6" />
    <text x={65} y={132} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={32} fill="#fff">LEITE</text>
  </svg>
);

export const BagsPack: React.FC<{w?: number}> = ({w = 160}) => (
  <svg viewBox="0 0 160 200" width={w} height={w * 1.25}>
    {[0, 1, 2].map((i) => <rect key={i} x={20 + i * 22} y={20 + i * 8} width={70} height={160} rx={12} fill="rgba(255,255,255,0.9)" stroke={C.ink} strokeWidth={6} />)}
    <text x={95} y={190} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={26} fill={C.ink}>SAQUINHOS</text>
  </svg>
);

/** caixa térmica grande aberta (vista de frente/cima) com gelo e geladinhos */
export const CoolerOpen: React.FC<{w?: number; ice?: number; gel?: number; salt?: boolean; frost?: number; empty?: boolean}> = ({w = 620, ice = 1, gel = 1, salt, frost = 0, empty}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'relative', width: w, height: w * 0.62}}>
      <div style={{position: 'absolute', left: 0, top: -w * 0.18, width: w, height: w * 0.16, background: '#2D6A9A', border: `9px solid ${C.ink}`, borderRadius: 20, transform: 'rotate(-6deg)', transformOrigin: 'left bottom'}} />
      <div style={{position: 'absolute', inset: 0, background: '#F4F6FA', border: `9px solid ${C.ink}`, borderRadius: 26, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 24, right: 24, top: 24, bottom: 24, background: '#DDEFF8', border: `6px solid ${C.ink}`, borderRadius: 14, overflow: 'hidden'}}>
          {!empty && Array.from({length: 18}, (_, i) => (
            <div key={i} style={{position: 'absolute', left: (i % 6) * (w / 7.2) + 10, top: Math.floor(i / 6) * 70 + 20, width: 60, height: 60, borderRadius: 10, background: '#F2FBFF', border: `5px solid ${C.ink}`, opacity: ice, transform: `rotate(${(i * 37) % 20 - 10}deg)`}} />
          ))}
          {!empty && Array.from({length: 7}, (_, i) => (
            <div key={i} style={{position: 'absolute', left: 30 + i * (w / 9), top: 40 + (i % 2) * 40, opacity: gel, transform: `rotate(${(i % 3 - 1) * 12}deg)`}}><Geladinho w={38} color={i % 2 ? FLAVOR.acai : FLAVOR.cupu} /></div>
          ))}
          {salt && Array.from({length: 40}, (_, i) => (
            <div key={i} style={{position: 'absolute', left: (i * 53) % (w - 80) + 20, top: ((i * 31 + f * 3) % 180) + 10, width: 8, height: 8, background: '#fff', border: `2px solid ${C.ink}`, borderRadius: 2}} />
          ))}
          {frost > 0 && <div style={{position: 'absolute', inset: 0, background: `rgba(255,255,255,${0.45 * frost})`}} />}
        </div>
      </div>
      {frost > 0 && [0, 1, 2, 3].map((i) => (
        <div key={i} style={{position: 'absolute', left: 60 + i * 150, top: -40 - ((f * 1.5 + i * 25) % 60), fontSize: 60, color: '#fff', opacity: frost, WebkitTextStroke: `3px ${C.ink}`}}>✦</div>
      ))}
    </div>
  );
};
