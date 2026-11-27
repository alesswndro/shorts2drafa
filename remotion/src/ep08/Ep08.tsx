import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import align from './align.json';
import {C, FONT, HAND, FPS, strokeText} from '../theme';
import {bob, blinking, pop, ramp, sec, shake} from '../components/anim';
import {Rafa, Mae, Kaua, Biel, Duda, Person, SenhoraGeladinho} from '../components/Person';
import {Hud, Balloon, TitleCard, Poll, Sunburst} from '../components/ui';
import {KitchenNight, TableFront, EvictionDoor, NotebookPage, Planks, StreetMorning} from '../components/sets';
import {SchoolGate, PolpaSack, Geladinho} from '../components/sets2';
import {CoolerOpen} from '../components/sets3';
import {Scene, Par, At, Write, makeCaptions, Chunk, Word, Punch, Flash, Sparkles, CoinRain, countUp} from '../components/scene';

const W = align.words as Word[];
const t = (i: number) => sec(W[i].start);
export const EP08_DURATION = Math.round((align.duration + 3) * FPS);

const Y = C.yellow, R = C.red, G = C.green;
const CHUNKS: Chunk[] = [
  [0, 1, undefined, {0: Y, 1: Y}], [2, 4], [5, 6, undefined, {1: Y}], [7, 8],
  [9, 10], [11, 12, undefined, {1: Y}], [13, 15, undefined, {1: Y}], [16, 17], [18, 19, undefined, {1: G}],
  [20, 21], [22, 23], [24, 26, undefined, {1: Y}], [27, 28, undefined, {0: R, 1: R}], [29, 30], [31, 32, undefined, {0: Y, 1: Y}], [33, 35], [36, 38, undefined, {2: R}],
  [39, 42], [43, 45], [46, 48], [49, 50], [51, 52, undefined, {1: Y}],
  [59, 60], [61, 63, undefined, {2: Y}], [64, 65], [66, 67, undefined, {1: Y}],
  [68, 70, undefined, {1: Y, 2: Y}], [71, 73], [74, 76, undefined, {1: G, 2: G}], [77, 78], [79, 82], [83, 84, undefined, {0: R, 1: R}], [85, 88, undefined, {1: R}],
  [95, 97], [98, 99, undefined, {1: Y}], [100, 101], [102, 103], [104, 105],
  [108, 109], [110, 112, undefined, {2: Y}], [113, 114], [115, 116], [117, 118, undefined, {0: G, 1: G}], [119, 121], [122, 123, undefined, {1: R}],
  [124, 127], [128, 129], [130, 131], [132, 135, undefined, {1: R}],
  [136, 138], [139, 141, undefined, {2: Y}], [142, 144], [145, 146], [147, 148], [149, 149], [150, 153, undefined, {2: Y}], [154, 157],
  [158, 160], [161, 163], [164, 165],
];

const T = {S1: 0, VOTE: 4.5, S3: 9.1, S4: 16.8, S5: 22.0, S6: 27.0, S7: 30.6, S7b: 40.9, S8: 45.9, S9: 50.9, S10: 57.5, S11: 61.7, S12: 69.7, POLL: 77.8};
const capY = (s: number) =>
  s < T.S4 ? 1720 : s < T.S5 ? 470 : s < T.S6 ? 1720 : s < T.S7 ? 470 : s < T.S7b ? 1740 : s < T.S8 ? 1720 : s < T.S9 ? 470 : s < T.S10 ? 1720 : 470;
const Captions = makeCaptions(W, CHUNKS, capY);

const Big: React.FC<{at: number; top: number; size: number; color: string; children: React.ReactNode; stroke?: number}> = ({at, top, size, color, children, stroke = 18}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontWeight: 700, fontSize: size, lineHeight: 1, color, ...strokeText(stroke), transform: `scale(${pop(f, at, 9)})`}}>{children}</div>;
};

/** plaquinha de papelão com preço */
const PriceSign: React.FC<{price: string; color?: string; w?: number; r?: number}> = ({price, color = C.redPill, w = 260, r = 0}) => (
  <div style={{width: w, transform: `rotate(${r}deg)`, background: '#D9B07A', border: `7px solid ${C.ink}`, borderRadius: 10, padding: '10px 0', textAlign: 'center', fontFamily: HAND, fontWeight: 700, fontSize: w * 0.34, color, lineHeight: 1}}>{price}</div>
);

const Kids: React.FC<{x: number; dir?: number; f0: number; B: (n: number) => boolean; happy?: boolean}> = ({x, dir = 1, f0, B, happy = true}) => {
  const f = useCurrentFrame();
  const list: any[] = [Kaua, Duda, Biel, 'p'];
  return (
    <>
      {list.map((P, i) => {
        const run = ramp(f, f0 + i * 3, f0 + i * 3 + 16, 0, 1);
        const xx = x + i * 150 * dir * -1 + run * 0;
        return (
          <At key={i} x={xx} y={1040 + (i % 2) * 24 + Math.abs(Math.sin((f + i * 7) / 4)) * -14 * run}>
            {typeof P === 'string' ? <Person width={200} skin="#9A5C36" hair="puffs" shirt="#F0A04B" expr={happy ? 'happy' : 'neutral'} blink={B(30 + i)} look={[dir, 0]} /> : <P width={200} expr={happy ? 'happy' : 'neutral'} blink={B(30 + i)} look={[dir, 0]} />}
          </At>
        );
      })}
    </>
  );
};

export const Ep08: React.FC = () => {
  const f = useCurrentFrame();
  const B = (seed: number) => blinking(f, seed);
  const F = (k: keyof typeof T) => sec(T[k]);
  const END = EP08_DURATION;

  // HUD: dia 9 → 10 · 218 → 282 (recorde) → 244 (dia sem venda) · 22 → 21 dias · meta 72 → 73
  const day10 = f >= F('S8');
  const guardado = f < t(128) ? countUp(f, t(56), t(56) + 30, 218, 282) : countUp(f, t(128), t(128) + 30, 282, 244);
  const hud = {dia: day10 ? 10 : 9, guardado, despejo: day10 ? 21 : 22, meta: day10 ? 73 : 72, metaAlert: true, despejoAlert: f >= t(27) && f < t(33), guardadoShakeAt: t(128)};
  const stamp = t(31); // carimbo do R$ 1.800 → gag do "aaah"

  return (
    <AbsoluteFill style={{background: C.ink, fontFamily: FONT}}>
      <Audio src={staticFile('ep08/mix.wav')} />

      {/* 1 — R$ 1,50: a fila inteira troca de lado */}
      <Scene from={F('S1')} to={F('VOTE')} zoom={0.06} pan={[0, -24]}>
        <Par depth={0.5}><SchoolGate open={1} /></Par>
        <At x={20} y={1000}><Rafa width={380} expr="happy" blink={B(1)} look={[0.8, 0]} /></At>
        <At x={50} y={1460}><CoolerOpen w={300} /></At>
        <At x={70} y={860} r={-6}><PriceSign price="R$ 1,50" color={C.greenDark} /></At>
        <At x={700} y={940}><SenhoraGeladinho width={360} expr={f >= t(4) ? 'worried' : 'happy'} blink={B(2)} look={[-0.8, 0]} /></At>
        <At x={760} y={790} r={5}><PriceSign price="R$ 2" w={220} /></At>
        {[0, 1, 2, 3].map((i) => {
          const run = ramp(f, t(4) + i * 3, t(4) + i * 3 + 18, 0, 1);
          const P: any = [Kaua, Duda, Biel, Kaua][i];
          return <At key={i} x={640 - i * 40 - run * 360} y={1150 + (i % 2) * 30 + Math.abs(Math.sin((f + i * 7) / 3.5)) * -16 * run}><P width={190} expr="happy" blink={B(3 + i)} look={[run > 0 ? -1 : 0.6, 0]} /></At>;
        })}
      </Scene>

      {/* 2 — "A maioria escolheu B" */}
      <Scene from={F('VOTE')} to={F('S3')} zoom={0.05} pan={[0, -24]}>
        <Sunburst color="#4B3A8C" ray="#56459A" spin={0.2} />
        <Punch at={[t(12), t(16)]}>
          <div style={{position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${pop(f, t(9), 12)})`}}>
            <div style={{background: C.redPill, color: '#fff', border: `7px solid ${C.ink}`, borderRadius: 50, padding: '6px 44px', fontSize: 76, fontWeight: 700}}>A MAIORIA ESCOLHEU</div>
          </div>
          {f >= t(12) && (
            <div style={{position: 'absolute', top: 600, left: 100, transform: `scale(${pop(f, t(12), 10)})`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 30, background: C.cream, border: `8px solid ${C.ink}`, borderRadius: 34, padding: '26px 40px', width: 880, boxSizing: 'border-box', fontWeight: 700}}>
                <div style={{width: 120, height: 120, flex: 'none', borderRadius: 60, background: C.teal, border: `7px solid ${C.ink}`, color: '#fff', fontSize: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', ...strokeText(10)}}>B</div>
                <div style={{fontSize: 66, lineHeight: 1.05, color: C.ink, textAlign: 'center', flex: 1}}>FICA E VENDE<br />A R$&nbsp;1,50</div>
              </div>
              {f >= t(12) + 6 && <div style={{position: 'absolute', right: -30, top: -50, width: 130, height: 130, borderRadius: 65, background: '#2DA44E', border: `8px solid ${C.ink}`, color: '#fff', fontSize: 90, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(f, t(12) + 6, 8)})`}}>✓</div>}
            </div>
          )}
          <Sparkles at={t(12) + 6} x={900} y={620} n={12} />
          {f >= t(13) && <At x={300} y={1100 + (1 - pop(f, t(13), 12)) * 600}><Rafa width={480} expr="determined" blink={B(5)} look={[0, -0.3]} /></At>}
          {f >= t(16) && <At x={560} y={1060} s={pop(f, t(16), 9)} r={8}><PriceSign price="R$ 1,50" color={C.greenDark} w={300} /></At>}
        </Punch>
      </Scene>

      {/* 3 — recap: despejo + gag do "aaah" depois do carimbo */}
      <Scene from={F('S3')} to={F('S4')} zoom={0.05} pan={[-30, 0]}>
        <Punch at={[stamp + 8]} amt={0.05}>
          <Par depth={0.6}><EvictionDoor stampAt={stamp} /></Par>
          {f < stamp + 8 ? (
            <At x={640} y={1180}><Rafa width={460} expr="worried" blink={B(6)} look={[-0.6, -0.4]} /></At>
          ) : (
            <At x={330 + shake(f, stamp + 8, 30, 8)} y={1060 - pop(f, stamp + 8, 8) * 40}>
              <Rafa width={540} expr={f < stamp + 50 ? 'scream' : 'worried'} armUp={f < stamp + 50 ? 'both' : 'none'} blink={false} look={[-0.2, -0.6]} />
            </At>
          )}
          {f >= stamp + 8 && f < stamp + 46 && (
            <div style={{position: 'absolute', left: 40, top: 1150, fontSize: 130, fontWeight: 700, color: C.yellow, ...strokeText(14), transform: `rotate(-12deg) scale(${pop(f, stamp + 8, 7)})`}}>AAAH!</div>
          )}
        </Punch>
      </Scene>

      {/* 4 — as crianças olham as duas caixas... e correm pra dele */}
      <Scene from={F('S4')} to={F('S5')} zoom={0.06} pan={[30, -10]}>
        <Par depth={0.5}><SchoolGate open={1} /></Par>
        <At x={30} y={1460}><CoolerOpen w={300} /></At>
        <At x={50} y={1300} r={-6}><PriceSign price="R$ 1,50" color={C.greenDark} w={240} /></At>
        <At x={760} y={1460}><CoolerOpen w={280} /></At>
        <At x={790} y={1310} r={6}><PriceSign price="R$ 2" w={200} /></At>
        {[0, 1, 2].map((i) => {
          const P: any = [Kaua, Duda, Biel][i];
          const run = ramp(f, t(49) + i * 3, t(49) + i * 3 + 16, 0, 1);
          const lookX = f < t(46) ? -0.8 : f < t(49) ? 0.8 : -1;
          return <At key={i} x={330 + i * 150 - run * 160} y={1020 + Math.abs(Math.sin((f + i * 9) / 3.5)) * -14 * run}><P width={210} expr={f >= t(49) ? 'happy' : 'neutral'} blink={B(7 + i)} look={[lookX, 0.2]} /></At>;
        })}
        <Sparkles at={t(51)} x={190} y={1340} n={10} />
      </Scene>

      {/* 5 — 20, 40, 60... 80. Recorde. */}
      <Scene from={F('S5')} to={F('S6')} zoom={0.06} pan={[0, -24]}>
        <Punch at={[t(53), t(54), t(55), t(56), t(58)]}>
          <Sunburst color="#1F8A4C" ray="#26A05A" spin={0.35} />
          <div style={{position: 'absolute', top: 520, left: 0, right: 0, textAlign: 'center', fontWeight: 700, fontSize: 320, color: '#fff', ...strokeText(26)}}>
            {f < t(54) ? 20 : f < t(55) ? 40 : f < t(56) ? 60 : 80}
          </div>
          <Big at={t(57)} top={860} size={100} color="#fff">GELADINHOS</Big>
          <Big at={t(58)} top={990} size={130} color={C.yellow}>RECORDE!</Big>
          <Sparkles at={t(58)} x={540} y={1050} n={20} />
          <CoinRain from={t(56)} to={t(58) + 10} n={14} />
          <At x={90} y={1260}><Rafa width={900} expr="happy" blink={B(10)} look={[0, -0.8]} /></At>
        </Punch>
        <Flash at={t(58)} max={0.45} />
      </Scene>

      {/* 6 — voltou pra casa rindo... abriu o caderno */}
      <Scene from={F('S6')} to={F('S7')} zoom={0.06} pan={[40, 0]}>
        <Par depth={0.5}><StreetMorning /></Par>
        <AbsoluteFill style={{background: 'rgba(255,140,60,0.18)'}} />
        <At x={260 + (f - F('S6')) * 1.4} y={1000 + Math.abs(Math.sin(f / 4)) * -18}><Rafa width={440} expr="happy" blink={B(11)} look={[0.8, 0]} /></At>
        {f < t(64) && <div style={{position: 'absolute', left: 700, top: 900, fontSize: 70, fontWeight: 700, color: C.yellow, ...strokeText(10), transform: `rotate(10deg) translateY(${Math.sin(f / 3) * 8}px)`}}>♪</div>}
      </Scene>

      {/* 7 — a conta no caderno: R$ 0,80 por geladinho · 80 × 0,80 = R$ 64 · faltaram 8 */}
      <Scene from={F('S7')} to={F('S7b')} zoom={0.04} pan={[0, -20]}>
        <Planks color="#8E5E36" seam="#6E4526" vertical={false} />
        <AbsoluteFill style={{transform: `translateY(${(1 - pop(f, F('S7'), 13)) * 900}px)`}}>
          <NotebookPage rot={-1}>
            <div style={{fontSize: 60, opacity: 0.7}}>Dia 9</div>
            <Write at={t(69)} dur={14}><div style={{fontSize: 96, whiteSpace: 'nowrap'}}>R$ 1,50</div></Write>
            <Write at={t(71)} dur={14}><div style={{fontSize: 96, whiteSpace: 'nowrap'}}>− R$ 0,70 <span style={{fontSize: 56}}>(custo)</span></div></Write>
            <Write at={t(74)} dur={14}><div style={{fontSize: 104, whiteSpace: 'nowrap', textDecoration: 'underline', color: C.greenDark}}>= R$ 0,80</div></Write>
            <Write at={t(79)} dur={20}><div style={{fontSize: 96, whiteSpace: 'nowrap', marginTop: 20}}>80 × 0,80 = <span style={{color: '#C0392B'}}>R$ 64</span></div></Write>
            <Write at={t(85)} dur={16}><div style={{fontSize: 92, whiteSpace: 'nowrap', color: '#C0392B'}}>meta 72 → faltam 8</div></Write>
          </NotebookPage>
        </AbsoluteFill>
      </Scene>

      {/* 7b — vendeu mais... e ganhou menos */}
      <Scene from={F('S7b')} to={F('S8')} zoom={0.06} pan={[0, -24]}>
        <Punch at={[t(90), t(93)]}>
          <AbsoluteFill style={{background: '#1F8A4C', clipPath: 'polygon(0 0, 100% 0, 100% 46%, 0 54%)'}} />
          <AbsoluteFill style={{background: '#B3343C', clipPath: 'polygon(0 54%, 100% 46%, 100% 100%, 0 100%)'}} />
          <Big at={t(89)} top={470} size={130} color="#fff">VENDEU MAIS</Big>
          {f >= t(89) && <div style={{position: 'absolute', left: 430, top: 620, fontSize: 220, fontWeight: 700, color: C.green, ...strokeText(16), transform: `translateY(${-ramp(f, t(89), t(89) + 12, 0, 30)}px)`}}>▲</div>}
          <Big at={t(92)} top={1060} size={130} color="#fff">GANHOU MENOS</Big>
          {f >= t(92) && <div style={{position: 'absolute', left: 430, top: 1200, fontSize: 220, fontWeight: 700, color: C.red, ...strokeText(16), transform: `translateY(${ramp(f, t(92), t(92) + 12, 0, 30)}px)`}}>▼</div>}
          <At x={640} y={1360}><Rafa width={420} expr={f >= t(92) ? 'sad' : 'surprised'} blink={B(12)} look={[-0.4, -0.6]} /></At>
        </Punch>
      </Scene>

      {/* 8 — dia 10: a senhora chega primeiro... R$ 1 */}
      <Scene from={F('S8')} to={F('S9')} zoom={0.07} pan={[-30, -20]}>
        <Punch at={[t(106)]} amt={0.1}>
          <Par depth={0.5}><SchoolGate open={1} /></Par>
          <At x={540} y={900}><SenhoraGeladinho width={460} expr="determined" blink={B(13)} look={[-0.6, 0]} /></At>
          <At x={600} y={1460}><CoolerOpen w={330} /></At>
          {f >= t(102) && <At x={520} y={740 + (1 - pop(f, t(102), 10)) * 200} r={-4}><PriceSign price={f >= t(106) ? 'R$ 1' : '...'} w={340} /></At>}
          <At x={20} y={1000}><Rafa width={420} expr={f >= t(106) ? 'surprised' : 'neutral'} blink={B(14)} look={[0.8, -0.2]} /></At>
          {f < t(100) && <div style={{position: 'absolute', left: 300, top: 470, background: C.ink, color: '#fff', border: `6px solid ${C.ink}`, borderRadius: 18, padding: '6px 26px', fontSize: 56, fontWeight: 700, transform: `scale(${pop(f, F('S8'), 10)})`}}>DIA 9 → DIA 10</div>}
        </Punch>
        <Flash at={t(106)} max={0.5} />
      </Scene>

      {/* 9 — atacado: o dela custa 50 centavos · ela podia baixar, ele não */}
      <Scene from={F('S9')} to={F('S10')} zoom={0.05} pan={[0, -20]}>
        <Sunburst color="#2E7D87" ray="#3A8F99" spin={0.2} />
        {[0, 1, 2].map((i) => <At key={i} x={120 + i * 90} y={500 - i * 30} s={pop(f, t(110) + i * 3, 10)} r={(i - 1) * 6}><PolpaSack w={210} /></At>)}
        <Big at={t(112)} top={500} size={84} color={C.yellow}><span style={{marginLeft: 420}}>ATACADO</span></Big>
        {f >= t(113) && (
          <div style={{position: 'absolute', left: 120, top: 880, width: 840, display: 'flex', flexDirection: 'column', gap: 30, fontWeight: 700}}>
            {[['DELA', 0.5, '#8FD6C8', t(117)], ['DELE', 0.7, C.orange, t(113) + 20]].map(([who, v, col, at]: any) => (
              <div key={who} style={{display: 'flex', alignItems: 'center', gap: 20}}>
                <div style={{width: 170, fontSize: 64, color: '#fff', ...strokeText(10)}}>{who}</div>
                <div style={{height: 100, width: ramp(f, at, at + 14, 0, v * 760), background: col, border: `7px solid ${C.ink}`, borderRadius: 16}} />
                <div style={{fontSize: 64, color: '#fff', ...strokeText(10), opacity: ramp(f, at + 10, at + 16), whiteSpace: 'nowrap'}}>R$&nbsp;{String(v.toFixed(2)).replace('.', ',')}</div>
              </div>
            ))}
          </div>
        )}
        <Big at={t(119)} top={1200} size={88} color={C.green}>ELA PODIA BAIXAR.</Big>
        <Big at={t(122)} top={1310} size={110} color={C.red}>ELE NÃO.</Big>
      </Scene>

      {/* 10 — fim da tarde: ninguém comprou de ninguém */}
      <Scene from={F('S10')} to={F('S11')} zoom={0.05} pan={[0, -20]}>
        <Par depth={0.5}><SchoolGate open={0.2} /></Par>
        <AbsoluteFill style={{background: 'rgba(230,120,60,0.28)'}} />
        <At x={30} y={1460}><CoolerOpen w={300} /></At>
        <At x={760} y={1460}><CoolerOpen w={280} /></At>
        <At x={20} y={1040}><Rafa width={380} expr="sad" blink={B(15)} look={[0.2, 0.6]} /></At>
        <At x={680} y={1000}><SenhoraGeladinho width={360} expr="sad" blink={B(16)} look={[-0.2, 0.6]} /></At>
        {f >= t(130) && [0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 140 + i * 680, top: 1360, fontSize: 80, fontWeight: 700, color: C.red, ...strokeText(10), transform: `scale(${pop(f, t(132) + i * 6, 9)})`}}>0</div>)}
      </Scene>

      {/* 11 — a senhora sentada na calçada, contando moeda por moeda (igual a mãe dele) */}
      <Scene from={F('S11')} to={F('S12')} zoom={0.1} pan={[0, -40]}>
        <Par depth={0.5}><SchoolGate /></Par>
        <AbsoluteFill style={{background: 'rgba(40,20,60,0.25)'}} />
        <At x={330} y={1000}><SenhoraGeladinho width={500} expr="sad" blink={B(17)} look={[0, 0.9]} /></At>
        {f >= t(145) && [0, 1, 2, 3, 4].map((i) => {
          const on = f >= t(145) + i * 9;
          return on ? <div key={i} style={{position: 'absolute', left: 420 + i * 56, top: 1500 - (i % 2) * 10, width: 54, height: 54, borderRadius: 27, background: C.yellow, border: `5px solid ${C.ink}`, fontSize: 30, fontWeight: 700, textAlign: 'center', lineHeight: '44px', transform: `scale(${pop(f, t(145) + i * 9, 10)})`}}>$</div> : null;
        })}
        {f >= t(150) && (
          <div style={{position: 'absolute', left: 60, top: 600, width: 400, height: 400, borderRadius: 200, overflow: 'hidden', border: `9px solid ${C.ink}`, filter: 'sepia(0.7)', transform: `scale(${pop(f, t(150), 12)})`, background: '#9C6B3F'}}>
            <div style={{position: 'absolute', left: 20, top: 30}}><Mae width={360} expr="sad" look={[0, 0.9]} /></div>
          </div>
        )}
        <At x={760} y={1080}><Rafa width={300} expr="sad" blink={B(18)} look={[-0.8, 0.2]} /></At>
      </Scene>

      {/* 12 — ela levanta e vem: "eu tenho freezer e faço barato. Tu tem perna e tem freguês." */}
      <Scene from={F('S12')} to={F('POLL')} zoom={0.08} pan={[20, -30]}>
        <Par depth={0.5}><SchoolGate /></Par>
        <At x={40} y={980}><Rafa width={440} expr={f >= t(173) ? 'surprised' : 'neutral'} blink={B(19)} look={[0.9, -0.2]} /></At>
        <At x={700 - ramp(f, t(161), t(165) + 10, 0, 200)} y={880 + Math.abs(Math.sin(f / 5)) * -8 * (f < t(165) + 10 ? 1 : 0)}><SenhoraGeladinho width={480} expr={f >= t(166) ? 'determined' : 'neutral'} blink={B(20)} look={[-0.9, 0]} /></At>
        {f >= t(166) && f < t(173) && <Balloon text={<>MENINO... EU TENHO <span style={{color: '#2D6A9A'}}>FREEZER</span><br />E FAÇO <span style={{color: C.greenDark}}>BARATO</span>.</>} at={t(166)} x={160} y={460} w={820} tail="right" size={58} />}
        {f >= t(173) && <Balloon text={<>TU TEM <span style={{color: C.orange}}>PERNA</span><br />E TEM <span style={{color: C.greenDark}}>FREGUÊS</span>.</>} at={t(173)} x={260} y={460} w={700} tail="right" size={66} />}
      </Scene>

      {/* 13 — voto */}
      {f >= F('POLL') && (
        <>
          <Scene from={F('POLL')} to={END} zoom={0.06} pan={[0, -20]}>
            <SchoolGate />
            <At x={40} y={980}><Rafa width={440} expr="worried" blink={B(21)} look={[0.9, -0.2]} /></At>
            <At x={500} y={880}><SenhoraGeladinho width={480} expr="determined" blink={B(22)} look={[-0.9, 0]} /></At>
          </Scene>
          <Poll parte={9} a="VIRA SÓCIO DELA E DIVIDE O LUCRO" b="RECUSA E SEGUE NA GUERRA DE PREÇO" at={t(179)} aAt={t(183)} bAt={t(193)} voteAt={t(203)} />
        </>
      )}

      {/* overlays globais */}
      {f >= F('S3') && f < F('POLL') && <Hud s={hud} enterAt={F('S3')} />}
      <Captions />
      <TitleCard parte={8} big="R$ 1,50" bigColor={C.green} l2="VENDEU MAIS" l3="E GANHOU MENOS" l3Color={C.red} out={sec(4.4)} />
    </AbsoluteFill>
  );
};
