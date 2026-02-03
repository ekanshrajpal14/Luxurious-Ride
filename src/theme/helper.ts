import { useAppSelector } from '../hooks/useAppSelector';
import darkTheme from './darkTheme';
import lighTheme from './lightTheme';
import { Theme } from './types';

export const getTheme = (): Theme => {
  const mode = useAppSelector(state => state.theme.mode);
  return mode === 'dark' ? darkTheme : lighTheme;
  
};
