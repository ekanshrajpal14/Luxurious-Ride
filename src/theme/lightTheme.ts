import { Theme } from './types';
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E4C97E';
const GOLD_DIM = 'rgba(201,168,76,0.15)';
const GOLD_BORDER = 'rgba(201,168,76,0.35)';
const lighTheme: Theme = {
  mode: 'light',
  background: '#FFFFFF',
  text: '#000000',
  subText: '#656565',
  card: '#F7F7F7',
  border: '#E5E5E5',
  primary: '#0284c5',
  grey: '#656E7B',
  link: '#5aafff',
  inputBg: '#f2f2f2',
  socialBtn: '#f1f1f1',
  gold: GOLD,
  goldLight: GOLD_LIGHT,
  goldDim: GOLD_DIM,
  goldBorder: GOLD_BORDER,
  statusBar: "dark-content",
  ctaText: '#0D0D0F', // always dark on gold button
};

export default lighTheme;
