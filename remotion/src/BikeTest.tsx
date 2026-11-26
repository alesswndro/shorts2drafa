import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RafaRiding} from './components/BikeRide';
import {RoadRush} from './components/sets2';
export const BikeTest: React.FC = () => (
  <AbsoluteFill>
    <RoadRush speed={0} />
    <div style={{position: 'absolute', left: 120, top: 1000}}><RafaRiding width={820} expr="determined" sweat /></div>
    <div style={{position: 'absolute', left: 60, top: 250}}><RafaRiding width={420} expr="worried" cooler={false} /></div>
    <div style={{position: 'absolute', left: 560, top: 250}}><RafaRiding width={420} expr="happy" /></div>
  </AbsoluteFill>
);
