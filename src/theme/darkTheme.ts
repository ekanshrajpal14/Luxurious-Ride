import { Theme } from './types';
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E4C97E';
const GOLD_DIM = 'rgba(201,168,76,0.15)';
const GOLD_BORDER = 'rgba(201,168,76,0.35)';
const darkTheme: Theme = {
  mode: 'dark',
  background: '#121212',
  text: '#FFFFFF',
  subText: '#b3b3b3',
  card: '#1E1E1E',
  border: '#2C2C2C',
  primary: '#0284c5',
  grey: '#a1a4a8',
  link: '#5aafff',
  inputBg: '#5e5e5e6c',
  socialBtn: '#ffffffc2',
  gold: GOLD,
  goldLight: GOLD_LIGHT,
  goldDim: GOLD_DIM,
  goldBorder: GOLD_BORDER,
  statusBar: 'light-content',
  ctaText: '#0D0D0F', // always dark on gold button
};

export default darkTheme;