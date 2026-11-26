import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {TitleCard, ClockPill} from '../components/ui';
import {RoadRush, RafaBike} from '../components/sets2';

/** Capa do EP06 — 9:16 (1080x1920) e 3:4 (1080x1440). Still no frame 40. */
export const CoverEp06: React.FC<{h: number}> = ({h}) => {
  const tall = h >= 1920;
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden'}}>
      <AbsoluteFill style={{top: tall ? 0 : -330, height: 1920}}>
        <RoadRush speed={0} />
        <div style={{position: 'absolute', left: 150, top: 525}}><RafaBike width={780} expr="determined" sweat speed={0} /></div>
        <ClockPill text="6:52" x={700} y={1690} size={74} red />
      </AbsoluteFill>
      <AbsoluteFill style={{transform: tall ? 'none' : 'scale(0.86)', transformOrigin: 'top center', top: tall ? 0 : -60}}>
        <TitleCard parte={6} big="9 ENTREGAS" bigColor={C.green} l2="ANTES DAS 7" l3="SOZINHO" l3Color={C.yellow} out={100000} bigSize={205} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
