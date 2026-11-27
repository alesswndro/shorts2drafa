import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {TitleCard} from '../components/ui';
import {KitchenNight} from '../components/sets';
import {Freezer} from '../components/sets3';
import {Rafa, SenhoraGeladinho, Biel} from '../components/Person';

/** Capa do EP09 — 9:16 e 3:4. Still no frame 40. */
export const CoverEp09: React.FC<{h: number}> = ({h}) => {
  const tall = h >= 1920;
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden'}}>
      <AbsoluteFill style={{top: tall ? 0 : -330, height: 1920}}>
        <KitchenNight dim={0.05} />
        <div style={{position: 'absolute', left: 330, top: 800}}><Freezer cap={30} filled={30} w={420} /></div>
        <div style={{position: 'absolute', left: -10, top: 1080}}><Rafa width={420} expr="happy" look={[0.8, 0]} /></div>
        <div style={{position: 'absolute', left: 700, top: 1000}}><SenhoraGeladinho width={400} expr="happy" look={[-0.8, 0]} /></div>
        <div style={{position: 'absolute', left: 420, top: 1350}}><Biel width={300} expr="sad" look={[0, 0.6]} /></div>
      </AbsoluteFill>
      <AbsoluteFill style={{transform: tall ? 'none' : 'scale(0.86)', transformOrigin: 'top center', top: tall ? 0 : -60}}>
        <TitleCard parte={9} big="200 GELADINHOS" bigColor={C.yellow} l2="POR DIA" l3="E UM PROBLEMA" l3Color={C.red} out={100000} bigSize={140} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
