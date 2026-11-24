import {interpolate, spring, Easing} from 'remotion';
import {FPS} from '../theme';

export const sec = (s: number) => Math.round(s * FPS);

/** 0→1 com overshoot, começando em `at` (frame) */
export const pop = (frame: number, at: number, damping = 11) =>
  spring({frame: frame - at, fps: FPS, config: {damping, stiffness: 170, mass: 0.6}});

export const ramp = (frame: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(frame, [a, b], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

/** respiração/bob contínuo */
export const bob = (frame: number, seed = 0, amp = 6, period = 34) =>
  Math.sin((frame + seed * 13) / (period / (2 * Math.PI))) * amp;

/** piscar: true por 4 frames a cada ~2,7 s (deslocado pela seed) */
export const blinking = (frame: number, seed = 0) => {
  const p = 80 + (seed % 3) * 9;
  return (frame + seed * 29) % p < 4;
};

/** tremor (impacto) que decai */
export const shake = (frame: number, at: number, dur = 10, amp = 14) => {
  const t = frame - at;
  if (t < 0 || t > dur) return 0;
  return Math.sin(t * 2.6) * amp * (1 - t / dur);
};
