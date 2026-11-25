import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {Mae} from '../components/Person';
import {TitleCard, ClockPill} from '../components/ui';
import {WorkKitchen} from '../components/sets';

/** Capa do EP05 — 9:16 (1080x1920) e 3:4 (1080x1440). Renderizar no frame 40 (animações completas). */
export const CoverEp05: React.FC<{h: number}> = ({h}) => {
  const tall = h >= 1920;
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden'}}>
      <AbsoluteFill style={{top: tall ? 0 : -330, height: 1920}}>
        <WorkKitchen />
        <div style={{position: 'absolute', left: 230, top: 900}}><Mae width={620} expr="surprised" holdPhone look={[0.7, -0.3]} /></div>
        <ClockPill text="7:40" x={650} y={1560} size={70} />
      </AbsoluteFill>
      <AbsoluteFill style={{transform: tall ? 'none' : 'scale(0.86)', transformOrigin: 'top center', top: tall ? 0 : -60}}>
        <TitleCard parte={5} big="R$ 215" bigColor={C.red} l2="DE ATRASO" l3="E ELE NEM SABIA" l3Color={C.yellow} out={100000} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
