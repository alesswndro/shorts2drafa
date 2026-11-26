import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

/**
 * Bicicleta de perfil no estilo dos EP01–04 (quadro azul com contorno escuro, pneus pretos com raios)
 * e o Rafa SENTADO pedalando: pedivela gira, pernas por cinemática inversa (joelho acompanha o pedal),
 * tronco inclinado, braço no guidão, mochila laranja nas costas, rodas girando.
 * viewBox 600x520 (rodas tocam o chão em y≈500).
 */
type Expr = 'neutral' | 'happy' | 'worried' | 'sad' | 'surprised' | 'determined';
const INK = C.ink, BLUE = '#3C86D6', SKIN = C.skin, SKIN_D = '#6E3F22', TEAL = C.teal, SHORTS = '#3E5BA0';

const RW = 95, REAR: [number, number] = [150, 405], FRONT: [number, number] = [455, 405], BB: [number, number] = [300, 405];
const SEAT: [number, number] = [262, 248], HEAD_T: [number, number] = [428, 250], HEAD_B: [number, number] = [438, 300];
const HIP: [number, number] = [258, 222], L1 = 118, L2 = 112, CRANK = 46;

const ik = (h: [number, number], p: [number, number]): [number, number] => {
  const dx = p[0] - h[0], dy = p[1] - h[1];
  let d = Math.hypot(dx, dy);
  d = Math.min(d, L1 + L2 - 1);
  const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
  const hh = Math.sqrt(Math.max(0, L1 * L1 - a * a));
  const ux = dx / Math.hypot(dx, dy), uy = dy / Math.hypot(dx, dy);
  // perpendicular apontando pra frente/cima (joelho à frente)
  return [h[0] + a * ux + hh * uy, h[1] + a * uy - hh * ux];
};

const Wheel: React.FC<{c: [number, number]; rot: number}> = ({c, rot}) => (
  <g>
    <circle cx={c[0]} cy={c[1]} r={RW} fill="none" stroke={INK} strokeWidth={18} />
    <circle cx={c[0]} cy={c[1]} r={RW - 12} fill="none" stroke="#C9CDD6" strokeWidth={4} />
    {Array.from({length: 8}, (_, i) => {
      const a = rot + (i * Math.PI) / 4;
      return <line key={i} x1={c[0]} y1={c[1]} x2={c[0] + Math.cos(a) * (RW - 14)} y2={c[1] + Math.sin(a) * (RW - 14)} stroke="#C9CDD6" strokeWidth={3} />;
    })}
    <circle cx={c[0]} cy={c[1]} r={10} fill="#C9CDD6" stroke={INK} strokeWidth={5} />
  </g>
);

const Tube: React.FC<{d: string; w?: number; color?: string}> = ({d, w = 13, color = BLUE}) => (
  <g strokeLinecap="round" strokeLinejoin="round" fill="none">
    <path d={d} stroke={INK} strokeWidth={w + 10} />
    <path d={d} stroke={color} strokeWidth={w} />
  </g>
);

const Limb: React.FC<{pts: [number, number][]; w: number; color: string}> = ({pts, w, color}) => {
  const d = 'M' + pts.map((p) => p.join(',')).join(' L');
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={d} stroke={INK} strokeWidth={w + 10} />
      <path d={d} stroke={color} strokeWidth={w} />
    </g>
  );
};

export const BikeFrame: React.FC<{rot?: number; crank?: number; cooler?: boolean; rider?: boolean}> = ({rot = 0, crank = 0, cooler}) => {
  const p1: [number, number] = [BB[0] + Math.cos(crank) * CRANK, BB[1] + Math.sin(crank) * CRANK];
  return (
    <g>
      <Wheel c={REAR} rot={rot} />
      <Wheel c={FRONT} rot={rot} />
      {cooler && (
        <g>
          <Tube d={`M${REAR[0]},${REAR[1]} L${REAR[0] - 20},300 M${REAR[0] - 60},300 L${REAR[0] + 90},300`} w={7} color="#8A8F98" />
          <rect x={REAR[0] - 80} y={210} width={170} height={92} rx={14} fill="#F4F6FA" stroke={INK} strokeWidth={8} />
          <rect x={REAR[0] - 80} y={210} width={170} height={28} rx={10} fill="#2D6A9A" stroke={INK} strokeWidth={7} />
        </g>
      )}
      <Tube d={`M${REAR[0]},${REAR[1]} L${BB[0]},${BB[1]} L${SEAT[0]},${SEAT[1]} L${REAR[0]},${REAR[1]} M${SEAT[0]},${SEAT[1]} L${HEAD_T[0]},${HEAD_T[1]} L${HEAD_B[0]},${HEAD_B[1]} L${BB[0]},${BB[1]} M${HEAD_B[0]},${HEAD_B[1]} L${FRONT[0]},${FRONT[1]}`} />
      <Tube d={`M${HEAD_T[0]},${HEAD_T[1]} L${HEAD_T[0] - 6},${HEAD_T[1] - 38} L${HEAD_T[0] - 40},${HEAD_T[1] - 44}`} w={10} color="#4B4A55" />
      <ellipse cx={SEAT[0] - 6} cy={SEAT[1] - 12} rx={40} ry={13} fill="#3B3A44" stroke={INK} strokeWidth={7} />
      <circle cx={BB[0]} cy={BB[1]} r={20} fill="#C9CDD6" stroke={INK} strokeWidth={7} />
      <line x1={BB[0]} y1={BB[1]} x2={p1[0]} y2={p1[1]} stroke={INK} strokeWidth={10} strokeLinecap="round" />
    </g>
  );
};

const Face: React.FC<{expr: Expr; blink?: boolean}> = ({expr, blink}) => {
  const cx = 392, cy = 62; // olho (perfil, olhando pra frente)
  const mouth: Record<Expr, React.ReactNode> = {
    neutral: <path d="M404,104 Q414,110 424,104" />,
    happy: <path d="M398,100 Q414,120 428,100 Z" fill="#2A1A1A" />,
    determined: <path d="M400,104 Q414,112 426,102" />,
    worried: <path d="M398,108 Q406,100 414,108 Q420,114 428,106" />,
    sad: <path d="M400,110 Q414,98 426,110" />,
    surprised: <ellipse cx={414} cy={108} rx={9} ry={12} fill="#2A1A1A" />,
  };
  const brow: Record<Expr, string> = {
    neutral: 'M372,30 Q392,22 412,30', happy: 'M372,28 Q392,18 412,28', determined: 'M372,24 Q392,30 414,36',
    worried: 'M372,36 Q392,22 412,26', sad: 'M372,34 Q392,22 412,28', surprised: 'M372,20 Q392,10 412,20',
  };
  return (
    <g stroke={INK} strokeWidth={7} strokeLinecap="round" fill="none">
      <ellipse cx={398} cy={86} rx={18} ry={11} fill={C.cheek} stroke="none" opacity={0.85} />
      {blink ? <path d={`M${cx - 20},${cy} Q${cx},${cy + 10} ${cx + 20},${cy}`} strokeWidth={8} /> : (
        <g>
          <circle cx={cx} cy={cy} r={24} fill="#fff" />
          <circle cx={cx + 9} cy={cy + 2} r={12} fill={INK} stroke="none" />
          <circle cx={cx + 5} cy={cy - 3} r={4} fill="#fff" stroke="none" />
        </g>
      )}
      <path d={brow[expr]} strokeWidth={10} />
      <path d="M426,74 Q436,84 426,92" />
      <g strokeWidth={6}>{mouth[expr]}</g>
    </g>
  );
};

export const RafaRiding: React.FC<{width?: number; expr?: Expr; blink?: boolean; sweat?: boolean; cooler?: boolean; speed?: number; style?: React.CSSProperties}> = ({
  width = 600, expr = 'determined', blink, sweat, cooler = true, speed = 1, style,
}) => {
  const f = useCurrentFrame();
  const crank = f * 0.32 * speed;
  const rot = f * 0.22 * speed;
  const bobY = Math.sin(crank * 2) * 2.5;
  const pedal = (a: number): [number, number] => [BB[0] + Math.cos(a) * CRANK, BB[1] + Math.sin(a) * CRANK];
  const hip: [number, number] = [HIP[0], HIP[1] + bobY];
  const pFar = pedal(crank + Math.PI), pNear = pedal(crank);
  const kFar = ik(hip, pFar), kNear = ik(hip, pNear);
  const SH: [number, number] = [338, 128 + bobY];
  const HAND: [number, number] = [HEAD_T[0] - 34, HEAD_T[1] - 44];
  const ELB: [number, number] = [392, 178 + bobY];
  return (
    <svg viewBox="0 -20 600 540" width={width} height={(width * 540) / 600} style={{overflow: 'visible', ...style}}>
      {/* perna de trás + pedal de trás */}
      <Limb pts={[hip, kFar, pFar]} w={24} color={SKIN_D} />
      <ellipse cx={pFar[0] + 10} cy={pFar[1] + 4} rx={24} ry={12} fill="#D9D9D9" stroke={INK} strokeWidth={6} />
      <BikeFrame rot={rot} crank={crank} cooler={cooler} />
      {/* mochila laranja */}
      <g transform={`rotate(-14 230 ${120 + bobY})`}>
        <rect x={150} y={36 + bobY} width={160} height={170} rx={24} fill={C.orange} stroke={INK} strokeWidth={9} />
        <rect x={150} y={84 + bobY} width={160} height={18} fill="#C9601A" />
      </g>
      {/* tronco */}
      <Limb pts={[hip, SH]} w={62} color={TEAL} />
      <line x1={hip[0] + 6} y1={hip[1] - 14} x2={SH[0] - 6} y2={SH[1] + 14} stroke="#3B3A44" strokeWidth={12} strokeLinecap="round" />
      {/* bermuda + perna da frente */}
      <Limb pts={[hip, [hip[0] + (kNear[0] - hip[0]) * 0.5, hip[1] + (kNear[1] - hip[1]) * 0.5]]} w={40} color={SHORTS} />
      <Limb pts={[[hip[0] + (kNear[0] - hip[0]) * 0.45, hip[1] + (kNear[1] - hip[1]) * 0.45], kNear, pNear]} w={26} color={SKIN} />
      <ellipse cx={pNear[0] + 10} cy={pNear[1] + 4} rx={26} ry={13} fill="#fff" stroke={INK} strokeWidth={6} />
      {/* braço */}
      <Limb pts={[SH, ELB, HAND]} w={24} color={SKIN} />
      <circle cx={HAND[0]} cy={HAND[1]} r={15} fill={SKIN} stroke={INK} strokeWidth={6} />
      {/* cabeça de perfil + boné vermelho virado pra trás */}
      <g transform={`translate(0 ${bobY})`}>
        <circle cx={380} cy={70} r={70} fill={SKIN} stroke={INK} strokeWidth={9} />
        <path d="M312,62 Q316,-6 384,-4 Q448,0 452,56 Q384,36 312,62 Z" fill="#D9343C" stroke={INK} strokeWidth={9} strokeLinejoin="round" />
        <path d="M318,40 Q280,34 262,52 Q290,62 318,58 Z" fill="#D9343C" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
        <Face expr={expr} blink={blink} />
        {sweat && [0, 1].map((i) => (
          <path key={i} d={`M${330 + i * 30},${-6 + ((f * 2.5 + i * 18) % 40)} q8,14 0,20 q-8,-6 0,-20 Z`} fill="#7EC8F0" stroke={INK} strokeWidth={4} />
        ))}
      </g>
      {/* linhas de velocidade */}
      {speed > 0.5 && [0, 1, 2].map((i) => {
        const x = 40 - ((f * 22 + i * 60) % 180);
        return <line key={i} x1={x} y1={260 + i * 60} x2={x + 70} y2={260 + i * 60} stroke="rgba(255,255,255,0.7)" strokeWidth={7} strokeLinecap="round" />;
      })}
    </svg>
  );
};
