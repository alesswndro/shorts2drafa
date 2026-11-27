import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import align from './align.json';
import {C, FONT, HAND, FPS, strokeText} from '../theme';
import {bob, blinking, pop, ramp, sec, shake} from '../components/anim';
import {Rafa, Mae, Kaua, Biel, Duda, SenhoraGeladinho, Bike} from '../components/Person';
import {Hud, Balloon, TitleCard, Poll, Sunburst} from '../components/ui';
import {KitchenNight, TableFront, EvictionDoor, StreetMorning} from '../components/sets';
import {SchoolGate, PolpaSack, Geladinho} from '../components/sets2';
import {Freezer, CoolerOpen} from '../components/sets3';
import {Scene, Par, At, Write, makeCaptions, Chunk, Word, Punch, Flash, Sparkles, CoinRain, countUp} from '../components/scene';

const W = align.words as Word[];
const t = (i: number) => sec(W[i].start);
export const EP09_DURATION = Math.round((align.duration + 3) * FPS);

const Y = C.yellow, R = C.red, G = C.green;
const CHUNKS: Chunk[] = [
  [0, 1, undefined, {0: Y, 1: Y}], [2, 3], [4, 6], [7, 9, undefined, {2: Y}],
  [10, 13, undefined, {3: R}], [14, 16], [17, 18, undefined, {0: Y, 1: G}], [19, 20, undefined, {0: Y, 1: Y}], [21, 23, undefined, {1: Y}], [24, 26, undefined, {0: Y}],
  [27, 28], [29, 30], [31, 33, undefined, {1: Y}], [34, 35, undefined, {0: R, 1: R}], [36, 37], [38, 39, undefined, {0: Y, 1: Y}], [40, 42], [43, 45, undefined, {2: R}],
  [46, 49], [50, 51, undefined, {0: Y, 1: Y}], [52, 54], [55, 56], [57, 58], [59, 62], [63, 67, undefined, {4: Y}], [68, 69, undefined, {1: Y}], [70, 72], [73, 76, undefined, {2: G, 3: G}],
  [77, 78], [79, 80, undefined, {0: Y, 1: Y}], [81, 84, undefined, {3: R}], [85, 87], [88, 90, undefined, {1: Y, 2: Y}], [91, 93], [94, 95], [96, 98, undefined, {2: R}],
  [109, 111, undefined, {1: Y}], [112, 115, undefined, {3: Y}], [116, 117], [118, 119], [120, 121, undefined, {1: Y}],
  [148, 149], [150, 151], [152, 155, undefined, {3: Y}], [156, 159, undefined, {2: Y, 3: Y}],
  [160, 163], [164, 166], [167, 168, undefined, {0: R, 1: R}], [169, 170, undefined, {0: Y}], [171, 173], [174, 175, undefined, {0: R, 1: R}], [176, 178], [179, 180, undefined, {1: R}],
];

const T = {S1: 0, VOTE: 4.8, S3: 12.4, S4: 19.8, S5: 30.1, S6: 39.0, S7: 48.2, S8: 58.3, S9: 62.8, POLL: 73.7};
const capY = (s: number) =>
  s < T.S3 ? 1720 : s < T.S4 ? 1720 : s < T.S5 ? 1720 : s < T.S6 ? 470 : s < T.S7 ? 1720 : s < T.S8 ? 1720 : s < T.S9 ? 470 : 470;
const Captions = makeCaptions(W, CHUNKS, capY);

const Big: React.FC<{at: number; top: number; size: number; color: string; children: React.ReactNode; stroke?: number}> = ({at, top, size, color, children, stroke = 18}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontWeight: 700, fontSize: size, lineHeight: 1, color, ...strokeText(stroke), transform: `scale(${pop(f, at, 9)})`}}>{children}</div>;
};
const Tag: React.FC<{at: number; x: number; y: number; bg: string; children: React.ReactNode; r?: number; size?: number; color?: string}> = ({at, x, y, bg, children, r = 0, size = 52, color = '#fff'}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return <div style={{position: 'absolute', left: x, top: y, transform: `scale(${pop(f, at, 10)}) rotate(${r}deg)`, background: bg, border: `6px solid ${C.ink}`, borderRadius: 18, padding: '6px 24px', fontSize: size, fontWeight: 700, color, ...(color === '#fff' ? strokeText(6) : {}), whiteSpace: 'nowrap'}}>{children}</div>;
};

/** olho vermelho (choro) por cima de um personagem `Person` de largura w posicionado em (x, y) */
const RedEyes: React.FC<{x: number; y: number; w: number; o?: number}> = ({x, y, w, o = 1}) => {
  const k = w / 400;
  return (
    <>
      {[150, 250].map((cx) => (
        <div key={cx} style={{position: 'absolute', left: x + (cx - 46) * k, top: y + (252 - 46) * k, width: 92 * k, height: 92 * k, borderRadius: '50%', border: `${10 * k}px solid rgba(220,60,70,${0.75 * o})`, boxSizing: 'border-box'}} />
      ))}
      <div style={{position: 'absolute', left: x + 232 * k, top: y + 300 * k + ((Date.now() * 0) % 1), width: 16 * k, height: 26 * k, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#7EC8F0', border: `${4 * k}px solid ${C.ink}`, opacity: o}} />
    </>
  );
};

/** mãos apertando (sociedade) */
const Handshake: React.FC<{at: number; x: number; y: number}> = ({at, x, y}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const s = pop(f, at, 10);
  const shk = Math.sin((f - at) / 2.2) * 10 * Math.max(0, 1 - (f - at) / 40);
  return (
    <svg width={420} height={220} style={{position: 'absolute', left: x, top: y + shk, transform: `scale(${s})`, overflow: 'visible'}}>
      <rect x={-40} y={70} width={170} height={70} rx={30} fill={C.skin} stroke={C.ink} strokeWidth={9} />
      <rect x={290} y={70} width={170} height={70} rx={30} fill="#7A4A2C" stroke={C.ink} strokeWidth={9} />
      <ellipse cx={170} cy={110} rx={90} ry={56} fill={C.skin} stroke={C.ink} strokeWidth={9} />
      <ellipse cx={250} cy={100} rx={92} ry={58} fill="#7A4A2C" stroke={C.ink} strokeWidth={9} />
      <path d="M200,80 Q230,95 260,80 M205,105 Q235,120 265,105" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
};

/** mapa do bairro: colégio no centro, os 3 meninos se espalhando (K, D, B) */
const BairroMap: React.FC<{spreadAt: number}> = ({spreadAt}) => {
  const f = useCurrentFrame();
  const p = ramp(f, spreadAt, spreadAt + 40);
  const kids = [['K', '#3FA86A', -330, -260], ['D', '#E86A9A', 320, -180], ['B', '#F5C431', -60, 330]] as const;
  return (
    <AbsoluteFill style={{background: '#E9E1C8'}}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        {Array.from({length: 7}, (_, i) => <rect key={`h${i}`} x={0} y={500 + i * 200} width={1080} height={46} fill="#C9C1A8" />)}
        {Array.from({length: 6}, (_, i) => <rect key={`v${i}`} x={60 + i * 200} y={420} width={46} height={1500} fill="#C9C1A8" />)}
        {Array.from({length: 30}, (_, i) => <rect key={`b${i}`} x={120 + (i % 5) * 200} y={560 + Math.floor(i / 5) * 200} width={120} height={120} rx={10} fill={['#F2C14E', '#E8735A', '#5BB0D9', '#8BC48A', '#E9A0B8'][i % 5]} stroke={C.ink} strokeWidth={5} opacity={0.85} />)}
        <rect x={430} y={1070} width={220} height={150} rx={14} fill="#F2CF6B" stroke={C.ink} strokeWidth={8} />
        <rect x={430} y={1070} width={220} height={44} fill="#2E7D87" stroke={C.ink} strokeWidth={8} />
        <text x={540} y={1103} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill="#fff">COLÉGIO</text>
        {kids.map(([l, c, dx, dy]) => (
          <line key={l} x1={540} y1={1145} x2={540 + dx * p} y2={1145 + dy * p} stroke={c} strokeWidth={10} strokeDasharray="22 16" strokeLinecap="round" />
        ))}
      </svg>
      <div style={{position: 'absolute', left: 540 - 55, top: 1145 - 150, width: 110, height: 110, borderRadius: 55, background: '#D9343C', border: `7px solid ${C.ink}`, color: '#fff', fontSize: 62, fontWeight: 700, textAlign: 'center', lineHeight: '96px', ...strokeText(6)}}>R</div>
      {kids.map(([l, c, dx, dy], i) => (
        <div key={l} style={{position: 'absolute', left: 540 + dx * p - 50, top: 1145 + dy * p - 50, width: 100, height: 100, borderRadius: 50, background: c, border: `7px solid ${C.ink}`, color: '#fff', fontSize: 58, fontWeight: 700, textAlign: 'center', lineHeight: '86px', ...strokeText(6), transform: `scale(${pop(f, spreadAt - 30 + i * 6, 10)})`}}>{l}</div>
      ))}
    </AbsoluteFill>
  );
};

export const Ep09: React.FC = () => {
  const f = useCurrentFrame();
  const B = (seed: number) => blinking(f, seed);
  const F = (k: keyof typeof T) => sec(T[k]);
  const END = EP09_DURATION;

  // HUD: dia 11 · 244 → 376 (R$ 132) → 336 (cobre os R$ 40 do Biel pra Dona Graça) · 20 dias · meta 78
  const guardado = f < t(174) ? countUp(f, t(139), t(139) + 30, 244, 376) : countUp(f, t(174), t(174) + 20, 376, 336);
  const hud = {dia: 11, guardado, despejo: 20, meta: 78, metaAlert: f < t(143), despejoAlert: f >= t(34) && f < t(40), guardadoShakeAt: t(174)};

  return (
    <AbsoluteFill style={{background: C.ink, fontFamily: FONT}}>
      <Audio src={staticFile('ep09/mix.wav')} />

      {/* 1 — 200 geladinhos por dia: começou a sociedade */}
      <Scene from={F('S1')} to={F('VOTE')} zoom={0.07} pan={[0, -24]}>
        <Punch at={[t(0)]}>
          <Par depth={0.6}><KitchenNight dim={0.05} /></Par>
          <At x={300} y={760}><Freezer cap={40} filled={40} w={480} /></At>
          <Big at={t(1)} top={1500} size={150} color={C.yellow}>× 200</Big>
          <Sparkles at={t(1)} x={540} y={1100} n={14} />
        </Punch>
      </Scene>

      {/* 2 — placar acirrado → A ganhou → aperto de mão */}
      <Scene from={F('VOTE')} to={F('S3')} zoom={0.05} pan={[0, -24]}>
        <Sunburst color="#4B3A8C" ray="#56459A" spin={0.2} />
        <Punch at={[t(13), t(18)]}>
          <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${pop(f, t(10), 12)}) translateX(${shake(f, t(13), 14, 10)}px)`}}>
            <div style={{background: C.yellow, color: C.ink, border: `7px solid ${C.ink}`, borderRadius: 50, padding: '6px 44px', fontSize: 80, fontWeight: 700}}>FOI ACIRRADO!</div>
          </div>
          {f >= t(10) + 6 && (() => {
            const share = f < t(17) ? 0.5 + 0.05 * Math.sin((f - t(10)) / 3.2) : 0.5 + ramp(f, t(17), t(17) + 10, 0, 0.06);
            return (
              <div style={{position: 'absolute', top: 580, left: 90, width: 900, height: 120, border: `8px solid ${C.ink}`, borderRadius: 60, overflow: 'hidden', display: 'flex', transform: `scale(${pop(f, t(10) + 6, 12)})`}}>
                <div style={{width: `${share * 100}%`, background: C.orange, display: 'flex', alignItems: 'center', paddingLeft: 30, fontSize: 70, fontWeight: 700, color: '#fff', ...strokeText(8)}}>A</div>
                <div style={{flex: 1, background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 30, fontSize: 70, fontWeight: 700, color: '#fff', ...strokeText(8)}}>B</div>
              </div>
            );
          })()}
          {f >= t(17) && f < t(21) && (
            <div style={{position: 'absolute', top: 760, left: 100, transform: `scale(${pop(f, t(17), 10)})`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 30, background: C.cream, border: `8px solid ${C.ink}`, borderRadius: 34, padding: '26px 40px', width: 880, boxSizing: 'border-box', fontWeight: 700}}>
                <div style={{width: 120, height: 120, flex: 'none', borderRadius: 60, background: C.orange, border: `7px solid ${C.ink}`, color: '#fff', fontSize: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', ...strokeText(10)}}>A</div>
                <div style={{fontSize: 62, lineHeight: 1.05, color: C.ink, textAlign: 'center', flex: 1}}>VIRA SÓCIO DELA<br />E DIVIDE O LUCRO</div>
              </div>
              <div style={{position: 'absolute', right: -30, top: -50, width: 130, height: 130, borderRadius: 65, background: '#2DA44E', border: `8px solid ${C.ink}`, color: '#fff', fontSize: 90, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(f, t(17) + 6, 8)})`}}>✓</div>
            </div>
          )}
          <Sparkles at={t(17)} x={540} y={640} n={16} />
          {f >= t(21) && (
            <>
              <At x={-20} y={820 + (1 - pop(f, t(21), 12)) * 500}><Rafa width={470} expr="happy" blink={B(1)} look={[0.8, 0]} /></At>
              <At x={560} y={760 + (1 - pop(f, t(21) + 4, 12)) * 500}><SenhoraGeladinho width={480} expr="happy" blink={B(2)} look={[-0.8, 0]} /></At>
              <Handshake at={t(23)} x={330} y={1180} />
              <Tag at={t(24)} x={330} y={760} bg={C.greenDark} size={60}>SÓCIOS</Tag>
            </>
          )}
        </Punch>
        <Flash at={t(17)} max={0.5} />
      </Scene>

      {/* 3 — recap: despejo */}
      <Scene from={F('S3')} to={F('S4')} zoom={0.05} pan={[-30, 0]}>
        <Par depth={0.6}><EvictionDoor stampAt={t(38)} /></Par>
        <At x={640} y={1180}><Rafa width={460} expr="determined" blink={B(3)} look={[-0.6, -0.4]} /></At>
      </Scene>

      {/* 4 — Dona Graça e o acordo: ela faz / ele vende / R$ 2 */}
      <Scene from={F('S4')} to={F('S5')} zoom={0.05} pan={[0, -24]}>
        <Punch at={[t(50), t(57), t(68), t(75)]}>
          <AbsoluteFill style={{background: '#8FD6C8', clipPath: 'polygon(0 0, 54% 0, 46% 100%, 0 100%)'}} />
          <AbsoluteFill style={{background: '#F0A04B', clipPath: 'polygon(54% 0, 100% 0, 100% 100%, 46% 100%)'}} />
          <At x={10} y={760 + bob(f, 4, 6, 26)}><SenhoraGeladinho width={440} expr="happy" blink={B(4)} look={[0.4 + 0.3 * Math.sin(f / 18), 0]} /></At>
          {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{position: 'absolute', left: 80 + i * 90, top: 300 + ((f * 2 + i * 70) % 1500), fontSize: 50, color: 'rgba(255,255,255,0.55)'}}>❄</div>)}
          <Tag at={t(50)} x={40} y={600} bg="#2D6A9A" size={64}>DONA GRAÇA</Tag>
          {f >= t(57) && <Big at={t(57)} top={460} size={92} color="#fff"><span style={{marginRight: 480}}>ELA FAZ</span></Big>}
          <At x={40} y={1460} s={pop(f, t(61), 10)}><Freezer cap={10} filled={10} w={260} /></At>
          <At x={300} y={1520} s={pop(f, t(65), 10)} r={6}><PolpaSack w={170} /></At>
          {f >= t(68) && <Big at={t(68)} top={460} size={92} color="#fff"><span style={{marginLeft: 480}}>ELE VENDE</span></Big>}
          {f >= t(68) && <At x={600} y={820 + (1 - pop(f, t(68), 12)) * 400}><Rafa width={440} expr="determined" blink={B(5)} look={[-0.4, 0]} /></At>}
          {f >= t(68) && <At x={620} y={1500}><CoolerOpen w={330} /></At>}
          {f >= t(75) && <div style={{position: 'absolute', left: 380, top: 1200, transform: `scale(${pop(f, t(75), 9)}) rotate(-6deg)`, background: '#D9B07A', border: `7px solid ${C.ink}`, borderRadius: 10, padding: '10px 30px', fontFamily: HAND, fontWeight: 700, fontSize: 110, color: C.greenDark}}>R$ 2</div>}
        </Punch>
      </Scene>

      {/* 5 — 200 geladinhos, sozinho não dá → lembrou dos 3 meninos */}
      <Scene from={F('S5')} to={F('S6')} zoom={0.06} pan={[30, -20]}>
        {f < t(85) ? (
          <Punch at={[t(79), t(84)]}>
            <Sunburst color="#B3343C" ray="#C2434B" spin={0.25} />
            <div style={{position: 'absolute', top: 500, left: 60, width: 960, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center'}}>
              {Array.from({length: countUp(f, t(79), t(80) + 10, 0, 60)}, (_, i) => <Geladinho key={i} w={30} color={i % 3 === 2 ? '#7B3F8C' : '#EFE3C8'} />)}
            </div>
            <Big at={t(79)} top={1000} size={180} color="#fff">200</Big>
            <At x={290} y={1250 + shake(f, t(84), 14, 8)}><Rafa width={500} expr="worried" blink={B(6)} look={[0, -0.8]} /></At>
          </Punch>
        ) : (
          <>
            <Par depth={0.5}><StreetMorning /></Par>
            {[[Kaua, 380, 0], [Duda, 600, 1], [Biel, 820, 2]].map(([P, x, i]: any) => (
              <At key={i} x={x} y={1040 + i * 26}>
                <div style={{position: 'relative'}}>
                  <Bike width={250} style={{position: 'absolute', left: -60, top: 330}} />
                  <P width={210} expr={f >= t(96) ? 'sad' : 'neutral'} blink={B(7 + i)} look={[-0.4, 0]} />
                </div>
              </At>
            ))}
            <At x={10} y={900 + bob(f, 3, 5)}><Rafa width={400} expr="determined" blink={B(10)} look={[0.8, 0]} /></At>
            <div style={{position: 'absolute', left: 160, top: 760, fontSize: 170, fontWeight: 700, color: C.yellow, ...strokeText(16), transform: `scale(${pop(f, t(87), 8)})`}}>!</div>
            <Flash at={t(85)} max={0.4} />
          </>
        )}
      </Scene>

      {/* 6 — Kauã, Duda e Biel · 30 centavos · o bairro todo */}
      <Scene from={F('S6')} to={F('S7')} zoom={0.04} pan={[0, -20]}>
        {f < t(109) ? (
          <Punch at={[t(99), t(100), t(102), t(103)]}>
            <Sunburst color="#2E7D87" ray="#3A8F99" spin={0.2} />
            {[[Kaua, 40, 99, 'KAUÃ', '#3FA86A'], [Duda, 380, 100, 'DUDA', '#E86A9A'], [Biel, 720, 102, 'BIEL', '#C9A227']].map(([P, x, w, name, col]: any) => (
              f >= t(w) ? (
                <div key={name}>
                  <At x={x} y={760} s={pop(f, t(w), 10)}><P width={320} expr="happy" blink={B(w)} look={[0, 0.1]} /></At>
                  <Tag at={t(w)} x={x + 40} y={640} bg={col} size={60}>{name}</Tag>
                </div>
              ) : null
            ))}
            <Big at={t(103)} top={1480} size={84} color={C.yellow}>R$ 0,30 POR GELADINHO</Big>
          </Punch>
        ) : (
          <BairroMap spreadAt={t(116)} />
        )}
      </Scene>

      {/* 7 — 200 vendidos · tirando custo, comissão, parte da Dona Graça · R$ 132 · quase 2× a meta */}
      <Scene from={F('S7')} to={F('S8')} zoom={0.06} pan={[0, -24]}>
        <Punch at={[t(126), t(139), t(143)]}>
          <Sunburst color="#1F8A4C" ray="#26A05A" spin={0.3} />
          <Big at={t(126)} top={470} size={120} color="#fff">{countUp(f, t(126), t(126) + 24, 0, 200)} VENDIDOS</Big>
          {[[t(128), '− CUSTO'], [t(131), '− COMISSÃO'], [t(134), '− PARTE DA DONA GRAÇA']].map(([at, txt]: any, i) => (
            f >= at && f < t(139) ? <div key={i} style={{position: 'absolute', top: 640 + i * 110, left: 0, right: 0, textAlign: 'center', fontSize: 76, fontWeight: 700, color: C.red, ...strokeText(12), transform: `scale(${pop(f, at, 10)})`}}>{txt}</div> : null
          ))}
          {f >= t(139) && <Big at={t(139)} top={640} size={270} color={C.green} stroke={24}>R$ {countUp(f, t(139), t(139) + 24, 0, 132)}</Big>}
          <Big at={t(143)} top={960} size={92} color={C.yellow}>QUASE 2× A META!</Big>
          <Sparkles at={t(143)} x={540} y={1000} n={20} />
          <CoinRain from={t(139)} to={t(143) + 10} n={16} />
          <At x={90} y={1250}><Rafa width={900} expr="happy" blink={B(11)} look={[0, -0.8]} /></At>
        </Punch>
        <Flash at={t(139)} max={0.45} />
      </Scene>

      {/* 8 — mostrou o caderno pra mãe: ela leu duas vezes */}
      <Scene from={F('S8')} to={F('S9')} zoom={0.07} pan={[0, -30]}>
        <KitchenNight />
        <AbsoluteFill style={{background: 'radial-gradient(circle at 35% 20%, rgba(255,226,150,0.35), transparent 50%)'}} />
        <At x={40} y={820}><Mae width={480} expr={f >= t(158) ? 'happy' : 'surprised'} blink={false} look={[Math.sin((f - t(156)) / 5) * 0.8, 0.6]} /></At>
        <At x={600} y={850}><Rafa width={440} expr="happy" blink={B(12)} look={[-0.6, 0]} /></At>
        <TableFront />
        <div style={{position: 'absolute', left: 230, top: 1250, width: 300, height: 190, background: '#FBFBF6', border: `7px solid ${C.ink}`, borderRadius: 8, transform: 'rotate(-6deg)', fontFamily: HAND, fontSize: 64, color: C.greenDark, textAlign: 'center', paddingTop: 50, boxSizing: 'border-box'}}>R$ 132</div>
        {f >= t(158) && <div style={{position: 'absolute', left: 130, top: 760, fontSize: 90, color: '#E86A9A', ...strokeText(8), transform: `scale(${pop(f, t(158), 10)}) translateY(${-((f - t(158)) % 40)}px)`}}>♥</div>}
      </Scene>

      {/* 9 — acerto de contas: faltou um. Biel, R$ 40, olho vermelho, o remédio da irmã */}
      <Scene from={F('S9')} to={F('POLL')} zoom={0.08} pan={[20, -30]}>
        <Punch at={[t(167), t(174)]}>
          <KitchenNight dim={0.2} />
          {f < t(181) && <div style={{position: 'absolute', top: 620, left: 80, width: 920, display: 'flex', justifyContent: 'space-between'}}>
            {[['KAUÃ', '#3FA86A', true], ['DUDA', '#E86A9A', true], ['BIEL', '#C9A227', false]].map(([n, c, ok]: any, i) => (
              <div key={n} style={{width: 270, background: C.cream, border: `7px solid ${C.ink}`, borderRadius: 20, padding: '10px 0', textAlign: 'center', fontSize: 56, fontWeight: 700, transform: `scale(${pop(f, F('S9') + i * 6, 10)})`}}>
                <div style={{color: c, ...strokeText(5)}}>{n}</div>
                <div style={{fontSize: 80, color: ok ? C.greenDark : C.redPill}}>{ok ? '✓' : f >= t(167) ? '✗' : '...'}</div>
              </div>
            ))}
          </div>}
          {f >= t(174) && <div style={{position: 'absolute', left: 640, top: 880, transform: `scale(${pop(f, t(174), 9)}) rotate(6deg)`, background: C.redPill, border: `7px solid ${C.ink}`, borderRadius: 18, padding: '6px 26px', fontSize: 84, fontWeight: 700, color: '#fff', ...strokeText(6)}}>−R$ 40</div>}
          <At x={20} y={1040}><Rafa width={430} expr={f >= t(167) ? 'surprised' : 'neutral'} blink={B(13)} look={[0.8, 0]} /></At>
          <At x={560} y={1060 + (1 - pop(f, t(169), 12)) * 400}><Biel width={420} expr="sad" blink={B(14)} look={[-0.5, 0.5]} /></At>
          {f >= t(179) && <RedEyes x={560} y={1060} w={420} o={ramp(f, t(179), t(179) + 10)} />}
          {f >= t(181) && <Balloon text={<>MINHA IRMÃ TAVA COM <span style={{color: C.redPill}}>FEBRE</span>, RAFA...<br />EU COMPREI O <span style={{color: C.greenDark}}>REMÉDIO</span>.</>} at={t(181)} x={120} y={460} w={860} tail="right" size={54} />}
        </Punch>
      </Scene>

      {/* 10 — voto */}
      {f >= F('POLL') && (
        <>
          <Scene from={F('POLL')} to={END} zoom={0.06} pan={[0, -20]}>
            <KitchenNight dim={0.2} />
            <At x={20} y={1040}><Rafa width={430} expr="worried" blink={B(15)} look={[0.8, 0]} /></At>
            <At x={560} y={1060}><Biel width={420} expr="sad" blink={B(16)} look={[-0.5, 0.5]} /></At>
          </Scene>
          <Poll parte={10} a="PERDOA E O BIEL PAGA AOS POUCOS" b="TIRA O BIEL DO TIME" at={t(191)} aAt={t(195)} bAt={t(205)} voteAt={t(216)} />
        </>
      )}

      {/* overlays globais */}
      {f >= F('S3') && f < F('POLL') && <Hud s={hud} enterAt={F('S3')} />}
      <Captions />
      <TitleCard parte={9} big="200 GELADINHOS" bigColor={C.yellow} l2="POR DIA" l3="E UM PROBLEMA" l3Color={C.red} out={sec(4.6)} bigSize={140} />
    </AbsoluteFill>
  );
};
