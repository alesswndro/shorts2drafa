import React from 'react';
import {Composition} from 'remotion';
import {CastTest} from './CastTest';
import {Ep05, EP05_DURATION} from './ep05/Ep05';
export const Root: React.FC = () => (
  <>
    <Composition id="EP05" component={Ep05} durationInFrames={EP05_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="CastTest" component={CastTest} durationInFrames={1} fps={30} width={1080} height={1920} />
  </>
);
