import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Rafa, Bike} from './Person';
import {bob} from './anim';

const ink = {stroke: C.ink, strokeWidth: 8, strokeLinejoin: 'round' as const};

/** Ver-o-Peso: torres azuis com telhado cônico, placa, barracas listradas. sky: 'dawn' | 'day' */
export const VerOPeso: React.FC<{sky?: 'dawn' | 'day'}> = ({sky = 'dawn'}) => {
  const bg = sky === 'dawn' ? 'linear-gradient(#3A3266, #8C4E6E 55%, #D9826A)' : 'linear-gradient(#7FB6DE, #CFE6F2 60%)';
  const awn = ['#D93A3F', '#2E7D87', '#F08A2C', '#1F8A4C', '#D93A3F'];
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        {sky === 'dawn' && <circle cx={860} cy={1010} r={110} fill="#FFC36B" opacity={0.85} />}
        {sky === 'day' && <circle cx={900} cy={300} r={90} fill="#FFE07A" stroke="#F5C431" strokeWidth={10} />}
        {/* prédio + torres */}
        <rect x={40} y={900} width={1000} height={330} fill="#4F6E9A" {...ink} />
        {[110, 380, 650, 920].map((x) => (
          <g key={x}>
            <rect x={x - 45} y={700} width={90} height={260} fill="#4A6690" {...ink} />
            <path d={`M${x - 62},712 L${x},560 L${x + 62},712 Z`} fill="#2F4A70" {...ink} />
            <rect x={x - 18} y={760} width={36} height={56} rx={16} fill="#E7D08A" {...ink} />
          </g>
        ))}
        <rect x={350} y={950} width={380} height={64} rx={10} fill="#E9E6DC" {...ink} />
        <text x={540} y={997} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={42} fill={C.ink} letterSpacing={4}>VER-O-PESO</text>
        {/* barracas */}
        {awn.map((c, i) => (
          <g key={i}>
            <rect x={i * 220 - 40} y={1300} width={200} height={240} fill="#B98552" {...ink} />
            <path d={`M${i * 220 - 50},1300 L${i * 220 - 30},1200 L${i * 220 + 150},1200 L${i * 220 + 170},1300 Z`} fill={c} {...ink} />
            {[0, 1, 2].map((j) => <line key={j} x1={i * 220 + 5 + j * 55} y1={1205} x2={i * 220 - 5 + j * 55} y2={1298} stroke="rgba(255,255,255,0.45)" strokeWidth={14} />)}
            {[0, 1, 2].map((j) => <rect key={j} x={i * 220 - 20 + j * 60} y={1340} width={50} height={40} fill="#8E5E36" {...ink} />)}
          </g>
        ))}
        <rect x={0} y={1540} width={1080} height={380} fill={sky === 'dawn' ? '#9C8A7A' : '#C9B79A'} />
        <line x1={0} y1={1540} x2={1080} y2={1540} stroke={C.ink} strokeWidth={8} />
      </svg>
    </AbsoluteFill>
  );
};

/** fachada da escola estadual com portão */
export const SchoolGate: React.FC<{open?: number}> = ({open = 0}) => (
  <AbsoluteFill style={{background: 'linear-gradient(#8EC3E6, #CFE6F2 60%)'}}>
    <svg width={1080} height={1920} style={{position: 'absolute'}}>
      <rect x={-20} y={620} width={1120} height={900} fill="#F2CF6B" {...ink} />
      <rect x={-20} y={620} width={1120} height={110} fill="#2E7D87" {...ink} />
      <text x={540} y={695} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={64} fill="#fff" letterSpacing={3}>ESCOLA ESTADUAL</text>
      {[80, 820].map((x) => (
        <g key={x}>
          <rect x={x} y={800} width={180} height={160} fill="#8EC3E6" {...ink} />
          <line x1={x + 90} y1={800} x2={x + 90} y2={960} {...ink} />
        </g>
      ))}
      <rect x={300} y={860} width={480} height={660} fill="#3B3547" {...ink} />
      <g transform={`translate(${open * 230}, 0)`}>
        {Array.from({length: 9}, (_, i) => <rect key={i} x={312 + i * 28} y={870} width={12} height={640} fill="#9AA3AE" stroke={C.ink} strokeWidth={4} />)}
        <rect x={306} y={1000} width={256} height={14} fill="#9AA3AE" stroke={C.ink} strokeWidth={4} />
      </g>
      <rect x={0} y={1520} width={1080} height={400} fill="#7A7570" />
      <line x1={0} y1={1520} x2={1080} y2={1520} stroke={C.ink} strokeWidth={8} />
    </svg>
  </AbsoluteFill>
);

/** rua com casas que passam (bicicleta em movimento) */
export const RoadRush: React.FC<{speed?: number}> = ({speed = 14}) => {
  const f = useCurrentFrame();
  const off = -((f * speed) % 1140);
  const houses = ['#F2C14E', '#E8735A', '#5BB0D9', '#8BC48A', '#E9A0B8', '#F2C14E'];
  const row = (dx: number) =>
    houses.map((c, i) => (
      <g key={`${dx}-${i}`}>
        <rect x={dx + i * 190} y={760} width={190} height={420} fill={c} {...ink} />
        <path d={`M${dx + i * 190 - 20},770 L${dx + i * 190 + 95},660 L${dx + i * 190 + 210},770 Z`} fill="#A8513A" {...ink} />
        <rect x={dx + i * 190 + 60} y={860} width={70} height={70} fill="#3B4A6B" {...ink} />
      </g>
    ));
  return (
    <AbsoluteFill style={{background: 'linear-gradient(#F7B26A, #FCE1A8 60%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <circle cx={820} cy={420} r={90} fill="#FFE07A" />
        <g>{row(off)}{row(off + 1140)}</g>
        <rect x={0} y={1180} width={1080} height={740} fill="#5F6470" />
        <line x1={0} y1={1180} x2={1080} y2={1180} stroke={C.ink} strokeWidth={8} />
        {Array.from({length: 9}, (_, i) => <rect key={i} x={((i * 180 - f * speed * 1.6) % 1620 + 1620) % 1620 - 270} y={1560} width={110} height={16} fill="#F5C431" />)}
        {Array.from({length: 4}, (_, i) => <line key={i} x1={1080 - ((f * 30 + i * 300) % 1300)} y1={1300 + i * 70} x2={1080 - ((f * 30 + i * 300) % 1300) + 160} y2={1300 + i * 70} stroke="rgba(255,255,255,0.6)" strokeWidth={8} strokeLinecap="round" />)}
      </svg>
    </AbsoluteFill>
  );
};

/** Rafa pedalando: corpo atrás da bike, inclinado pra frente, com a caixa térmica */
export const RafaBike: React.FC<{width?: number; expr?: any; blink?: boolean; sweat?: boolean}> = ({width = 520, expr = 'determined', blink, sweat}) => {
  const f = useCurrentFrame();
  const k = width / 520;
  return (
    <div style={{position: 'relative', width, height: 760 * k}}>
      <div style={{position: 'absolute', left: 130 * k, top: bob(f, 0, 8 * k, 10), transform: 'rotate(8deg)', transformOrigin: 'bottom center'}}>
        <Rafa width={300 * k} expr={expr} blink={blink} look={[0.8, 0]} />
      </div>
      <div style={{position: 'absolute', left: 0, top: 470 * k}}><Bike width={width} /></div>
      <div style={{position: 'absolute', left: 30 * k, top: 380 * k, width: 150 * k, height: 110 * k, background: '#F4F6FA', border: `${7 * k}px solid ${C.ink}`, borderRadius: 14 * k}}>
        <div style={{height: 30 * k, background: '#2D6A9A', borderBottom: `${6 * k}px solid ${C.ink}`, borderRadius: `${8 * k}px ${8 * k}px 0 0`}} />
      </div>
      {sweat && [0, 1].map((i) => (
        <div key={i} style={{position: 'absolute', left: (330 + i * 60) * k, top: (40 + ((f * 3 + i * 20) % 50)) * k, width: 18 * k, height: 26 * k, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#7EC8F0', border: `${4 * k}px solid ${C.ink}`}} />
      ))}
    </div>
  );
};

// ---------- ícones ----------
export const Fish: React.FC<{w?: number}> = ({w = 200}) => (
  <svg viewBox="0 0 200 110" width={w} height={w * 0.55}><path d="M20,55 Q80,0 150,55 Q80,110 20,55 Z M150,55 L195,20 L195,90 Z" fill="#9FB6C9" stroke={C.ink} strokeWidth={8} strokeLinejoin="round" /><circle cx={55} cy={48} r={8} fill={C.ink} /></svg>
);
export const Ice: React.FC<{w?: number}> = ({w = 170}) => (
  <svg viewBox="0 0 170 150" width={w} height={w * 0.88}>{[[10, 60], [80, 60], [45, 0]].map(([x, y], i) => <rect key={i} x={x} y={y} width={72} height={72} rx={12} fill="#E6F6FF" stroke={C.ink} strokeWidth={7} />)}</svg>
);
export const Acai: React.FC<{w?: number}> = ({w = 190}) => (
  <svg viewBox="0 0 190 130" width={w} height={w * 0.68}><ellipse cx={95} cy={40} rx={85} ry={24} fill="#5B2A6E" stroke={C.ink} strokeWidth={7} /><path d="M10,40 Q20,125 95,125 Q170,125 180,40" fill="#fff" stroke={C.ink} strokeWidth={8} /><text x={95} y={98} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill="#5B2A6E">AÇAÍ</text></svg>
);
/** geladinho (saquinho comprido com nó) */
export const Geladinho: React.FC<{w?: number; color?: string; r?: number}> = ({w = 70, color = '#EFE3C8', r = 0}) => (
  <svg viewBox="0 0 70 230" width={w} height={w * 3.3} style={{transform: `rotate(${r}deg)`}}>
    <path d="M28,8 L42,8 L40,30 L30,30 Z" fill="#fff" stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
    <rect x={10} y={30} width={50} height={190} rx={22} fill={color} stroke={C.ink} strokeWidth={7} />
    <rect x={18} y={44} width={10} height={140} rx={5} fill="rgba(255,255,255,0.55)" />
  </svg>
);
/** saco de polpa de cupuaçu */
export const PolpaSack: React.FC<{w?: number}> = ({w = 260}) => (
  <svg viewBox="0 0 260 300" width={w} height={w * 1.15}>
    <path d="M40,60 Q130,20 220,60 L240,280 L20,280 Z" fill="#F3EAD2" stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
    <text x={130} y={150} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill="#8A5A2B">POLPA DE</text>
    <text x={130} y={195} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill="#8A5A2B">CUPUAÇU</text>
    <text x={130} y={250} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={46} fill={C.redPill}>10 KG</text>
  </svg>
);
