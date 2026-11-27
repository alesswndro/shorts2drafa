import React from 'react';
import {C} from '../theme';
import {BikeFrame} from './BikeRide';

export type Expr = 'neutral' | 'sad' | 'surprised' | 'happy' | 'worried' | 'serious' | 'determined' | 'scream';

export type PersonProps = {
  skin?: string;
  hat?: 'rafaCap' | 'scarf' | 'cap' | 'straw' | 'none';
  apron?: string;
  hatColor?: string;
  hair?: 'short' | 'puffs' | 'bun' | 'none';
  hairColor?: string;
  shirt?: string;
  bottom?: 'shorts' | 'skirt';
  bottomColor?: string;
  backpack?: boolean;
  suspenders?: boolean;
  bag?: boolean;
  expr?: Expr;
  look?: [number, number]; // -1..1
  blink?: boolean;
  armUp?: 'none' | 'left' | 'right' | 'both'; // braço levantado (direita da tela = 'right')
  holdPhone?: boolean;
  width?: number;
  style?: React.CSSProperties;
};

const S = 9; // espessura do contorno no viewBox (400 de largura)

const Brows: React.FC<{expr: Expr}> = ({expr}) => {
  // [dy interno, dy externo]
  const m: Record<Expr, [number, number]> = {
    neutral: [0, 0],
    happy: [-6, -2],
    surprised: [-18, -12],
    sad: [-14, 6],
    worried: [-16, 4],
    serious: [8, -2],
    determined: [12, -4],
    scream: [-26, -18],
  };
  const [i, o] = m[expr];
  return (
    <g stroke={C.ink} strokeWidth={14} strokeLinecap="round" fill="none">
      <path d={`M112,${196 + o} Q140,${186 + (o + i) / 2 - 6} 168,${196 + i}`} />
      <path d={`M232,${196 + i} Q260,${186 + (o + i) / 2 - 6} 288,${196 + o}`} />
    </g>
  );
};

const Mouth: React.FC<{expr: Expr}> = ({expr}) => {
  const p = {stroke: C.ink, strokeWidth: S, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  switch (expr) {
    case 'happy':
      return (
        <g>
          <path d="M160,322 Q200,362 240,322 Z" fill="#2A1A1A" {...p} />
          <rect x={180} y={322} width={40} height={11} rx={3} fill="#fff" />
        </g>
      );
    case 'surprised':
      return <ellipse cx={200} cy={338} rx={18} ry={24} fill="#2A1A1A" {...p} />;
    case 'scream':
      return (
        <g>
          <ellipse cx={200} cy={340} rx={40} ry={52} fill="#2A1A1A" {...p} />
          <ellipse cx={200} cy={370} rx={24} ry={14} fill="#D9545A" />
        </g>
      );
    case 'sad':
      return <path d="M170,342 Q200,318 230,342" fill="none" {...p} />;
    case 'worried':
      return <path d="M168,336 Q184,326 200,336 Q216,346 232,334" fill="none" {...p} />;
    case 'serious':
      return <path d="M176,334 L224,334" fill="none" {...p} />;
    case 'determined':
      return <path d="M172,330 Q200,344 228,330" fill="none" {...p} />;
    default:
      return <path d="M178,330 Q200,342 222,330" fill="none" {...p} />;
  }
};

export const Person: React.FC<PersonProps> = ({
  skin = C.skin,
  hat = 'none',
  hatColor = '#D9343C',
  hair = 'none',
  hairColor = '#1E1B26',
  shirt = C.teal,
  bottom = 'shorts',
  bottomColor = '#3E5BA0',
  backpack = false,
  suspenders = false,
  bag = false,
  expr = 'neutral',
  look = [0, 0],
  blink = false,
  armUp = 'none',
  holdPhone = false,
  apron,
  width = 400,
  style,
}) => {
  const ink = {stroke: C.ink, strokeWidth: S, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
  const px = look[0] * 13;
  const py = look[1] * 10;
  const eye = (cx: number) =>
    blink ? (
      <path d={`M${cx - 30},252 Q${cx},266 ${cx + 30},252`} fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    ) : (
      <g>
        <circle cx={cx} cy={252} r={expr === 'scream' ? 48 : 38} fill="#fff" {...ink} />
        <circle cx={cx + px} cy={254 + py} r={expr === 'scream' ? 13 : 19} fill={C.ink} />
        <circle cx={cx + px - 7} cy={246 + py} r={6.5} fill="#fff" />
      </g>
    );
  const legBottom = bottom === 'skirt' ? 780 : 768;
  return (
    <svg viewBox="0 0 400 820" width={width} height={(width * 820) / 400} style={{overflow: 'visible', ...style}}>
      {/* mochila atrás */}
      {backpack && (
        <g>
          <rect x={52} y={332} width={296} height={318} rx={42} fill={C.orange} {...ink} />
          <rect x={52} y={410} width={296} height={22} fill="#C9601A" />
        </g>
      )}
      {/* pernas */}
      <rect x={150} y={590} width={36} height={legBottom - 590} rx={10} fill={skin} {...ink} />
      <rect x={214} y={590} width={36} height={legBottom - 590} rx={10} fill={skin} {...ink} />
      <path d={`M134,${legBottom - 6} h58 v26 h-66 q-4,-26 8,-26 Z`} fill={bottom === 'skirt' ? '#4A2E22' : '#fff'} {...ink} />
      <path d={`M208,${legBottom - 6} h58 q12,0 8,26 h-66 Z`} fill={bottom === 'skirt' ? '#4A2E22' : '#fff'} {...ink} />
      {/* parte de baixo */}
      {bottom === 'shorts' ? (
        <path d="M128,540 L272,540 L282,640 L210,640 L200,600 L190,640 L118,640 Z" fill={bottomColor} {...ink} />
      ) : (
        <path d="M130,520 L270,520 L312,700 L88,700 Z" fill={bottomColor} {...ink} />
      )}
      {/* braços */}
      {armUp === 'left' || armUp === 'both' ? (
        <rect x={60} y={150} width={50} height={250} rx={25} fill={skin} {...ink} transform="rotate(-12 85 390)" />
      ) : (
        <rect x={84} y={380} width={50} height={230} rx={25} fill={skin} {...ink} transform="rotate(8 109 390)" />
      )}
      {armUp === 'right' || armUp === 'both' ? (
        <rect x={290} y={150} width={50} height={250} rx={25} fill={skin} {...ink} transform="rotate(12 315 390)" />
      ) : holdPhone ? (
        <rect x={268} y={300} width={50} height={130} rx={25} fill={skin} {...ink} transform="rotate(-25 293 420)" />
      ) : (
        <rect x={266} y={380} width={50} height={230} rx={25} fill={skin} {...ink} transform="rotate(-8 291 390)" />
      )}
      {/* tronco */}
      <path d="M124,382 Q124,366 142,366 L258,366 Q276,366 276,382 L282,560 L118,560 Z" fill={shirt} {...ink} />
      {apron && (
        <g>
          <path d="M146,410 L254,410 L268,600 L132,600 Z" fill={apron} stroke={C.ink} strokeWidth={S} strokeLinejoin="round" />
          <rect x={176} y={470} width={48} height={34} rx={6} fill="rgba(0,0,0,0.12)" />
        </g>
      )}
      {suspenders && (
        <g stroke="#3B3A44" strokeWidth={16} strokeLinecap="round">
          <line x1={160} y1={372} x2={160} y2={548} />
          <line x1={240} y1={372} x2={240} y2={548} />
          <line x1={146} y1={470} x2={254} y2={470} stroke="#4A4953" strokeWidth={22} />
        </g>
      )}
      {bag && (
        <g>
          <line x1={140} y1={372} x2={262} y2={520} stroke={C.ink} strokeWidth={8} />
          <rect x={246} y={500} width={58} height={50} rx={10} fill="#5A3A2A" {...ink} />
        </g>
      )}
      {/* cabelo atrás */}
      {hair === 'puffs' && (
        <g fill={hairColor} {...ink}>
          <circle cx={78} cy={140} r={48} />
          <circle cx={322} cy={140} r={48} />
        </g>
      )}
      {hair === 'bun' && <circle cx={200} cy={70} r={46} fill={hairColor} {...ink} />}
      {/* cabeça */}
      <circle cx={200} cy={236} r={150} fill={skin} {...ink} />
      {hair === 'short' && <path d="M58,210 Q70,92 200,86 Q330,92 342,210 Q300,150 200,150 Q100,150 58,210 Z" fill={hairColor} {...ink} />}
      {hair === 'puffs' && <path d="M60,205 Q72,96 200,88 Q328,96 340,205 Q290,140 200,142 Q110,140 60,205 Z" fill={hairColor} {...ink} />}
      {hair === 'bun' && <path d="M56,230 Q60,90 200,86 Q340,90 344,230 Q300,140 200,140 Q100,140 56,230 Z" fill={hairColor} {...ink} />}
      {/* rosto */}
      <ellipse cx={122} cy={312} rx={30} ry={19} fill={C.cheek} opacity={0.85} />
      <ellipse cx={278} cy={312} rx={30} ry={19} fill={C.cheek} opacity={0.85} />
      {eye(150)}
      {eye(250)}
      <Brows expr={expr} />
      <path d="M204,280 Q216,296 202,306" fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
      <Mouth expr={expr} />
      {/* chapéus */}
      {hat === 'rafaCap' && (
        <g {...ink}>
          <path d="M300,150 Q372,108 392,128 Q396,152 330,196 Z" fill={hatColor} />
          <path d="M52,214 Q58,84 200,80 Q342,84 348,214 Q270,178 200,180 Q130,178 52,214 Z" fill={hatColor} />
          <path d="M150,182 Q200,168 250,182" fill="none" stroke="#A8232B" strokeWidth={10} />
        </g>
      )}
      {hat === 'cap' && (
        <g {...ink}>
          <path d="M54,200 Q60,86 200,82 Q340,86 346,200 Q270,168 200,170 Q130,168 54,200 Z" fill={hatColor} />
          <path d="M40,200 Q130,150 220,176 Q130,214 40,214 Z" fill={hatColor} />
        </g>
      )}
      {hat === 'straw' && (
        <g {...ink}>
          <ellipse cx={200} cy={150} rx={196} ry={44} fill="#E3C27A" />
          <path d="M92,150 Q100,40 200,36 Q300,40 308,150 Z" fill="#E9CD8C" />
          <path d="M96,128 Q200,108 304,128" fill="none" stroke="#C0392B" strokeWidth={16} />
        </g>
      )}
      {hat === 'scarf' && (
        <g {...ink}>
          <path d="M50,214 Q52,78 200,74 Q348,78 350,214 Q280,170 200,172 Q120,170 50,214 Z" fill={hatColor} />
          <path d="M330,130 Q392,110 396,150 Q370,160 340,170 Z" fill={hatColor} />
          <path d="M336,150 Q380,190 366,214 Q340,196 328,172 Z" fill={hatColor} />
        </g>
      )}
      {holdPhone && (
        <g>
          <rect x={318} y={196} width={64} height={108} rx={12} fill="#2B2A33" {...ink} />
          <rect x={328} y={210} width={44} height={78} rx={5} fill="#7CE0B8" />
          <circle cx={340} cy={300} r={26} fill={skin} {...ink} />
        </g>
      )}
    </svg>
  );
};

// ---------- elenco ----------
export const Rafa: React.FC<Partial<PersonProps>> = (p) => (
  <Person hat="rafaCap" shirt={C.teal} backpack suspenders bottomColor="#3E5BA0" {...p} />
);
export const Mae: React.FC<Partial<PersonProps>> = (p) => (
  <Person skin={C.skinMae} hat="scarf" hatColor={C.purple} shirt="#E8907A" bottom="skirt" bottomColor="#34304A" bag {...p} />
);
export const Kaua: React.FC<Partial<PersonProps>> = (p) => (
  <Person skin="#6E3F22" hair="short" shirt="#3FA86A" bottomColor="#5A5A6E" {...p} />
);
export const Biel: React.FC<Partial<PersonProps>> = (p) => (
  <Person skin="#A86A44" hat="cap" hatColor="#F5C431" shirt="#E9ECEF" bottomColor="#2F4F7F" {...p} />
);
export const Duda: React.FC<Partial<PersonProps>> = (p) => (
  <Person skin="#7E4A2A" hair="puffs" shirt="#E86A9A" bottomColor="#3E5BA0" {...p} />
);

export const Bike: React.FC<{width?: number; style?: React.CSSProperties}> = ({width = 420, style}) => (
  <svg viewBox="40 140 530 380" width={width} height={(width * 380) / 530} style={{overflow: 'visible', ...style}}>
    <BikeFrame />
  </svg>
);

/** a senhora do geladinho (EP06): chapéu de palha, cabelo branco curto, avental verde-água */
export const SenhoraGeladinho: React.FC<Partial<PersonProps>> = (p) => (
  <Person skin="#7A4A2C" hair="short" hairColor="#E8E6E0" hat="straw" shirt="#F0A04B" bottom="skirt" bottomColor="#5B4A8A" apron="#8FD6C8" {...p} />
);
