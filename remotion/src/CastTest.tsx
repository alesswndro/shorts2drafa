import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Rafa, Mae, Kaua, Biel, Duda, Bike} from './components/Person';
import {C, FONT} from './theme';
export const CastTest: React.FC = () => (
  <AbsoluteFill style={{background: C.cream, flexWrap: 'wrap', flexDirection: 'row', padding: 30, gap: 10, fontFamily: FONT}}>
    {[
      ['RAFA', <Rafa expr="worried" look={[0.5, 0]} />],
      ['MÃE', <Mae expr="serious" />],
      ['MÃE fone', <Mae expr="surprised" holdPhone />],
      ['KAUÃ', <Kaua expr="sad" />],
      ['BIEL', <Biel expr="happy" />],
      ['DUDA', <Duda expr="neutral" look={[-0.6, 0]} />],
    ].map(([n, el]: any) => (
      <div key={n} style={{width: 330, textAlign: 'center', fontSize: 40, fontWeight: 700}}>
        {React.cloneElement(el, {width: 300})}
        <div>{n}</div>
      </div>
    ))}
    <Bike width={400} />
  </AbsoluteFill>
);
