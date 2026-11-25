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
export const EP05_DURATION = Math.round((align.duration + 3) * FPS);

// ---------- legendas: [palavra inicial, final, texto opcional, cores por palavra] ----------
const Y = C.yellow, R = C.red, G = C.green;
type Chunk = [number, number, string?, Record<number, string>?];
const CHUNKS: Chunk[] = [
  [0, 2, undefined, {0: Y, 1: Y, 2: Y}], [3, 4], [5, 6, undefined, {1: Y}], [7, 9, undefined, {1: Y}],
  [10, 11, undefined, {0: Y, 1: Y}], [12, 13, undefined, {1: Y}], [14, 16], [17, 18, undefined, {1: Y}],
  [19, 20], [21, 22, undefined, {1: R}], [23, 24, undefined, {0: R, 1: R}],
  [25, 26], [27, 28], [29, 31, undefined, {1: Y}], [32, 33, undefined, {0: R, 1: R}], [34, 35], [36, 37, undefined, {0: Y, 1: Y}],
  [38, 40], [41, 43, undefined, {2: R}],
  [44, 45], [46, 48, undefined, {2: Y}], [49, 50, undefined, {1: Y}], [51, 52, undefined, {1: Y}], [53, 54, undefined, {1: Y}], [55, 56],
  [57, 59, undefined, {2: R}], [60, 61, undefined, {1: R}], [62, 63], [64, 65], [66, 67], [68, 70, undefined, {1: Y, 2: Y}],
  [71, 72], [73, 75], [76, 78, undefined, {1: Y, 2: Y}],
  [95, 95], [96, 97], [98, 99, undefined, {1: Y}],
  [113, 114], [115, 115, undefined, {0: G}], [116, 116], [117, 119, undefined, {0: R}],
  [126, 128, 'SEM FALHAR NENHUM.', {0: R, 1: R, 2: R}],
  [145, 148], [149, 150, '10 ENTREGAS.', {0: Y, 1: Y}], [151, 151], [152, 153, undefined, {0: R, 1: R}],
  [154, 156], [157, 158], [159, 160, '3 MENINOS', {0: Y, 1: Y}], [161, 162], [163, 164], [165, 166, undefined, {1: R}],
];

// cenas (segundos)
const T = {S1: 0, VOTE: 3.7, S2: 9.6, S3: 17.2, S4: 23.8, S5: 28.9, S6: 32.3, S7: 37.1, S8: 43.9, S8b: 46.9, S9: 50.6, S10: 55.1, S11: 60.7, S12: 64.7};
// posição vertical da legenda por trecho (s)
const capY = (s: number) =>
  s < T.VOTE ? 1560 : s < T.S2 ? 1700 : s < T.S3 ? 1720 : s < T.S4 ? 560 : s < T.S5 ? 1690 : s < T.S6 ? 1740 : s < T.S8b ? 560 : s < T.S9 ? 1620 : s < T.S10 ? 1560 : s < T.S11 ? 560 : s < T.S12 ? 440 : 450;

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
  const F = (k: keyof typeof T) => sec(T[k]);

  // HUD
  const metaBack = sec(54.2), metaSwap = metaBack + 14;
  const hud = {dia: 5, guardado: 85, despejo: 26, meta: f >= metaSwap ? 66 : 60, metaAlert: f >= metaSwap,
    despejoAlert: f >= t(32) && f < t(38), guardadoShakeAt: t(109), hideMeta: f >= F('S9') && f < metaSwap};
  const END = EP05_DURATION;

  return (
    <AbsoluteFill style={{background: C.ink, fontFamily: FONT}}>
      <Audio src={staticFile('ep05/mix.wav')} />

      {/* 1 — mãe no trabalho, telefone tocando 7:40 */}
      <Scene from={F('S1')} to={F('VOTE')}>
        <WorkKitchen />
        <At x={260 + Math.sin(f * 2.2) * (f > t(4) ? 4 : 0)} y={560}>
          <Mae width={560} expr={f > t(8) ? 'surprised' : 'neutral'} holdPhone blink={B(1)} look={[0.7, -0.3]} />
        </At>
        <ClockPill text="7:40" x={620} y={1430} at={t(2)} />
        {f > t(4) && <div style={{position: 'absolute', left: 860, top: 700, fontSize: 70, color: C.red, ...strokeText(10), fontWeight: 700, opacity: Math.floor(f / 4) % 2}}>)))</div>}
      </Scene>

      {/* 1b — o voto: "Vocês escolheram... só que a escola contou primeiro" */}
      <Scene from={F('VOTE')} to={F('S2')} zoom={0.03}>
        <VoteRecap />
      </Scene>

      {/* 2 — recap: aviso de despejo */}
      <Scene from={F('S2')} to={F('S3')}>
        <EvictionDoor stampAt={t(36)} />
        <At x={640} y={1180}><Rafa width={460} expr="worried" blink={B(2)} look={[-0.6, -0.4]} /></At>
      </Scene>

      {/* 3 — cozinha à noite: contou tudo + polaroids */}
      <Scene from={F('S3')} to={F('S4')} zoom={0.03}>
        <KitchenNight />
        <At x={40} y={830 + bob(f, 1, 4)}><Mae width={460} expr="serious" blink={B(3)} look={[0.6, 0]} /></At>
        <At x={580} y={850 + bob(f, 2, 5)}><Rafa width={440} expr={f < t(47) ? 'worried' : 'neutral'} blink={B(4)} look={[-0.6, 0]} /></At>
        <TableFront />
        {[[50, 'FARMÁCIA', '#2DA44E', '+', 60, -8], [52, 'OFICINA', '#E0772E', '⚙', 390, 5], [54, 'VER-O-PESO', '#3E6FB0', '⛵', 720, -4]].map(([i, l, c, ic, x, r]: any) => {
          const s = pop(f, t(i), 12);
          return f >= t(i) ? <At key={l} x={x - 20} y={1240 - (1 - s) * 500} r={r}><Polaroid label={l} color={c} icon={ic} /></At> : null;
        })}
      </Scene>

      {/* 4 — close: ela não gritou, não chorou... abriu a bolsa */}
      <Scene from={F('S4')} to={F('S5')} zoom={0.1}>
        <KitchenNight table={false} dim={0.1} />
        <At x={40} y={560}><Mae width={1000} expr="serious" blink={B(5)} look={f >= t(62) ? [0.2, 0.9] : [0, 0]} /></At>
      </Scene>

      {/* 5 — a página do caderno do dia 1 */}
      <Scene from={F('S5')} to={F('S6')}>
        <PaperUnfold enter={F('S5')} at={t(72)}>
          <NotebookPage>
            <div style={{fontSize: 96, transform: `scale(${f >= t(77) && f < t(78) + 12 ? 1 + 0.08 * Math.sin((f - t(77)) / 3) : 1})`, color: f >= t(77) ? '#C0392B' : '#2A3A8C', transformOrigin: 'left'}}>DIA 1</div>
            <div style={{fontSize: 120, lineHeight: 1.15}}>1.800 ÷ 30</div>
            <div style={{fontSize: 110, lineHeight: 1.1, textDecoration: 'underline', whiteSpace: 'nowrap'}}>= R$ 60 / dia</div>
          </NotebookPage>
        </PaperUnfold>
      </Scene>

      {/* 6 — "Tu achou que eu não tinha visto, Rafael?" / "Eu vi. E fiz a conta todo dia." */}
      <Scene from={F('S6')} to={F('S7')} zoom={0.06}>
        <KitchenNight table={false} />
        <At x={-160} y={700}><Mae width={780} expr="serious" blink={B(6)} look={[0.6, 0]} /></At>
        <At x={480} y={780}><Rafa width={760} expr={f >= t(87) ? 'sad' : 'surprised'} blink={f >= t(87) && B(6)} look={[-0.7, 0]} /></At>
        {f < t(87) && <Balloon text={<>TU ACHOU QUE EU NÃO<br />TINHA VISTO, RAFAEL?</>} at={t(79)} x={70} y={450} w={760} tail="left" size={60} />}
        {f >= t(87) && <Balloon text={<>EU VI. E FIZ A CONTA<br /><span style={{color: C.redPill}}>TODO DIA.</span></>} at={t(87)} x={70} y={450} w={760} tail="left" size={60} />}
      </Scene>

      {/* 7 — a conta da mãe embaixo */}
      <Scene from={F('S7')} to={F('S8')} zoom={0.03}>
        <NotebookPage rot={-1}>
          <div style={{fontSize: 64, opacity: 0.85, whiteSpace: 'nowrap'}}>1.800 ÷ 30 = R$ 60 / dia</div>
          <div style={{height: 60}} />
          <div style={{fontFamily: HAND, color: '#4B4B52', transform: 'rotate(-1.5deg)'}}>
            <Write at={t(100)}><div style={{fontSize: 110}}>Dia 5.</div></Write>
            <Write at={t(102)} dur={22}><div style={{fontSize: 104, whiteSpace: 'nowrap'}}>Devia ter <span style={{color: C.greenDark}}>R$ 300</span></div></Write>
            <Write at={t(106)} dur={18}><div style={{fontSize: 110, display: 'inline-block', position: 'relative', whiteSpace: 'nowrap'}}>Tem <span style={{color: '#C0392B'}}>R$ 85</span>
              {f >= t(108) + 8 && <svg style={{position: 'absolute', left: 150, top: -10, overflow: 'visible'}} width={300} height={170}><ellipse cx={150} cy={85} rx={170} ry={78} fill="none" stroke="#C0392B" strokeWidth={8} strokeDasharray={1100} strokeDashoffset={1100 * (1 - ramp(f, t(108) + 8, t(108) + 20))} /></svg>}
            </div></Write>
          </div>
        </NotebookPage>
      </Scene>

      {/* 8 — R$ 215 DE ATRASO */}
      <Scene from={F('S8')} to={F('S8b')} zoom={0.06}>
        <Sunburst color="#C8323A" ray="#D9454C" spin={0.3} />
        <div style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center', fontWeight: 700}}>
          <div style={{fontSize: 300, color: '#fff', ...strokeText(26), transform: `scale(${pop(f, t(109), 9)})`}}>R$ 215</div>
          <div style={{fontSize: 150, color: C.yellow, ...strokeText(22), transform: `scale(${pop(f, t(111), 11)})`}}>DE ATRASO</div>
        </div>
        <At x={90} y={1120 + (1 - pop(f, F('S8'), 12)) * 400}><Rafa width={900} expr="surprised" blink={false} look={[0, -0.8]} /></At>
      </Scene>

      {/* 8b — comemorando... enquanto perdia a corrida (a tela verde do EP04 racha) */}
      <Scene from={F('S8b')} to={F('S9')} zoom={0.05}>
        <CelebrationCrack crackAt={t(116)} />
      </Scene>

      {/* 9 — a meta muda: 60 → 66 */}
      <Scene from={F('S9')} to={F('S10')} zoom={0.02}>
        <KitchenNight dim={0.35} />
        <At x={40} y={830}><Mae width={460} expr="serious" blink={B(15)} look={[0.6, 0]} /></At>
        <At x={580} y={850}><Rafa width={440} expr="sad" blink={B(16)} look={[0, -0.6]} /></At>
        <TableFront />
        <AbsoluteFill style={{background: 'rgba(10,8,30,0.35)'}} />
        <MetaSwap enter={F('S9')} struckAt={t(122)} newAt={t(123)} backAt={metaBack} />
      </Scene>

      {/* 10 — a regra da mãe */}
      <Scene from={F('S10')} to={F('S11')} zoom={0.04}>
        <KitchenNight />
        <At x={40} y={830 + bob(f, 1, 4)}><Mae width={460} expr={f >= t(141) ? 'serious' : 'neutral'} blink={B(7)} look={[0.6, 0]} /></At>
        <At x={580} y={850 + bob(f, 2, 5)}><Rafa width={440} expr={f >= t(141) ? 'worried' : 'neutral'} blink={B(8)} look={[-0.6, 0]} /></At>
        <TableFront />
        <ClosingNotebook at={F('S10') + 3} />
        {f < t(132) && <Balloon text="TU PODE TRABALHAR." at={t(129)} x={40} y={460} w={640} tail="left" />}
        {f >= t(132) && f < t(141) && <Balloon text={<>MAS ÀS <span style={{color: C.redPill}}>7 EM PONTO</span>,<br />TU TÁ NA ESCOLA.</>} at={t(132)} x={40} y={450} w={700} tail="left" />}
        {f >= t(141) && <Balloon text={<>ATRASOU DE NOVO...<br /><span style={{color: f >= t(144) ? C.redPill : 'transparent', fontSize: 90}}>ACABOU.</span></>} at={t(141)} x={40} y={450} w={700} tail="left" />}
      </Scene>

      {/* 11 — 2 horas, 10 entregas, sozinho não dá */}
      <Scene from={F('S11')} to={F('S12')} zoom={0.03}>
        <Sunburst color="#2E7D87" ray="#3A8F99" spin={0.25} />
        <ClockPill text={clock(f, t(145), t(148) + 10)} x={300} y={590} size={110} at={F('S11')} red={f >= t(148) + 10} />
        <div style={{position: 'absolute', top: 840, left: 90, width: 900, display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'center'}}>
          {Array.from({length: 10}, (_, i) => (
            <div key={i} style={{transform: `scale(${pop(f, t(149) + i * 2, 12)})`}}><DeliveryIcon gray={f >= t(151) && i >= 5} /></div>
          ))}
        </div>
        {f >= t(150) + 6 && <div style={{position: 'absolute', top: 1250, left: 0, right: 0, textAlign: 'center', fontSize: 64, fontWeight: 700, color: C.red, ...strokeText(12), transform: `scale(${pop(f, t(150) + 6)})`}}>1 A CADA 12 MIN</div>}
        <At x={90} y={1250}><Rafa width={900} expr={f >= t(151) ? 'sad' : 'worried'} blink={B(9)} look={[0, -0.7]} /></At>
      </Scene>

      {/* 12 — 3 meninos com bicicleta, sem trabalho */}
      <Scene from={F('S12')} to={END} zoom={0.04}>
        <StreetMorning />
        {[[Kaua, 400, 'sad', 0], [Duda, 620, 'neutral', 1], [Biel, 840, 'sad', 2]].map(([P, x, e, i]: any) => {
          const s = pop(f, t(159) + i * 4, 12);
          return f >= t(159) + i * 4 ? (
            <At key={i} x={x} y={1040 + i * 30 + (1 - s) * 60} o={s}>
              <div style={{position: 'relative'}}>
                <Bike width={260} style={{position: 'absolute', left: -50, top: 300}} />
                <P width={210} expr={e} blink={B(10 + i)} look={[-0.4, 0]} />
              </div>
            </At>
          ) : null;
        })}
        <At x={10} y={900 + bob(f, 3, 5)}><Rafa width={400} expr={f >= t(164) ? 'determined' : 'neutral'} blink={B(14)} look={[0.8, 0]} /></At>
        {f >= t(164) && <div style={{position: 'absolute', left: 160, top: 760, fontSize: 170, fontWeight: 700, color: C.yellow, ...strokeText(16), transform: `scale(${pop(f, t(164), 8)})`}}>!</div>}
      </Scene>

      {/* 13 — enquete */}
      {f >= t(167) && <Poll parte={6} a="SOZINHO, COM MUITO ESFORÇO" b="COM OS MENINOS, DIVIDINDO O LUCRO" at={t(167)} aAt={t(173)} bAt={t(179)} voteAt={t(186)} />}

      {/* overlays globais */}
      {f >= F('S2') && f < t(167) && <Hud s={hud} enterAt={F('S2')} />}
      <Captions />
      <TitleCard parte={5} big="R$ 215" bigColor={C.red} l2="DE ATRASO" l3="E ELE NEM SABIA" l3Color={C.yellow} out={sec(3.6)} />
    </AbsoluteFill>
  );
};

// ---------- peças específicas ----------

const clock = (f: number, a: number, b: number) => {
  const m = Math.round(ramp(f, a, b, 0, 120));
  return `${5 + Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
};

const PaperUnfold: React.FC<{enter: number; at: number; children: React.ReactNode}> = ({enter, at, children}) => {
  const f = useCurrentFrame();
  const y = interpolate(pop(f, enter, 14), [0, 1], [900, 0]);
  const unfold = interpolate(f, [at, at + 10], [0.15, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{transform: `translateY(${y}px) scaleY(${unfold})`, transformOrigin: 'center 60%'}}>{children}</AbsoluteFill>;
};

const MetaSwap: React.FC<{enter: number; struckAt: number; newAt: number; backAt: number}> = ({enter, struckAt, newAt, backAt}) => {
  const f = useCurrentFrame();
  const back = ramp(f, backAt, backAt + 14);
  const y = interpolate(back, [0, 1], [780, 324]);
  const s = interpolate(back, [0, 1], [1.9, 1]) * pop(f, enter, 12);
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

/** "Vocês escolheram: A — contar tudo pra mãe" → "Só que a escola contou primeiro" */
const VoteRecap: React.FC = () => {
  const f = useCurrentFrame();
  const sq = t(19); // "Só que"
  const gray = ramp(f, t(23), t(23) + 8);
  const shk = f >= sq && f < sq + 12 ? Math.sin((f - sq) * 2.4) * 14 * (1 - (f - sq) / 12) : 0;
  const ph = pop(f, t(21), 11);
  return (
    <AbsoluteFill>
      <Sunburst color="#4B3A8C" ray="#56459A" spin={0.2} />
      <div style={{position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${pop(f, t(10), 12)})`}}>
        <div style={{background: C.redPill, color: '#fff', border: `7px solid ${C.ink}`, borderRadius: 50, padding: '6px 44px', fontSize: 76, fontWeight: 700}}>VOCÊS ESCOLHERAM</div>
      </div>
      <div style={{position: 'absolute', top: 600, left: 100, filter: `grayscale(${gray}) brightness(${1 - gray * 0.25})`, transform: `translateX(${shk + (1 - pop(f, t(12), 12)) * 1100}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 30, background: C.cream, border: `8px solid ${C.ink}`, borderRadius: 34, padding: '26px 40px', width: 880, boxSizing: 'border-box', fontWeight: 700}}>
          <div style={{width: 120, height: 120, flex: 'none', borderRadius: 60, background: C.orange, border: `7px solid ${C.ink}`, color: '#fff', fontSize: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', ...strokeText(10)}}>A</div>
          <div style={{fontSize: 72, lineHeight: 1.05, color: C.ink, textAlign: 'center', flex: 1}}>CONTAR TUDO<br />PRA MÃE</div>
        </div>
        {f >= t(16) && <div style={{position: 'absolute', right: -30, top: -50, width: 130, height: 130, borderRadius: 65, background: '#2DA44E', border: `8px solid ${C.ink}`, color: '#fff', fontSize: 90, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(f, t(16), 8)})`}}>✓</div>}
      </div>
      {f >= t(21) && (
        <div style={{position: 'absolute', left: 300, top: 960 + (1 - ph) * 900, transform: `rotate(${-6 + Math.sin(f * 2.3) * 2.5}deg)`}}>
          <div style={{width: 480, height: 600, background: '#2B2A33', border: `9px solid ${C.ink}`, borderRadius: 60, padding: 26, boxSizing: 'border-box'}}>
            <div style={{width: '100%', height: '100%', background: '#7CE0B8', borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: C.ink, textAlign: 'center'}}>
              <div style={{fontSize: 40, opacity: 0.7}}>CHAMANDO...</div>
              <div style={{fontSize: 74, lineHeight: 1.05, marginTop: 10}}>ESCOLA<br />ESTADUAL</div>
              <div style={{display: 'flex', gap: 60, marginTop: 50}}>
                <div style={{width: 90, height: 90, borderRadius: 45, background: '#E5484D', border: `6px solid ${C.ink}`}} />
                <div style={{width: 90, height: 90, borderRadius: 45, background: '#2DA44E', border: `6px solid ${C.ink}`}} />
              </div>
            </div>
          </div>
          <div style={{position: 'absolute', right: -90, top: 120, fontSize: 90, color: C.red, fontWeight: 700, ...strokeText(10), opacity: Math.floor(f / 4) % 2}}>)))</div>
          <div style={{position: 'absolute', left: -90, top: 260, fontSize: 90, color: C.red, fontWeight: 700, ...strokeText(10), opacity: Math.floor(f / 4) % 2, transform: 'scaleX(-1)'}}>)))</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** tela verde do EP04 ("R$ 85 · 2x") que racha e perde a cor em "enquanto perdia a corrida" */
const CelebrationCrack: React.FC<{crackAt: number}> = ({crackAt}) => {
  const f = useCurrentFrame();
  const c = ramp(f, crackAt, crackAt + 6);
  const g = ramp(f, crackAt + 4, crackAt + 20);
  return (
    <AbsoluteFill style={{filter: `grayscale(${g})`}}>
      <Sunburst color="#1F8A4C" ray="#26A05A" spin={0.3} />
      <div style={{position: 'absolute', top: 480, left: 0, right: 0, textAlign: 'center', fontWeight: 700}}>
        <span style={{fontSize: 300, color: C.green, ...strokeText(24), position: 'relative', display: 'inline-block', transform: `scale(${pop(f, sec(46.9), 10)})`}}>
          R$ 85
          <span style={{position: 'absolute', right: -120, top: -30, width: 150, height: 150, borderRadius: 75, background: C.yellow, border: `8px solid ${C.ink}`, color: C.ink, fontSize: 80, lineHeight: '134px', WebkitTextStroke: '0px', transform: `rotate(12deg) scale(${pop(f, sec(47.4), 8)})`}}>2x</span>
        </span>
      </div>
      {c > 0 && (
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          <path d="M120,560 L330,700 L290,780 L520,860 L470,950 L720,1010 L690,1090 L980,1150" fill="none" stroke="#fff" strokeWidth={14} strokeDasharray={1800} strokeDashoffset={1800 * (1 - c)} strokeLinejoin="round" />
          <path d="M520,860 L600,700 L700,640 M720,1010 L820,900" fill="none" stroke="#fff" strokeWidth={9} strokeDasharray={600} strokeDashoffset={600 * (1 - c)} />
          <path d="M120,560 L330,700 L290,780 L520,860 L470,950 L720,1010 L690,1090 L980,1150" fill="none" stroke={C.ink} strokeWidth={4} strokeDasharray={1800} strokeDashoffset={1800 * (1 - c)} />
        </svg>
      )}
      <At x={90} y={1180}><Rafa width={900} expr={f >= crackAt ? 'sad' : 'happy'} blink={f >= crackAt + 30 && blinking(f, 3)} look={[0, -0.8]} /></At>
    </AbsoluteFill>
  );
};
