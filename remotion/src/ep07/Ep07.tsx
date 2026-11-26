import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame} from 'remotion';
import align from './align.json';
import {C, FONT, FPS, strokeText} from '../theme';
import {bob, blinking, pop, ramp, sec, shake} from '../components/anim';
import {Rafa, Mae, Kaua, Biel, Duda, Person, SenhoraGeladinho} from '../components/Person';
import {Hud, Balloon, TitleCard, Poll, Sunburst} from '../components/ui';
import {KitchenNight, TableFront, EvictionDoor, Planks} from '../components/sets';
import {VerOPeso, SchoolGate, Fish, Ice, Acai, PolpaSack} from '../components/sets2';
import {Freezer, GeladinhoRow, SaltShaker, MilkBox, BagsPack, CoolerOpen} from '../components/sets3';
import {Scene, Par, At, makeCaptions, Chunk, Word, Punch, Flash, Sparkles, CoinRain, countUp} from '../components/scene';

const W = align.words as Word[];
const t = (i: number) => sec(W[i].start);
export const EP07_DURATION = Math.round((align.duration + 3) * FPS);

const Y = C.yellow, R = C.red, G = C.green;
const CHUNKS: Chunk[] = [
  [0, 0, undefined, {0: Y}], [1, 2, undefined, {0: Y}], [3, 6], [7, 9], [10, 12, undefined, {2: R}],
  [13, 16, undefined, {3: R}], [17, 19], [20, 21, undefined, {0: Y, 1: G}], [22, 23, undefined, {0: Y, 1: Y}],
  [24, 26, undefined, {1: Y}], [27, 28], [29, 31, undefined, {1: Y}], [32, 33, undefined, {1: Y}],
  [34, 35], [36, 37], [38, 40, undefined, {1: Y}], [41, 42, undefined, {0: R, 1: R}], [43, 44], [45, 46, undefined, {0: Y, 1: Y}], [47, 49], [50, 52, undefined, {2: R}],
  [53, 54], [55, 56, undefined, {0: R, 1: R}], [57, 58, undefined, {1: Y}], [59, 61, undefined, {2: Y}], [62, 63, undefined, {1: Y}], [64, 66],
  [67, 68, undefined, {1: Y}], [69, 70], [71, 72], [73, 74], [75, 76], [77, 79],
  [80, 81], [82, 83, undefined, {1: R}], [84, 85, undefined, {0: R}], [86, 87], [88, 88, undefined, {0: R}],
  [89, 91], [92, 93, undefined, {1: Y}], [94, 95, undefined, {1: Y}], [99, 101], [102, 105],
  [106, 107], [108, 110], [111, 113, undefined, {2: Y}], [114, 114], [115, 115], [116, 117, undefined, {1: Y}],
  [118, 119], [120, 122], [123, 125], [126, 127], [128, 130, undefined, {2: G}],
  [131, 131, undefined, {0: Y}], [132, 134], [135, 136], [137, 138], [139, 141, undefined, {2: Y}], [142, 144, undefined, {0: Y}], [145, 147, undefined, {2: Y}],
  [157, 159], [160, 162], [163, 164], [165, 166, undefined, {1: R}], [167, 168], [169, 171, undefined, {0: Y}],
];

const T = {S1: 0, VOTE: 6.6, S3: 15.5, S4: 23.1, S5: 29.3, S6: 33.5, S7: 39.0, S8: 45.1, S9: 49.8, S10: 53.0, S11: 61.0, S12: 68.0, POLL: 76.8};
const capY = (s: number) =>
  s < T.VOTE ? 1720 : s < T.S3 ? 1720 : s < T.S4 ? 1720 : s < T.S5 ? 470 : s < T.S6 ? 470 : s < T.S7 ? 1720 :
  s < T.S8 ? 1720 : s < T.S9 ? 1720 : s < T.S10 ? 1720 : s < T.S11 ? 470 : s < T.S12 ? 470 : 470;
const Captions = makeCaptions(W, CHUNKS, capY);

const Big: React.FC<{at: number; top: number; size: number; color: string; children: React.ReactNode; stroke?: number}> = ({at, top, size, color, children, stroke = 18}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return <div style={{position: 'absolute', top, left: 0, right: 0, textAlign: 'center', fontWeight: 700, fontSize: size, lineHeight: 1, color, ...strokeText(stroke), transform: `scale(${pop(f, at, 9)})`}}>{children}</div>;
};

const Tag: React.FC<{at: number; x: number; y: number; bg: string; children: React.ReactNode; r?: number; size?: number}> = ({at, x, y, bg, children, r = 0, size = 52}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return <div style={{position: 'absolute', left: x, top: y, transform: `scale(${pop(f, at, 10)}) rotate(${r}deg)`, background: bg, border: `6px solid ${C.ink}`, borderRadius: 18, padding: '6px 24px', fontSize: size, fontWeight: 700, color: '#fff', ...strokeText(6), whiteSpace: 'nowrap'}}>{children}</div>;
};

export const Ep07: React.FC = () => {
  const f = useCurrentFrame();
  const B = (seed: number) => blinking(f, seed);
  const F = (k: keyof typeof T) => sec(T[k]);
  const END = EP07_DURATION;

  // HUD: dia 7 → 8 · R$ 148 → 108 (investimento) → 218 (vendas) · 24 → 23 dias · meta R$ 69 (fica amarela ao bater)
  const inv = t(55);
  const guardado = f < t(150) ? countUp(f, inv, inv + 20, 148, 108) : countUp(f, t(150), t(150) + 30, 108, 218);
  const day8 = f >= F('S9');
  const hud = {dia: day8 ? 8 : 7, guardado, despejo: day8 ? 23 : 24, meta: 69, metaAlert: f < t(152), despejoAlert: f >= t(41) && f < t(47), guardadoShakeAt: inv};

  return (
    <AbsoluteFill style={{background: C.ink, fontFamily: FONT}}>
      <Audio src={staticFile('ep07/mix.wav')} />

      {/* 1 — meia-noite: 55 na pia, freezer só cabe 20 */}
      <Scene from={F('S1')} to={F('VOTE')} zoom={0.07} pan={[0, -30]}>
        <Punch at={[t(1), t(10)]}>
          <Par depth={0.6}><KitchenNight dim={0.15} /></Par>
          <At x={600} y={700 + (1 - pop(f, t(7), 12)) * 300}><Freezer cap={20} filled={20} w={420} /></At>
          <div style={{position: 'absolute', left: 30, top: 920, width: 560}}><GeladinhoRow n={35} w={34} melting={f >= t(10)} /></div>
          <Big at={t(10) + 4} top={1290} size={96} color={C.red}>CABE 20</Big>
        </Punch>
      </Scene>

      {/* 2 — "Dessa vez foi acirrado... mas a opção A ganhou." */}
      <Scene from={F('VOTE')} to={F('S3')} zoom={0.05} pan={[0, -24]}>
        <VoteRecap07 />
      </Scene>

      {/* 3 — recap: despejo */}
      <Scene from={F('S3')} to={F('S4')} zoom={0.05} pan={[-30, 0]}>
        <Par depth={0.6}><EvictionDoor stampAt={t(45)} /></Par>
        <At x={640} y={1180}><Rafa width={460} expr="determined" blink={B(2)} look={[-0.6, -0.4]} /></At>
      </Scene>

      {/* 4 — Ver-o-Peso: gastou R$ 40 (polpa, leite, saquinho) */}
      <Scene from={F('S4')} to={F('S5')} zoom={0.06} pan={[40, -10]}>
        <Punch at={[inv]}>
          <Par depth={0.5}><VerOPeso sky="day" /></Par>
          <At x={10} y={1010 + bob(f, 3, 4)}><Rafa width={420} expr="determined" blink={B(3)} look={[0.8, 0]} /></At>
          <At x={440} y={1100} s={pop(f, t(59), 10)} r={-5}><PolpaSack w={230} /></At>
          <At x={690} y={1170} s={pop(f, t(62), 10)}><Acai w={200} /></At>
          <At x={460} y={1440} s={pop(f, t(64), 10)}><MilkBox w={110} /></At>
          <At x={640} y={1420} s={pop(f, t(65) + 4, 10)}><BagsPack w={150} /></At>
          <Tag at={inv} x={330} y={600} bg={C.redPill} size={50}>INVESTIMENTO −R$ 40</Tag>
        </Punch>
      </Scene>

      {/* 5 — a mãe chega cansada e ajuda a encher */}
      <Scene from={F('S5')} to={F('S6')} zoom={0.05} pan={[0, -20]}>
        <KitchenNight />
        <At x={40} y={830 + bob(f, 1, 4)}><Mae width={460} expr={f >= t(73) ? 'happy' : 'neutral'} blink={B(4)} look={[0.6, 0.3]} /></At>
        <At x={580} y={850 + bob(f, 2, 5)}><Rafa width={440} expr="happy" blink={B(5)} look={[-0.6, 0.3]} /></At>
        <TableFront />
        <div style={{position: 'absolute', left: 120, top: 1250, width: 840}}><GeladinhoRow n={Math.max(0, countUp(f, t(73), F('S6') - 4, 0, 18))} w={30} /></div>
        <Tag at={t(77)} x={760} y={1150} bg={C.greenDark} size={44}>{countUp(f, t(73), F('S6') - 4, 0, 55)}/55</Tag>
      </Scene>

      {/* 6 — o freezer: 35 sem lugar, derretendo */}
      <Scene from={F('S6')} to={F('S7')} zoom={0.08} pan={[0, -30]}>
        <Punch at={[t(84), t(88)]}>
          <Par depth={0.6}><KitchenNight dim={0.3} /></Par>
          <At x={560} y={560}><Freezer cap={20} filled={20} w={440} /></At>
          <div style={{position: 'absolute', left: 30, top: 820, width: 520}}><GeladinhoRow n={35} w={34} melting /></div>
          <Big at={t(84)} top={1330} size={150} color={C.red}>35</Big>
          <Big at={t(88)} top={1480} size={90} color="#fff">DERRETENDO</Big>
          <At x={620} y={1250 + Math.sin(f) * 2}><Rafa width={380} expr="worried" blink={B(6)} look={[-0.7, 0]} /></At>
        </Punch>
      </Scene>

      {/* 7 — os peixeiros: gelo com sal */}
      <Scene from={F('S7')} to={F('S8')} zoom={0.05} pan={[0, -24]}>
        <Punch at={[t(96), t(98)]}>
          <Sunburst color="#2E7D87" ray="#3A8F99" spin={0.25} />
          <At x={330} y={470} s={pop(f, t(93), 10)}><Fish w={420} /></At>
          {f >= t(96) && (
            <div style={{position: 'absolute', top: 760, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40}}>
              <div style={{transform: `scale(${pop(f, t(96), 10)})`}}><Ice w={220} /></div>
              <div style={{fontSize: 140, fontWeight: 700, color: '#fff', ...strokeText(16), transform: `scale(${pop(f, t(97), 10)})`}}>+</div>
              <div style={{transform: `scale(${pop(f, t(98), 10)})`}}><SaltShaker w={160} /></div>
            </div>
          )}
          <Big at={t(102)} top={1110} size={84} color={C.yellow}>GELADO A MANHÃ INTEIRA</Big>
          <Sparkles at={t(98)} x={540} y={900} />
          <At x={90} y={1300}><Rafa width={900} expr="happy" blink={B(7)} look={[0, -0.8]} /></At>
          {f >= t(89) && <div style={{position: 'absolute', left: 760, top: 1180, fontSize: 200, fontWeight: 700, color: C.yellow, ...strokeText(16), transform: `scale(${pop(f, t(89), 8)})`}}>!</div>}
        </Punch>
        <Flash at={t(89)} max={0.6} />
      </Scene>

      {/* 8 — enche a caixa térmica: gelo, sal, geladinho */}
      <Scene from={F('S8')} to={F('S9')} zoom={0.06} pan={[0, -20]}>
        <Planks color="#8E5E36" seam="#6E4526" vertical={false} />
        <At x={190} y={760}><CoolerOpen w={700} ice={ramp(f, t(114), t(114) + 8)} salt={f >= t(115)} gel={ramp(f, t(116), t(117) + 6)} /></At>
        <Tag at={t(114)} x={120} y={520} bg="#3C86D6">GELO</Tag>
        <Tag at={t(115)} x={420} y={500} bg="#8A8F98" r={-4}>SAL</Tag>
        <Tag at={t(116)} x={650} y={520} bg={C.greenDark} r={4}>GELADINHO</Tag>
        <At x={560} y={1320}><Rafa width={420} expr="determined" blink={B(8)} look={[-0.6, -0.4]} /></At>
      </Scene>

      {/* 9 — de manhã: abre a tampa... tudo durinho */}
      <Scene from={F('S9')} to={F('S10')} zoom={0.07} pan={[0, -30]}>
        <Punch at={[t(128)]}>
          <Planks color="#B98552" seam="#8E5E36" vertical={false} />
          <AbsoluteFill style={{background: 'radial-gradient(circle at 70% 10%, rgba(255,236,170,0.55), transparent 55%)'}} />
          <At x={190} y={760}><CoolerOpen w={700} salt frost={ramp(f, t(128), t(128) + 10)} /></At>
          <Big at={t(128)} top={500} size={110} color={C.green}>TUDO DURINHO!</Big>
          <Sparkles at={t(128)} x={540} y={980} n={18} color="#fff" />
          <At x={560} y={1320}><Rafa width={420} expr={f >= t(128) ? 'happy' : 'worried'} blink={B(9)} look={[-0.6, -0.4]} /></At>
          {f < t(128) && <Tag at={F('S9')} x={330} y={480} bg={C.ink} size={56}>DIA 7 → DIA 8</Tag>}
        </Punch>
      </Scene>

      {/* 10 — meio-dia, saída do colégio: fila; cupuaçu e açaí esgotam */}
      <Scene from={F('S10')} to={F('S11')} zoom={0.06} pan={[-40, -10]}>
        <Punch at={[t(139), t(142), t(145)]}>
          <Par depth={0.5}><SchoolGate open={1} /></Par>
          <At x={20} y={1000 + bob(f, 4, 4)}><Rafa width={400} expr="happy" blink={B(10)} look={[0.8, 0]} /></At>
          <At x={60} y={1500}><CoolerOpen w={330} /></At>
          {[[Kaua, 420, 0], [Duda, 580, 1], [Biel, 740, 2], ['p1', 880, 3], ['p2', 1000, 4]].map(([P, x, i]: any) => {
            const appear = t(139) + i * 3;
            if (f < appear) return null;
            const qx = x - Math.min(80, (f - appear) * 1.2);
            const Comp = typeof P === 'string' ? null : P;
            return (
              <At key={i} x={qx} y={1060 + (i % 2) * 20 + Math.abs(Math.sin((f + i * 9) / 5)) * -10}>
                {Comp ? <Comp width={220} expr="happy" blink={B(11 + i)} look={[-0.6, 0]} /> : <Person width={220} skin={i === 3 ? '#9A5C36' : '#6E3F22'} hair={i === 3 ? 'puffs' : 'short'} shirt={i === 3 ? '#F0A04B' : '#5BB0D9'} expr="happy" blink={B(11 + i)} look={[-0.6, 0]} />}
              </At>
            );
          })}
          <Tag at={t(142)} x={100} y={640} bg="#B8864B" r={-5}>CUPUAÇU: ESGOTADO</Tag>
          <Tag at={t(145)} x={260} y={780} bg="#7B3F8C" r={4}>AÇAÍ: ESGOTADO</Tag>
        </Punch>
      </Scene>

      {/* 11 — vitória: 55 geladinhos, R$ 110, primeiro dia acima da meta */}
      <Scene from={F('S11')} to={F('S12')} zoom={0.06} pan={[0, -24]}>
        <Punch at={[t(148), t(150), t(152)]}>
          <Sunburst color="#1F8A4C" ray="#26A05A" spin={0.35} />
          <Big at={t(148)} top={480} size={130} color="#fff">{countUp(f, t(148), t(148) + 20, 0, 55)} GELADINHOS</Big>
          <Big at={t(150)} top={640} size={270} color={C.green} stroke={24}>R$ {countUp(f, t(150), t(150) + 24, 0, 110)}</Big>
          <Big at={t(152)} top={960} size={92} color={C.yellow}>1º DIA ACIMA DA META!</Big>
          <Sparkles at={t(152)} x={540} y={1000} n={20} />
          <CoinRain from={t(150)} to={t(156)} n={18} />
          <At x={90} y={1250}><Rafa width={900} expr="happy" blink={B(12)} look={[0, -0.8]} /></At>
        </Punch>
        <Flash at={t(152)} max={0.5} />
      </Scene>

      {/* 12 — a senhora: "Menino... esse ponto aqui é meu." */}
      <Scene from={F('S12')} to={F('POLL')} zoom={0.09} pan={[30, -30]}>
        <Punch at={[t(167), t(173)]}>
          <Par depth={0.5}><SchoolGate open={1} /></Par>
          <AbsoluteFill style={{background: `rgba(20,10,40,${ramp(f, t(163), t(167), 0, 0.28)})`}} />
          <At x={80} y={1440}><CoolerOpen w={360} empty /></At>
          <At x={60} y={960 + shake(f, t(167), 12, 10)}><Rafa width={460} expr={f >= t(167) ? 'surprised' : 'happy'} blink={f < t(163) && B(13)} look={f >= t(165) ? [0.9, -0.2] : [0, 0.6]} /></At>
          {f >= t(167) && <At x={560} y={820 + (1 - pop(f, t(167), 12)) * 300}><SenhoraGeladinho width={520} expr="serious" blink={B(14)} look={[-0.8, 0.1]} /></At>}
          {f >= t(172) && <Balloon text={<>MENINO...<br />ESSE PONTO AQUI <span style={{color: C.redPill}}>É MEU.</span></>} at={t(172)} x={300} y={460} w={720} tail="right" size={60} />}
        </Punch>
      </Scene>

      {/* 13 — voto */}
      {f >= F('POLL') && (
        <>
          <Scene from={F('POLL')} to={END} zoom={0.06} pan={[0, -20]}>
            <SchoolGate open={1} />
            <At x={60} y={960}><Rafa width={460} expr="worried" blink={B(15)} look={[0.9, -0.2]} /></At>
            <At x={560} y={820}><SenhoraGeladinho width={520} expr="serious" blink={B(16)} look={[-0.8, 0.1]} /></At>
          </Scene>
          <Poll parte={8} a="OUTRO PONTO, LONGE DA ESCOLA" b={"FICA E VENDE A R$\u00a01,50"} at={t(178)} aAt={t(182)} bAt={t(194)} voteAt={t(207)} />
        </>
      )}

      {/* overlays globais */}
      {f >= F('S3') && f < F('POLL') && <Hud s={hud} enterAt={F('S3')} />}
      {f >= t(152) && f < t(152) + 26 && <Sparkles at={t(152)} x={540} y={365} n={12} spread={220} />}
      <Captions />
      <TitleCard parte={7} big="55 GELADINHOS" bigColor={C.yellow} l2="E O FREEZER" l3="SÓ CABIA 20" l3Color={C.red} out={sec(4.6)} bigSize={148} />
    </AbsoluteFill>
  );
};

/** "Dessa vez foi acirrado... mas a opção A ganhou." → cabo de guerra A × B, A vence por pouco */
const VoteRecap07: React.FC = () => {
  const f = useCurrentFrame();
  const won = t(20);
  const share = f < won ? 0.5 + 0.05 * Math.sin((f - t(13)) / 3.2) : 0.5 + ramp(f, won, won + 10, 0, 0.08);
  return (
    <AbsoluteFill>
      <Sunburst color="#4B3A8C" ray="#56459A" spin={0.2} />
      <Punch at={[t(16), won]}>
        <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${pop(f, t(13), 12)}) translateX(${shake(f, t(16), 14, 10)}px)`}}>
          <div style={{background: C.yellow, color: C.ink, border: `7px solid ${C.ink}`, borderRadius: 50, padding: '6px 44px', fontSize: 80, fontWeight: 700}}>FOI ACIRRADO!</div>
        </div>
        {f >= t(13) + 6 && (
          <div style={{position: 'absolute', top: 580, left: 90, width: 900, height: 120, border: `8px solid ${C.ink}`, borderRadius: 60, overflow: 'hidden', display: 'flex', transform: `scale(${pop(f, t(13) + 6, 12)})`}}>
            <div style={{width: `${share * 100}%`, background: C.orange, display: 'flex', alignItems: 'center', paddingLeft: 30, fontSize: 70, fontWeight: 700, color: '#fff', ...strokeText(8)}}>A</div>
            <div style={{flex: 1, background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 30, fontSize: 70, fontWeight: 700, color: '#fff', ...strokeText(8)}}>B</div>
          </div>
        )}
        {f >= won && (
          <div style={{position: 'absolute', top: 760, left: 100, transform: `scale(${pop(f, won, 10)})`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 30, background: C.cream, border: `8px solid ${C.ink}`, borderRadius: 34, padding: '26px 40px', width: 880, boxSizing: 'border-box', fontWeight: 700}}>
              <div style={{width: 120, height: 120, flex: 'none', borderRadius: 60, background: C.orange, border: `7px solid ${C.ink}`, color: '#fff', fontSize: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', ...strokeText(10)}}>A</div>
              <div style={{fontSize: 62, lineHeight: 1.05, color: C.ink, textAlign: 'center', flex: 1}}>LARGA AS ENTREGAS<br />E APOSTA TUDO</div>
            </div>
            {f >= won + 6 && <div style={{position: 'absolute', right: -30, top: -50, width: 130, height: 130, borderRadius: 65, background: '#2DA44E', border: `8px solid ${C.ink}`, color: '#fff', fontSize: 90, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(f, won + 6, 8)})`}}>✓</div>}
          </div>
        )}
        <Sparkles at={won} x={540} y={640} n={16} />
        {f >= t(24) && <At x={280} y={1120 + (1 - pop(f, t(24), 12)) * 600}><Rafa width={520} expr="determined" blink={blinking(f, 3)} look={[0, -0.3]} /></At>}
      </Punch>
      <Flash at={won} max={0.55} />
    </AbsoluteFill>
  );
};
