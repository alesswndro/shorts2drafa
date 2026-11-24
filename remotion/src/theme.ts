import '@fontsource/oswald/500.css';
import '@fontsource/oswald/700.css';
import '@fontsource/caveat/700.css';

export const C = {
  ink: '#1E1B26',
  yellow: '#F5C431',
  red: '#FF5A5F',
  redPill: '#D93A3F',
  green: '#5BE08A',
  greenDark: '#1F8A4C',
  teal: '#2E7D87',
  purple: '#6B4FBF',
  cream: '#F6F1E7',
  white: '#FFFFFF',
  orange: '#F08A2C',
  skin: '#8B5432',
  skinMae: '#7A4628',
  cheek: '#C9705F',
};

export const FONT = 'Oswald, sans-serif';
export const HAND = 'Caveat, cursive';
export const FPS = 30;

// texto com contorno escuro grosso (padrão das legendas da série)
export const strokeText = (px: number) => ({
  WebkitTextStroke: `${px}px ${C.ink}`,
  paintOrder: 'stroke fill' as const,
});
