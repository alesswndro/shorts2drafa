import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import align from './align.json';
import {C, FONT, HAND, FPS, strokeText} from '../theme';
import {bob, blinking, pop, ramp, sec, shake} from '../components/anim';
import {Rafa, Mae, Kaua, Biel, Duda, SenhoraGeladinho} from '../components/Person';
import {Hud, Balloon, TitleCard, Poll, Sunburst, ClockPill} from '../components/ui';
import {KitchenNight, TableFront, EvictionDoor, NotebookPage, Planks} from '../components/sets';
import {VerOPeso, SchoolGate, RoadRush, RafaBike, Fish, Ice, Acai, Geladinho, PolpaSack} from '../components/sets2';
import {Scene, Par, At, Write, makeCaptions, Chunk, Word} from '../components/scene';

const W = align.words as Word[];
const t = (i: number) => sec(W[i].start);
export const EP06_DURATION = Math.round((align.duration + 3) * FPS);

const Y = C.yellow, R = C.red, G = C.green;
const CHUNKS: Chunk[] = [
  [0, 2, undefined, {0: Y, 1: Y, 2: Y}], [3, 4, undefined, {0: Y}], [5, 7, undefined, {2: Y}], [8, 9], [10, 12, '3 QUILÔMETROS.', {0: R, 1: R}],
  [13, 14, undefined, {0: Y, 1: Y}], [15, 16, undefined, {1: Y}], [17, 18], [19, 20], [21, 22, undefined, {1: R}],
  [23, 25, undefined, {2: Y}], [26, 27], [28, 29, undefined, {1: R}],
  [30, 31], [32, 33], [34, 36, undefined, {1: Y}], [37, 38, undefined, {0: R, 1: R}], [39, 40], [41, 42, undefined, {0: Y, 1: Y}], [43, 45], [46, 48, undefined, {2: R}],
  [49, 52], [53, 55], [56, 57, undefined, {1: Y}], [58, 58], [59, 59], [60, 60],
  [61, 62], [63, 65], [66, 68], [69, 71],
  [72, 75, undefined, {1: Y}], [76, 77], [78, 79], [80, 81, undefined, {1: Y}], [82, 82, undefined, {0: R}], [83, 83, undefined, {0: R}], [84, 86, undefined, {2: G}],
  [93, 96, undefined, {3: R}],
  [97, 99], [100, 101, undefined, {1: Y}], [102, 104],
  [105, 106, undefined, {1: Y}], [107, 108, undefined, {1: Y}], [109, 109], [110, 111, undefined, {0: Y, 1: Y}], [112, 115, undefined, {3: Y}],
  [129, 130, undefined, {1: Y}], [131, 133], [134, 135], [136, 137],
  [146, 148], [149, 151, undefined, {2: G}], [152, 153, undefined, {1: G}], [154, 155], [156, 158],
  [159, 160], [161, 162], [163, 164], [165, 167], [168, 169], [170, 172],
];

const T = {S1: 0, VOTE: 6.1, S3: 14.1, S4: 21.7, S5: 31.3, S6: 38.2, S7: 43.4, S8: 50.1, S9: 55.3, S10: 61.5, S11: 66.1, POLL: 73.5};
const capY = (s: number) =>
  s < T.VOTE ? 1500 : s < T.S3 ? 1700 : s < T.S4 ? 1720 : s < T.S5 ? 520 : s < T.S6 ? 455 : s < T.S7 ? 1100 : s < T.S8 ? 520 : s < T.S9 ? 1600 : s < T.S10 ? 1150 : s < T.S11 ? 520 : 1740;
const Captions = makeCaptions(W, CHUNKS, capY);

export const Ep06: React.FC = () => {
  const f = useCurrentFrame();
  const B = (seed: number) => blinking(f, seed);
  const F = (k: keyof typeof T) => sec(T[k]);
  const END = EP06_DURATION;

  // HUD: dia 6 · R$ 85 → R$ 148 (9 entregas × R$ 7) · 25 dias · meta R$ 69
  const nDeliv = Math.min(9, Math.max(0, Math.floor(ramp(f, t(61), t(71) + 10, 0, 9.999))));
  const guardado = 85 + nDeliv * 7;
  const hud = {dia: 6, guardado, despejo: 25, meta: 69, metaAlert: true, despejoAlert: f >= t(37) && f < t(43)};

  return (
    <AbsoluteFill style={{background: C.ink, fontFamily: FONT}}>
      <Audio src={staticFile('ep06/mix.wav')} />

      {/* 1 — 6:52, nona entrega, escola a 3 km (corrida de bicicleta) */}
      <Scene from={F('S1')} to={F('VOTE')} zoom={0.06} pan={[0, -20]}>
        <RoadRush speed={16} />
        <At x={250} y={760 + Math.sin(f / 4) * 6}><RafaBike width={560} expr="determined" blink={B(1)} sweat /></At>
        <ClockPill text={`6:${String(52 + Math.floor(ramp(f, 0, F('VOTE'), 0, 2))).padStart(2, '0')}`} x={640} y={470} at={sec(3.4)} size={72} red />
        {f >= sec(3.4) && <div style={{position: 'absolute', left: 60, top: 470, transform: `scale(${pop(f, sec(3.4), 10)})`, background: C.cream, border: `6px solid ${C.ink}`, borderRadius: 22, padding: '6px 26px', fontSize: 56, fontWeight: 700, color: C.ink}}>9ª ENTREGA</div>}
        {f >= t(11) && <div style={{position: 'absolute', left: 300, top: 610, transform: `scale(${pop(f, t(11), 10)})`, background: '#1F8A4C', border: `6px solid ${C.ink}`, borderRadius: 16, padding: '6px 26px', fontSize: 54, fontWeight: 700, color: '#fff'}}>ESCOLA → 3 KM</div>}
      </Scene>

      {/* 2 — o voto: "Vocês escolheram: sozinho, no limite... E ele fez." */}
      <Scene from={F('VOTE')} to={F('S3')} zoom={0.04} pan={[0, -24]}>
        <VoteRecap06 />
      </Scene>

      {/* 3 — recap: aviso de despejo */}
      <Scene from={F('S3')} to={F('S4')} zoom={0.05} pan={[-30, 0]}>
        <Par depth={0.6}><EvictionDoor stampAt={t(41)} /></Par>
        <At x={640} y={1180}><Rafa width={460} expr="worried" blink={B(2)} look={[-0.6, -0.4]} /></At>
      </Scene>

      {/* 4 — 5h no Ver-o-Peso: peixe, gelo, açaí; entrega atrás de entrega */}
      <Scene from={F('S4')} to={F('S5')} zoom={0.05} pan={[40, 0]}>
        <Par depth={0.5}><VerOPeso sky="dawn" /></Par>
        <ClockPill text={`${5 + Math.floor(ramp(f, F('S4'), F('S5'), 0, 1.99))}:${String(Math.floor(ramp(f, F('S4'), F('S5'), 0, 119.9)) % 60).padStart(2, '0')}`} x={660} y={450} at={F('S4')} size={64} />
        {[[58, Fish, 90, 0], [59, Ice, 420, 1], [60, Acai, 730, 2]].map(([i, Ic, x, j]: any) =>
          f >= t(i) && f < t(61) ? <At key={j} x={x} y={1100 + bob(f, j, 6)} s={pop(f, t(i), 9)}><Ic w={210} /></At> : null,
        )}
        {f >= t(61) && (
          <>
            <At x={-600 + ((f - t(61)) * 26) % 1900} y={1040}><RafaBike width={420} expr="determined" blink={B(3)} sweat /></At>
            <div style={{position: 'absolute', left: 300, top: 700, background: C.cream, border: `6px solid ${C.ink}`, borderRadius: 22, padding: '6px 30px', fontSize: 64, fontWeight: 700}}>
              ENTREGAS: <span style={{color: C.greenDark}}>{nDeliv}</span>/9
            </div>
            {nDeliv > 0 && <div key={nDeliv} style={{position: 'absolute', left: 420, top: 840 - ramp(f, t(61) + (nDeliv - 1) * 12, t(61) + (nDeliv - 1) * 12 + 14, 0, 60), opacity: 1 - ramp(f, t(61) + (nDeliv - 1) * 12 + 8, t(61) + nDeliv * 12), background: '#fff', border: `5px solid ${C.ink}`, borderRadius: 40, padding: '4px 22px', fontSize: 52, fontWeight: 700, color: C.greenDark}}>+ R$ 7</div>}
          </>
        )}
      </Scene>

      {/* 5 — 7 em ponto no portão da escola: suado, tremendo, mas na hora */}
      <Scene from={F('S5')} to={F('S6')} zoom={0.07} pan={[0, -30]}>
        <Par depth={0.6}><SchoolGate open={ramp(f, t(84), t(84) + 20)} /></Par>
        <ClockPill text={f >= t(73) ? '7:00' : '6:59'} x={330} y={760} at={F('S5')} size={96} red={f < t(84)} />
        <At x={260 + Math.sin(f * 1.9) * (f >= t(83) && f < t(84) ? 5 : 0)} y={1020}>
          <div style={{transform: `translateX(${ramp(f, F('S5'), t(78), -700, 0)}px)`}}>
            <RafaBike width={560} expr={f >= t(84) ? 'determined' : 'worried'} blink={B(4)} sweat={f >= t(82)} />
          </div>
        </At>
        {f >= t(84) && <div style={{position: 'absolute', left: 0, right: 0, top: 900, textAlign: 'center', fontSize: 90, fontWeight: 700, color: C.green, ...strokeText(16), transform: `scale(${pop(f, t(84), 9)})`}}>NA HORA!</div>}
      </Scene>

      {/* 6 — R$ 63. Faltaram 6. E ele tava morto. */}
      <Scene from={F('S6')} to={F('S7')} zoom={0.05} pan={[0, 20]}>
        <Sunburst color="#1F8A4C" ray="#26A05A" spin={0.25} />
        <div style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center', fontWeight: 700}}>
          <div style={{fontSize: 280, color: C.green, ...strokeText(24), transform: `scale(${pop(f, t(87), 9)})`}}>R$ 63</div>
          {f >= t(89) && <div style={{fontSize: 96, color: '#fff', ...strokeText(16), transform: `scale(${pop(f, t(89), 11)})`}}>FALTARAM <span style={{color: C.red}}>R$ 6</span></div>}
        </div>
        <At x={90} y={1250 + (1 - pop(f, F('S6'), 12)) * 400}><Rafa width={900} expr={f >= t(93) ? 'sad' : 'neutral'} blink={f >= t(93) ? Math.floor(f / 20) % 2 === 0 : B(5)} look={[0, -0.6]} /></At>
      </Scene>

      {/* 7 — a última entrega: a senhora comprando 10 kg de polpa de cupuaçu */}
      <Scene from={F('S7')} to={F('S8')} zoom={0.08} pan={[-40, -20]}>
        <Par depth={0.5}><VerOPeso sky="day" /></Par>
        {f >= t(105) && <At x={500} y={880 + bob(f, 6, 4)} s={pop(f, t(105), 12)}><SenhoraGeladinho width={460} expr="happy" blink={B(6)} look={[-0.5, 0]} /></At>}
        {f >= t(110) && <At x={560} y={1330} s={pop(f, t(110), 10)} r={-4}><PolpaSack w={240} /></At>}
        <At x={20} y={960 + bob(f, 7, 4)}><Rafa width={440} expr={f >= t(103) ? 'surprised' : 'neutral'} blink={B(7)} look={f >= t(103) ? [0.9, 0] : [0.3, 0.3]} /></At>
      </Scene>

      {/* 8 — "É pros meus geladinhos, menino. Vendo 150 por dia na porta do colégio." */}
      <Scene from={F('S8')} to={F('S9')} zoom={0.06} pan={[30, -20]}>
        <Par depth={0.5}><VerOPeso sky="day" /></Par>
        <At x={420} y={720}><SenhoraGeladinho width={640} expr="happy" blink={B(8)} look={[-0.6, 0]} /></At>
        <At x={-120} y={900}><Rafa width={620} expr="surprised" blink={false} look={[0.8, -0.2]} /></At>
        {f < t(121) && <Balloon text={<>É PROS MEUS<br /><span style={{color: C.greenDark}}>GELADINHOS</span>, MENINO.</>} at={t(116)} x={220} y={440} w={740} tail="right" size={58} />}
        {f >= t(121) && <Balloon text={<>VENDO <span style={{color: C.greenDark, fontSize: 80}}>150</span> POR DIA<br />NA PORTA DO COLÉGIO.</>} at={t(121)} x={200} y={430} w={760} tail="right" size={58} />}
      </Scene>

      {/* 9 — a conta de cabeça: 70 centavos pra fazer, R$ 2 pra vender */}
      <Scene from={F('S9')} to={F('S10')} zoom={0.05} pan={[0, -20]}>
        <Sunburst color="#2E7D87" ray="#3A8F99" spin={0.2} />
        <div style={{position: 'absolute', top: 460, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 50}}>
          {[0, 1, 2].map((i) => <div key={i} style={{transform: `scale(${pop(f, t(129) + i * 4, 10)}) translateY(${bob(f, i, 8)}px)`}}><Geladinho w={90} color={['#EFE3C8', '#7B3F8C', '#F4C27A'][i]} r={(i - 1) * 10} /></div>)}
        </div>
        {f >= t(138) && <div style={{position: 'absolute', top: 820, left: 0, right: 0, textAlign: 'center', fontSize: 92, fontWeight: 700, color: '#fff', ...strokeText(16), transform: `scale(${pop(f, t(138), 10)})`}}>FAZER: <span style={{color: C.red}}>R$ 0,70</span></div>}
        {f >= t(142) && <div style={{position: 'absolute', top: 940, left: 0, right: 0, textAlign: 'center', fontSize: 92, fontWeight: 700, color: '#fff', ...strokeText(16), transform: `scale(${pop(f, t(142), 10)})`}}>VENDER: <span style={{color: C.green}}>R$ 2</span></div>}
        {f >= t(145) + 6 && <div style={{position: 'absolute', top: 1065, left: 0, right: 0, textAlign: 'center', fontSize: 80, fontWeight: 700, color: C.yellow, ...strokeText(14), transform: `scale(${pop(f, t(145) + 6, 9)})`}}>SOBRA R$ 1,30 CADA</div>}
        <At x={90} y={1300}><Rafa width={900} expr="determined" blink={B(9)} look={[0, -0.8]} /></At>
      </Scene>

      {/* 10 — "o dinheiro fazia fila na porta dela": fila na porta do colégio */}
      <Scene from={F('S10')} to={F('S11')} zoom={0.06} pan={[-40, 0]}>
        <Par depth={0.5}><SchoolGate /></Par>
        <At x={40} y={880}><SenhoraGeladinho width={420} expr="happy" blink={B(10)} look={[0.6, 0]} /></At>
        <div style={{position: 'absolute', left: 120, top: 1230, width: 240, height: 140, background: '#F4F6FA', border: `8px solid ${C.ink}`, borderRadius: 18}}>
          <div style={{height: 40, background: '#2D6A9A', borderBottom: `7px solid ${C.ink}`}} />
        </div>
        {[[Kaua, 470, 0], [Duda, 640, 1], [Biel, 810, 2]].map(([P, x, i]: any) => (
          <At key={i} x={x - 20} y={1020 + i * 12 + (1 - pop(f, F('S10') + i * 6, 12)) * 80}><P width={230} expr="happy" blink={B(11 + i)} look={[-0.6, 0]} /></At>
        ))}
        {f >= t(152) && [0, 1, 2, 3].map((i) => (
          <div key={i} style={{position: 'absolute', left: 300 + i * 70, top: 960 - ((f - t(152) + i * 7) * 6) % 260, width: 54, height: 54, borderRadius: 27, background: C.yellow, border: `5px solid ${C.ink}`, fontSize: 32, fontWeight: 700, textAlign: 'center', lineHeight: '44px'}}>$</div>
        ))}
      </Scene>

      {/* 11 — de noite, página nova do caderno: GELADINHO */}
      <Scene from={F('S11')} to={F('POLL')} zoom={0.05} pan={[0, -24]}>
        <Planks color="#8E5E36" seam="#6E4526" vertical={false} />
        <AbsoluteFill style={{transform: `translateY(${(1 - pop(f, t(161), 13)) * 900}px)`}}>
          <NotebookPage rot={-1}>
            <div style={{fontSize: 60, opacity: 0.7}}>Dia 6</div>
            <div style={{height: 200}} />
            <Write at={t(173)} dur={20}>
              <div style={{fontSize: 118, color: '#C0392B', textDecoration: 'underline', whiteSpace: 'nowrap'}}>GELADINHO</div>
            </Write>
          </NotebookPage>
        </AbsoluteFill>
        {f < t(161) && <At x={600} y={1230}><Rafa width={520} expr="determined" blink={B(12)} look={[-0.5, -0.5]} /></At>}
      </Scene>

      {/* 12 — voto: aposta tudo no geladinho ou dinheiro certo? */}
      {f >= F('POLL') && (
        <>
          <Scene from={F('POLL')} to={END} zoom={0.06} pan={[0, -20]}>
            <KitchenNight />
            <At x={580} y={850}><Rafa width={440} expr="determined" blink={B(14)} look={[-0.4, 0]} /></At>
            <TableFront />
          </Scene>
          <Poll parte={7} a="LARGA AS ENTREGAS E APOSTA TUDO" b="CONTINUA NAS ENTREGAS: DINHEIRO CERTO" at={t(174)} aAt={t(178)} bAt={t(189)} voteAt={t(198)} />
        </>
      )}

      {/* overlays globais */}
      {f >= F('S3') && f < F('POLL') && <Hud s={hud} enterAt={F('S3')} />}
      <Captions />
      <TitleCard parte={6} big="9 ENTREGAS" bigColor={C.green} l2="ANTES DAS 7" l3="SOZINHO" l3Color={C.yellow} out={sec(3.4)} bigSize={205} />
    </AbsoluteFill>
  );
};

/** "Vocês escolheram: A — sozinho, com muito esforço" → ✓ → "E ele fez." (Rafa pedalando entra) */
const VoteRecap06: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Sunburst color="#4B3A8C" ray="#56459A" spin={0.2} />
      <div style={{position: 'absolute', top: 420, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${pop(f, t(13), 12)})`}}>
        <div style={{background: C.redPill, color: '#fff', border: `7px solid ${C.ink}`, borderRadius: 50, padding: '6px 44px', fontSize: 76, fontWeight: 700}}>VOCÊS ESCOLHERAM</div>
      </div>
      <div style={{position: 'absolute', top: 600, left: 100, transform: `translateX(${(1 - pop(f, t(15), 12)) * 1100}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 30, background: C.cream, border: `8px solid ${C.ink}`, borderRadius: 34, padding: '26px 40px', width: 880, boxSizing: 'border-box', fontWeight: 700}}>
          <div style={{width: 120, height: 120, flex: 'none', borderRadius: 60, background: C.orange, border: `7px solid ${C.ink}`, color: '#fff', fontSize: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', ...strokeText(10)}}>A</div>
          <div style={{fontSize: 66, lineHeight: 1.05, color: C.ink, textAlign: 'center', flex: 1}}>SOZINHO, COM<br />MUITO ESFORÇO</div>
        </div>
        {f >= t(21) && <div style={{position: 'absolute', right: -30, top: -50, width: 130, height: 130, borderRadius: 65, background: '#2DA44E', border: `8px solid ${C.ink}`, color: '#fff', fontSize: 90, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(f, t(21), 8)})`}}>✓</div>}
      </div>
      {f >= t(23) && (
        <div style={{position: 'absolute', left: 260, top: 720 + (1 - pop(f, t(23), 12)) * 900}}>
          <RafaBike width={560} expr="determined" blink={blinking(f, 2)} sweat={f >= t(26)} />
        </div>
      )}
    </AbsoluteFill>
  );
};
