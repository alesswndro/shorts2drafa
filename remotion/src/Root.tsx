import React from 'react';
import {Composition} from 'remotion';
import {CastTest} from './CastTest';
import {BikeTest} from './BikeTest';
import {Ep05, EP05_DURATION} from './ep05/Ep05';
import {CoverEp05} from './ep05/Cover';
import {Ep06, EP06_DURATION} from './ep06/Ep06';
import {CoverEp06} from './ep06/Cover';
import {Ep07, EP07_DURATION} from './ep07/Ep07';
import {CoverEp07} from './ep07/Cover';
export const Root: React.FC = () => (
  <>
    <Composition id="EP05" component={Ep05} durationInFrames={EP05_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="EP05-capa-9x16" component={CoverEp05} defaultProps={{h: 1920}} durationInFrames={60} fps={30} width={1080} height={1920} />
    <Composition id="EP05-capa-3x4" component={CoverEp05} defaultProps={{h: 1440}} durationInFrames={60} fps={30} width={1080} height={1440} />
    <Composition id="EP06" component={Ep06} durationInFrames={EP06_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="EP06-capa-9x16" component={CoverEp06} defaultProps={{h: 1920}} durationInFrames={60} fps={30} width={1080} height={1920} />
    <Composition id="EP06-capa-3x4" component={CoverEp06} defaultProps={{h: 1440}} durationInFrames={60} fps={30} width={1080} height={1440} />
    <Composition id="EP07" component={Ep07} durationInFrames={EP07_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="EP07-capa-9x16" component={CoverEp07} defaultProps={{h: 1920}} durationInFrames={60} fps={30} width={1080} height={1920} />
    <Composition id="EP07-capa-3x4" component={CoverEp07} defaultProps={{h: 1440}} durationInFrames={60} fps={30} width={1080} height={1440} />
    <Composition id="BikeTest" component={BikeTest} durationInFrames={60} fps={30} width={1080} height={1920} />
    <Composition id="CastTest" component={CastTest} durationInFrames={1} fps={30} width={1080} height={1920} />
  </>
);
