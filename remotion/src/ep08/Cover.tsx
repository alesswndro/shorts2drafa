import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, HAND} from '../theme';
import {TitleCard} from '../components/ui';
import {SchoolGate} from '../components/sets2';
import {CoolerOpen} from '../components/sets3';
import {Rafa, SenhoraGeladinho} from '../components/Person';

/** Capa do EP08 — 9:16 e 3:4. Still no frame 40. */
export const CoverEp08: React.FC<{h: number}> = ({h}) => {
  const tall = h >= 1920;
  const sign = (p: string, col: string, w: number) => (
    <div style={{width: w, background: '#D9B07A', border: `7px solid ${C.ink}`, borderRadius: 10, padding: '10px 0', textAlign: 'center', fontFamily: HAND, fontWeight: 700, fontSize: w * 0.34, color: col, lineHeight: 1}}>{p}</div>
  );
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden'}}>
      <AbsoluteFill style={{top: tall ? 0 : -330, height: 1920}}>
        <SchoolGate open={1} />
        <div style={{position: 'absolute', left: 10, top: 1020}}><Rafa width={460} expr="determined" look={[0.8, 0]} /></div>
        <div style={{position: 'absolute', left: 60, top: 940, transform: 'rotate(-6deg)'}}>{sign('R$ 1,50', C.greenDark, 300)}</div>
        <div style={{position: 'absolute', left: 600, top: 980}}><SenhoraGeladinho width={440} expr="serious" look={[-0.8, 0]} /></div>
        <div style={{position: 'absolute', left: 680, top: 860, transform: 'rotate(5deg)'}}>{sign('R$ 1', C.redPill, 260)}</div>
        <div style={{position: 'absolute', left: 40, top: 1560}}><CoolerOpen w={330} /></div>
      </AbsoluteFill>
      <AbsoluteFill style={{transform: tall ? 'none' : 'scale(0.86)', transformOrigin: 'top center', top: tall ? 0 : -60}}>
        <TitleCard parte={8} big="R$ 1,50" bigColor={C.green} l2="VENDEU MAIS" l3="E GANHOU MENOS" l3Color={C.red} out={100000} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
