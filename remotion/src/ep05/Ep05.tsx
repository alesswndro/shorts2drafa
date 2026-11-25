import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import align from './align.json';
import {C, FONT, HAND, FPS, strokeText} from '../theme';
import {bob, blinking, pop, ramp, sec} from '../components/anim';
import {Rafa, Mae, Kaua, Biel, Duda, Bike} from '../components/Person';
import {Caption, Hud, Balloon, TitleCard, Poll, Sunburst, ClockPill, CapWord, MetaPill} from '../components/ui';
import {KitchenNight, TableFront, WorkKitchen, EvictionDoor, NotebookPage, StreetMorning, Polaroid, DeliveryIcon} from '../components/sets';

const W = align.words as {w: string; start: number; end: number}[];
const t = (i: number) => sec(W[i].start); // frame em que a palavra i começa
export const EP05_DURATION = Math.round((align.duration + 4) * FPS);

// ---------- legendas: [palavra inicial, final, texto opcional, cores por palavra] ----------
const Y = C.yellow, R = C.red, G = C.green;
type Chunk = [number, number, string?, Record<number, string>?];
const CHUNKS: Chunk[] = [
  [0, 2, undefined, {0: Y, 1: Y, 2: Y}], [3, 4], [5, 6, undefined, {1: Y}], [7, 9, undefined, {1: Y}], [10, 11], [12, 13],
  [14, 15], [16, 17], [18, 19, undefined, {0: R, 1: R}], [20, 21], [22, 23, undefined, {0: Y, 1: Y}], [24, 26], [27, 29, undefined, {2: R}],
  [30, 31], [32, 33, undefined, {1: Y}], [34, 35, undefined, {1: Y}], [36, 37, undefined, {1: Y}], [38, 39, undefined, {1: Y}],
  [40, 41, undefined, {1: Y}], [42, 45], [46, 47, undefined, {1: Y}], [48, 49, undefined, {1: R}],
  [50, 51], [52, 53], [54, 55], [56, 58], [59, 60], [61, 62, undefined, {0: Y, 1: Y}],
  [70, 70], [71, 72], [73, 74, undefined, {1: Y}],
  [94, 96, 'SEM FALHAR NENHUM.', {0: R, 1: R, 2: R}],
  [113, 116], [117, 118, '10 ENTREGAS.', {0: Y, 1: Y}], [119, 119], [120, 121, undefined, {0: R, 1: R}],
  [122, 124], [125, 126], [127, 129, 'MAIS 3 MENINOS', {1: Y, 2: Y}], [130, 131], [132, 133], [134, 135, undefined, {1: R}],
];
// posição vertical da legenda por trecho (s)
const capY = (s: number) => (s < 5 ? 1560 : s < 12 ? 1720 : s < 21 ? 560 : s < 27 ? 1690 : s < 37 ? 560 : s < 41.4 ? 1560 : s < 47 ? 560 : s < 52 ? 440 : 450);

const Captions: React.FC = () => {
  const f = useCurrentFrame();
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

// ---------- helpers de cena ----------
const Scene: React.FC<{from: number; to: number; children: React.ReactNode; zoom?: number}> = ({from, to, children, zoom = 0.04}) => {
  const f = useCurrentFrame();
  if (f < from || f >= to) return null;
  const k = (f - from) / Math.max(1, to - from);
  const intro = interpolate(f - from, [0, 5], [1.05, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{transform: `scale(${(1 + zoom * k) * intro})`}}>{children}</AbsoluteFill>;
};

const At: React.FC<{x: number; y: number; children: React.ReactNode; s?: number; r?: number; o?: number}> = ({x, y, children, s = 1, r = 0, o = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `scale(${s}) rotate(${r}deg)`, transformOrigin: 'center bottom', opacity: o}}>{children}</div>
);

const Write: React.FC<{at: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, dur = 16, children, style}) => {
  const f = useCurrentFrame();
  const p = ramp(f, at, at + dur);
  return <div style={{clipPath: `inset(0 ${100 - p * 100}% 0 0)`, ...style}}>{children}</div>;
};

// ---------- episódio ----------
export const Ep05: React.FC = () => {
  const f = useCurrentFrame();
  const B = (seed: number) => blinking(f, seed);

  // HUD
  const metaSwap = sec(40.9);
  const hud = {dia: 5, guardado: 85, despejo: 26, meta: f >= metaSwap ? 66 : 60, metaAlert: f >= metaSwap,
    despejoAlert: f >= t(18) && f < t(24), guardadoShakeAt: t(84), hideMeta: f >= t(88) && f < metaSwap};

  // cenas (frames)
  const S1 = 0, S2 = sec(5.0), S3 = sec(12.0), S4 = sec(19.2), S5 = sec(21.0), S6 = sec(25.4), S7 = sec(27.1), S8 = sec(34.4),
    S9 = sec(37.1), S10 = sec(41.45), S11 = sec(47.2), S12 = sec(51.85), S13 = EP05_DURATION;

  return (
    <AbsoluteFill style={{background: C.ink, fontFamily: FONT}}>
      <Audio src={staticFile('ep05/mix.wav')} />

      {/* 1 — mãe no trabalho, telefone tocando 7:40 */}
      <Scene from={S1} to={S2}>
        <WorkKitchen />
        <At x={260 + Math.sin(f * 2.2) * (f > t(4) && f < t(13) ? 4 : 0)} y={560}>
          <Mae width={560} expr={f > t(9) ? 'surprised' : 'neutral'} holdPhone blink={B(1)} look={[0.7, -0.3]} />
        </At>
        <TableFrontWork />
        <ClockPill text="7:40" x={620} y={1430} at={t(2)} />
        {f > t(4) && <div style={{position: 'absolute', left: 860, top: 700, fontSize: 70, color: C.red, ...strokeText(10), fontWeight: 700, opacity: Math.floor(f / 4) % 2}}>)))</div>}
      </Scene>

      {/* 2 — recap: aviso de despejo */}
      <Scene from={S2} to={S3}>
        <EvictionDoor stampAt={t(22)} />
        <At x={640} y={1180}><Rafa width={460} expr="worried" blink={B(2)} look={[-0.6, -0.4]} /></At>
      </Scene>

      {/* 3 — cozinha à noite: contou tudo + polaroids */}
      <Scene from={S3} to={S4} zoom={0.03}>
        <KitchenNight />
        <At x={40} y={830 + bob(f, 1, 4)}><Mae width={460} expr="serious" blink={B(3)} look={[0.6, 0]} /></At>
        <At x={580} y={850 + bob(f, 2, 5)}><Rafa width={440} expr={f < t(34) ? 'worried' : 'neutral'} blink={B(4)} look={[-0.6, 0]} /></At>
        <TableFront />
        {[[37, 'FARMÁCIA', '#2DA44E', '+', 60, -8], [39, 'OFICINA', '#E0772E', '⚙', 390, 5], [41, 'VER-O-PESO', '#3E6FB0', '⛵', 720, -4]].map(([i, l, c, ic, x, r]: any) => {
          const s = pop(f, t(i), 12);
          return f >= t(i) ? <At key={l} x={x - 20} y={1240 - (1 - s) * 500} r={r}><Polaroid label={l} color={c} icon={ic} /></At> : null;
        })}
      </Scene>

      {/* 4 — close: a mãe ficou calada */}
      <Scene from={S4} to={S5} zoom={0.08}>
        <KitchenNight table={false} dim={0.1} />
        <At x={40} y={560}><Mae width={1000} expr="serious" blink={B(5)} /></At>
      </Scene>

      {/* 5 — a página do caderno do dia 1 */}
      <Scene from={S5} to={S6}>
        <PaperUnfold at={t(53)}>
          <NotebookPage>
            <div style={{fontSize: 96, transform: `scale(${f >= t(61) ? 1 + 0.08 * Math.sin((f - t(61)) / 3) * (f < t(62) + 12 ? 1 : 0) : 1})`, color: f >= t(61) ? '#C0392B' : '#2A3A8C', transformOrigin: 'left'}}>DIA 1</div>
            <div style={{fontSize: 120, lineHeight: 1.15}}>1.800 ÷ 30</div>
            <div style={{fontSize: 110, lineHeight: 1.1, textDecoration: 'underline', whiteSpace: 'nowrap'}}>= R$ 60 / dia</div>
          </NotebookPage>
        </PaperUnfold>
      </Scene>

      {/* 6 — "Tu achou que eu não tinha visto?" */}
      <Scene from={S6} to={S7} zoom={0.05}>
        <KitchenNight table={false} />
        <At x={-160} y={700}><Mae width={780} expr="serious" blink={B(6)} look={[0.6, 0]} /></At>
        <At x={480} y={780}><Rafa width={760} expr="surprised" blink={false} look={[-0.7, 0]} /></At>
        <Balloon text={<>TU ACHOU QUE EU<br />NÃO TINHA VISTO?</>} at={t(63)} x={70} y={450} w={720} tail="left" size={62} />
      </Scene>

      {/* 7 — a conta da mãe embaixo */}
      <Scene from={S7} to={S8} zoom={0.03}>
        <NotebookPage rot={-1}>
          <div style={{fontSize: 64, opacity: 0.85, whiteSpace: 'nowrap'}}>1.800 ÷ 30 = R$ 60 / dia</div>
          <div style={{height: 60}} />
          <div style={{fontFamily: HAND, color: '#4B4B52', transform: 'rotate(-1.5deg)'}}>
            <Write at={t(75)}><div style={{fontSize: 110}}>Dia 5.</div></Write>
            <Write at={t(77)} dur={22}><div style={{fontSize: 104, whiteSpace: 'nowrap'}}>Devia ter <span style={{color: C.greenDark}}>R$ 300</span></div></Write>
            <Write at={t(81)} dur={18}><div style={{fontSize: 110, display: 'inline-block', position: 'relative', whiteSpace: 'nowrap'}}>Tem <span style={{color: '#C0392B'}}>R$ 85</span>
              {f >= t(83) + 8 && <svg style={{position: 'absolute', left: 150, top: -10, overflow: 'visible'}} width={300} height={170}><ellipse cx={150} cy={85} rx={170} ry={78} fill="none" stroke="#C0392B" strokeWidth={8} strokeDasharray={1100} strokeDashoffset={1100 * (1 - ramp(f, t(83) + 8, t(83) + 20))} /></svg>}
            </div></Write>
          </div>
        </NotebookPage>
      </Scene>

      {/* 8 — R$ 215 DE ATRASO */}
      <Scene from={S8} to={S9} zoom={0.06}>
        <Sunburst color="#C8323A" ray="#D9454C" spin={0.3} />
        <div style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center', fontWeight: 700}}>
          <div style={{fontSize: 300, color: '#fff', ...strokeText(26), transform: `scale(${pop(f, t(84), 9)})`}}>R$ 215</div>
          <div style={{fontSize: 150, color: C.yellow, ...strokeText(22), transform: `scale(${pop(f, t(86), 11)})`}}>DE ATRASO</div>
        </div>
        <At x={90} y={1120 + (1 - pop(f, S8, 12)) * 400}><Rafa width={900} expr="surprised" blink={false} look={[0, -0.8]} /></At>
      </Scene>

      {/* 9 — a meta muda: 60 → 66 */}
      <Scene from={S9} to={S10} zoom={0.02}>
        <KitchenNight dim={0.35} />
        <At x={40} y={830}><Mae width={460} expr="serious" blink={B(15)} look={[0.6, 0]} /></At>
        <At x={580} y={850}><Rafa width={440} expr="sad" blink={B(16)} look={[0, -0.6]} /></At>
        <TableFront />
        <AbsoluteFill style={{background: 'rgba(10,8,30,0.35)'}} />
        <MetaSwap at={t(90)} struckAt={t(90)} newAt={t(91)} backAt={sec(40.3)} />
      </Scene>

      {/* 10 — a regra da mãe */}
      <Scene from={S10} to={S11} zoom={0.04}>
        <KitchenNight />
        <At x={40} y={830 + bob(f, 1, 4)}><Mae width={460} expr={f >= t(109) ? 'serious' : 'neutral'} blink={B(7)} look={[0.6, 0]} /></At>
        <At x={580} y={850 + bob(f, 2, 5)}><Rafa width={440} expr={f >= t(109) ? 'worried' : 'neutral'} blink={B(8)} look={[-0.6, 0]} /></At>
        <TableFront />
        <ClosingNotebook at={sec(41.5)} />
        {f < t(100) && <Balloon text="TU PODE TRABALHAR." at={t(97)} x={40} y={460} w={640} tail="left" />}
        {f >= t(100) && f < t(109) && <Balloon text={<>MAS ÀS <span style={{color: C.redPill}}>7 EM PONTO</span>,<br />TU TÁ NA ESCOLA.</>} at={t(100)} x={40} y={450} w={700} tail="left" />}
        {f >= t(109) && <Balloon text={<>ATRASOU DE NOVO...<br /><span style={{color: f >= t(112) ? C.redPill : 'transparent', fontSize: 90}}>ACABOU.</span></>} at={t(109)} x={40} y={450} w={700} tail="left" />}
      </Scene>

      {/* 11 — 2 horas, 10 entregas, sozinho não dá */}
      <Scene from={S11} to={S12} zoom={0.03}>
        <Sunburst color="#2E7D87" ray="#3A8F99" spin={0.25} />
        <ClockPill text={clock(f, t(113), t(116) + 10)} x={300} y={590} size={110} at={S11} red={f >= t(116) + 10} />
        <div style={{position: 'absolute', top: 840, left: 90, width: 900, display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'center'}}>
          {Array.from({length: 10}, (_, i) => (
            <div key={i} style={{transform: `scale(${pop(f, t(117) + i * 2, 12)})`}}><DeliveryIcon gray={f >= t(120) && i >= 5} /></div>
          ))}
        </div>
        {f >= t(118) + 6 && <div style={{position: 'absolute', top: 1250, left: 0, right: 0, textAlign: 'center', fontSize: 64, fontWeight: 700, color: C.red, ...strokeText(12), transform: `scale(${pop(f, t(118) + 6)})`}}>1 A CADA 12 MIN</div>}
        <At x={90} y={1250}><Rafa width={900} expr={f >= t(119) ? 'sad' : 'worried'} blink={B(9)} look={[0, -0.7]} /></At>
      </Scene>

      {/* 12 — 3 meninos com bicicleta, sem trabalho */}
      <Scene from={S12} to={S13} zoom={0.04}>
        <StreetMorning />
        {[[Kaua, 400, 'sad', 0], [Duda, 620, 'neutral', 1], [Biel, 840, 'sad', 2]].map(([P, x, e, i]: any) => {
          const s = pop(f, t(128) + i * 4, 12);
          return f >= t(128) + i * 4 ? (
            <At key={i} x={x} y={1040 + i * 30 + (1 - s) * 60} o={s}>
              <div style={{position: 'relative'}}>
                <Bike width={260} style={{position: 'absolute', left: -50, top: 300}} />
                <P width={210} expr={e} blink={B(10 + i)} look={[-0.4, 0]} />
              </div>
            </At>
          ) : null;
        })}
        <At x={10} y={900 + bob(f, 3, 5)}><Rafa width={400} expr={f >= t(133) ? 'determined' : 'neutral'} blink={B(14)} look={[0.8, 0]} /></At>
        {f >= t(133) && <div style={{position: 'absolute', left: 160, top: 760, fontSize: 170, fontWeight: 700, color: C.yellow, ...strokeText(16), transform: `scale(${pop(f, t(133), 8)})`}}>!</div>}
      </Scene>

      {/* 13 — enquete */}
      {f >= t(136) && (
        <>
          <AbsoluteFill style={{display: f >= S12 ? 'flex' : 'none', transform: `scale(${1.04 + 0.05 * ramp(f, t(136), S13)})`}}>
            <StreetMorning />
            <At x={10} y={900}><Rafa width={400} expr="determined" blink={B(14)} look={[0.8, 0]} /></At>
          </AbsoluteFill>
          <Poll parte={6} a="CHAMAR OS 3 MENINOS" b="FAZER TUDO SOZINHO" at={t(136)} aAt={t(142)} bAt={t(147)} voteAt={t(150)} />
        </>
      )}

      {/* overlays globais */}
      {f >= S2 && f < t(136) && <Hud s={hud} enterAt={S2} />}
      <Captions />
      <TitleCard parte={5} big="R$ 215" bigColor={C.red} l2="DE ATRASO" l3="E ELE NEM SABIA" l3Color={C.yellow} out={sec(4.6)} />
    </AbsoluteFill>
  );
};

// ---------- peças específicas ----------
const TableFrontWork: React.FC = () => null;

const clock = (f: number, a: number, b: number) => {
  const m = Math.round(ramp(f, a, b, 0, 120));
  return `${5 + Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
};

const PaperUnfold: React.FC<{at: number; children: React.ReactNode}> = ({at, children}) => {
  const f = useCurrentFrame();
  const y = interpolate(pop(f, sec(21.0), 14), [0, 1], [900, 0]);
  const unfold = interpolate(f, [at, at + 10], [0.15, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{transform: `translateY(${y}px) scaleY(${unfold})`, transformOrigin: 'center 60%'}}>{children}</AbsoluteFill>;
};

const MetaSwap: React.FC<{at: number; struckAt: number; newAt: number; backAt: number}> = ({struckAt, newAt, backAt}) => {
  const f = useCurrentFrame();
  const back = ramp(f, backAt, backAt + 14);
  const y = interpolate(back, [0, 1], [780, 324]);
  const s = interpolate(back, [0, 1], [1.9, 1]) * pop(f, sec(37.1), 12);
  const strike = ramp(f, struckAt, struckAt + 8);
  return (
    <div style={{position: 'absolute', left: 304, top: y, transform: `scale(${s})`, transformOrigin: 'center center'}}>
      <MetaPill alert={f >= newAt} meta={<>
        META: R${' '}
        <span style={{position: 'relative', display: 'inline-block', color: undefined}}>
          {f >= newAt ? '66' : '60'}
          {f < newAt && <span style={{position: 'absolute', left: -4, top: '50%', height: 6, width: `${strike * 120}%`, background: C.red}} />}
        </span>
        /DIA
      </>} />
    </div>
  );
};

const ClosingNotebook: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const c = ramp(f, at, at + 10);
  return (
    <div style={{position: 'absolute', left: 340, top: 1320, width: 400, height: 90, perspective: 600}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 400, height: 90, background: '#FBFBF6', border: `6px solid ${C.ink}`, borderRadius: 6}} />
      <div style={{position: 'absolute', left: 200, top: 0, width: 200, height: 90, background: '#D9343C', border: `6px solid ${C.ink}`, borderRadius: 6, transformOrigin: 'left center', transform: `rotateY(${-180 * (1 - c)}deg)`}} />
    </div>
  );
};
