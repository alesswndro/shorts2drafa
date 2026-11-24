import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT, HAND} from '../theme';

const ink = {stroke: C.ink, strokeWidth: 8, strokeLinejoin: 'round' as const};

/** parede de tábuas */
export const Planks: React.FC<{color: string; seam: string; vertical?: boolean}> = ({color, seam, vertical = true}) => (
  <AbsoluteFill style={{background: color}}>
    <svg width={1080} height={1920}>
      {Array.from({length: 14}, (_, i) => (vertical ? <line key={i} x1={i * 84} y1={0} x2={i * 84} y2={1920} stroke={seam} strokeWidth={5} /> : <line key={i} x1={0} y1={i * 150} x2={1080} y2={i * 150} stroke={seam} strokeWidth={5} />))}
    </svg>
  </AbsoluteFill>
);

/** cozinha de casa à noite: tábuas, janela com lua, lâmpada, mesa */
export const KitchenNight: React.FC<{dim?: number; table?: boolean}> = ({dim = 0, table = true}) => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 22) * 2;
  return (
    <AbsoluteFill>
      <Planks color="#9C6B3F" seam="#7E5430" />
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <rect x={640} y={420} width={250} height={250} fill="#1D2650" {...ink} />
        <line x1={765} y1={420} x2={765} y2={670} {...ink} />
        <line x1={640} y1={545} x2={890} y2={545} {...ink} />
        <circle cx={830} cy={480} r={22} fill="#F3EBC8" />
        <g transform={`rotate(${sway} 380 0)`}>
          <line x1={380} y1={0} x2={380} y2={330} stroke={C.ink} strokeWidth={6} />
          <circle cx={380} cy={350} r={160} fill="#FFE9A8" opacity={0.18} />
          <circle cx={380} cy={350} r={30} fill="#FFE07A" {...ink} />
        </g>
        <rect x={0} y={1500} width={1080} height={420} fill="#6E6A66" />
        <line x1={0} y1={1500} x2={1080} y2={1500} stroke={C.ink} strokeWidth={8} />
      </svg>
      {table && (
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <rect x={-20} y={1390} width={1120} height={70} fill="#B98552" {...ink} />
          <rect x={-20} y={1452} width={1120} height={480} fill="#8E5E36" {...ink} />
        </svg>
      )}
      <AbsoluteFill style={{background: `rgba(10,8,30,${0.18 + dim})`}} />
    </AbsoluteFill>
  );
};

/** mesa da frente (por cima dos personagens) */
export const TableFront: React.FC = () => (
  <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
    <rect x={-20} y={1390} width={1120} height={70} fill="#B98552" {...ink} />
    <rect x={-20} y={1452} width={1120} height={480} fill="#8E5E36" {...ink} />
  </svg>
);

/** cozinha de restaurante (trabalho da mãe) */
export const WorkKitchen: React.FC = () => (
  <AbsoluteFill style={{background: '#E9E4D8'}}>
    <svg width={1080} height={1920}>
      {Array.from({length: 12}, (_, r) => Array.from({length: 9}, (_, c) => (
        <rect key={`${r}-${c}`} x={c * 124 + (r % 2) * 62 - 40} y={r * 90 + 260} width={120} height={86} fill="#F4F1EA" stroke="#CFC8BA" strokeWidth={4} />
      )))}
      <rect x={0} y={320} width={1080} height={46} fill="#3E7F8A" {...ink} />
      {[160, 380, 840].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={366} x2={x} y2={420} stroke={C.ink} strokeWidth={6} />
          <path d={`M${x - 60},420 h120 v30 a60,60 0 0 1 -120,0 Z`} fill={i === 1 ? '#C9A55A' : '#8A8F98'} {...ink} />
        </g>
      ))}
      <rect x={0} y={1440} width={1080} height={480} fill="#B9B4AA" />
      <rect x={-20} y={1300} width={1120} height={70} fill="#9AA3AE" {...ink} />
      <rect x={-20} y={1362} width={1120} height={600} fill="#7D8794" {...ink} />
      <ellipse cx={850} cy={1300} rx={110} ry={26} fill="#fff" {...ink} />
    </svg>
  </AbsoluteFill>
);

/** porta azul com aviso de despejo */
export const EvictionDoor: React.FC<{stampAt: number}> = ({stampAt}) => {
  const f = useCurrentFrame();
  const t = f - stampAt;
  const s = t < 0 ? 0 : t < 4 ? 1.8 - t * 0.2 : 1;
  return (
    <AbsoluteFill>
      <Planks color="#2F8C93" seam="#246F75" />
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <rect x={190} y={420} width={700} height={1240} fill="#2D5D9A" {...ink} />
        <rect x={0} y={1660} width={1080} height={260} fill="#6E6A66" />
        <line x1={0} y1={1660} x2={1080} y2={1660} stroke={C.ink} strokeWidth={8} />
        <circle cx={820} cy={1080} r={22} fill={C.yellow} {...ink} />
      </svg>
      <div style={{position: 'absolute', left: 270, top: 560, width: 540, height: 700, background: '#FBF8EF', border: `8px solid ${C.ink}`, transform: 'rotate(-3deg)', fontFamily: FONT, fontWeight: 700, textAlign: 'center', paddingTop: 40}}>
        <div style={{fontSize: 70, color: C.ink, lineHeight: 1}}>AVISO DE</div>
        <div style={{fontSize: 92, color: C.redPill, lineHeight: 1}}>DESPEJO</div>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{height: 12, background: '#C9C4B8', margin: '26px 60px 0', borderRadius: 6, width: i === 3 ? 260 : 'auto'}} />)}
        <div style={{position: 'absolute', left: 60, right: 60, top: 470, border: `9px solid ${C.redPill}`, borderRadius: 16, color: C.redPill, fontSize: 104, transform: `rotate(-6deg) scale(${s})`, opacity: t < 0 ? 0 : 1}}>R$ 1.800</div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 26, fontSize: 30, color: C.ink}}>PRAZO: 30 DIAS</div>
      </div>
    </AbsoluteFill>
  );
};

/** caderno pautado em cima da mesa */
export const NotebookPage: React.FC<{children?: React.ReactNode; rot?: number}> = ({children, rot = -2}) => (
  <AbsoluteFill style={{background: '#7E5430'}}>
    <Planks color="#8E5E36" seam="#6E4526" vertical={false} />
    <div style={{position: 'absolute', left: 90, top: 330, width: 900, height: 1300, background: '#FBFBF6', border: `9px solid ${C.ink}`, borderRadius: 12, transform: `rotate(${rot}deg)`, overflow: 'hidden', backgroundImage: 'repeating-linear-gradient(#FBFBF6 0 78px, #9EC0E8 78px 82px)', backgroundPosition: '0 40px'}}>
      <div style={{position: 'absolute', left: 110, top: 0, bottom: 0, width: 5, background: '#F08C8C'}} />
      {Array.from({length: 9}, (_, i) => <div key={i} style={{position: 'absolute', left: 30, top: 80 + i * 140, width: 36, height: 36, borderRadius: 18, background: '#7E5430', border: `5px solid ${C.ink}`}} />)}
      <div style={{position: 'absolute', left: 150, top: 40, right: 40, fontFamily: HAND, color: '#2A3A8C'}}>{children}</div>
    </div>
  </AbsoluteFill>
);

/** rua do bairro de manhã */
export const StreetMorning: React.FC = () => {
  const houses = ['#F2C14E', '#E8735A', '#5BB0D9', '#8BC48A', '#E9A0B8', '#F2C14E'];
  return (
    <AbsoluteFill style={{background: 'linear-gradient(#8EC3E6, #CFE6F2 60%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <circle cx={880} cy={260} r={90} fill="#FFE07A" stroke="#F5C431" strokeWidth={10} />
        {houses.map((c, i) => (
          <g key={i}>
            <rect x={i * 190 - 40} y={760} width={190} height={420} fill={c} {...ink} />
            <path d={`M${i * 190 - 60},770 L${i * 190 + 55},660 L${i * 190 + 170},770 Z`} fill="#A8513A" {...ink} />
            <rect x={i * 190 + 20} y={860} width={70} height={70} fill="#3B4A6B" {...ink} />
            <rect x={i * 190 + 100} y={1010} width={60} height={170} fill="#6B4A2E" {...ink} />
          </g>
        ))}
        {[120, 560, 960].map((x, i) => (
          <g key={i}>
            <rect x={x - 18} y={900} width={36} height={300} fill="#6B4A2E" {...ink} />
            <circle cx={x} cy={830} r={150} fill="#3E8E4E" {...ink} />
            <circle cx={x - 60} cy={800} r={18} fill={C.orange} {...ink} />
            <circle cx={x + 50} cy={870} r={18} fill={C.orange} {...ink} />
          </g>
        ))}
        <rect x={0} y={1180} width={1080} height={740} fill="#5F6470" />
        <line x1={0} y1={1180} x2={1080} y2={1180} stroke={C.ink} strokeWidth={8} />
        {Array.from({length: 7}, (_, i) => <rect key={i} x={i * 180 + 20} y={1560} width={110} height={16} fill="#F5C431" />)}
      </svg>
    </AbsoluteFill>
  );
};

/** polaroid de lembrança */
export const Polaroid: React.FC<{label: string; color: string; icon: string}> = ({label, color, icon}) => (
  <div style={{width: 280, background: '#fff', border: `7px solid ${C.ink}`, padding: 16, paddingBottom: 10, fontFamily: FONT, fontWeight: 700, textAlign: 'center'}}>
    <div style={{height: 220, background: color, border: `5px solid ${C.ink}`, fontSize: 130, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
    <div style={{fontSize: 40, color: C.ink, marginTop: 6}}>{label}</div>
  </div>
);

/** ícone de entrega (sacola da farmácia) */
export const DeliveryIcon: React.FC<{gray?: boolean}> = ({gray}) => (
  <svg viewBox="0 0 120 130" width={150} height={162} style={{filter: gray ? 'grayscale(1) opacity(0.35)' : 'none'}}>
    <path d="M38,34 Q60,0 82,34" fill="none" stroke={C.ink} strokeWidth={8} />
    <path d="M18,34 L102,34 L112,124 L8,124 Z" fill="#fff" stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={52} y={58} width={16} height={48} fill="#2DA44E" />
    <rect x={36} y={74} width={48} height={16} fill="#2DA44E" />
  </svg>
);
