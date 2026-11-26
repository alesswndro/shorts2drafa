import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {TitleCard} from '../components/ui';
import {KitchenNight} from '../components/sets';
import {Freezer, GeladinhoRow} from '../components/sets3';
import {Rafa} from '../components/Person';

/** Capa do EP07 — 9:16 e 3:4. Still no frame 40. */
export const CoverEp07: React.FC<{h: number}> = ({h}) => {
  const tall = h >= 1920;
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden'}}>
      <AbsoluteFill style={{top: tall ? 0 : -300, height: 1920}}>
        <KitchenNight dim={0.1} />
        <div style={{position: 'absolute', left: 590, top: 860}}><Freezer cap={20} filled={20} w={440} /></div>
        <div style={{position: 'absolute', left: 30, top: 1000, width: 540}}><GeladinhoRow n={35} w={34} melting /></div>
        <div style={{position: 'absolute', left: 300, top: 1430}}><Rafa width={480} expr="worried" look={[0.2, -0.6]} /></div>
      </AbsoluteFill>
      <AbsoluteFill style={{transform: tall ? 'none' : 'scale(0.86)', transformOrigin: 'top center', top: tall ? 0 : -60}}>
        <TitleCard parte={7} big="55 GELADINHOS" bigColor={C.yellow} l2="E O FREEZER" l3="SÓ CABIA 20" l3Color={C.red} out={100000} bigSize={148} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
