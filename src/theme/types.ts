export interface Theme {
  mode: 'light' | 'dark';
  background: string;
  text: string;
  subText: string;
  card: string;
  border: string;
  primary: string;
  grey: string;
  link: string;
  inputBg: string;
  socialBtn: string;
  gold: string;
  goldLight: string;
  goldDim: string;
  goldBorder: string;
  statusBar: 'light-content' | 'dark-content';
  ctaText: string; // always dark on gold button
}
