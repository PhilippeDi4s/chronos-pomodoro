import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import style from './styles.module.css';
import { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';

type AvailbleThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailbleThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvailbleThemes) || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={style.menu}>
      <RouterLink
        className={style.menuLink}
        href='/'
        arial-label='Ir para home'
        title='Ir para home'
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        className={style.menuLink}
        href='/history'
        arial-label='Ver histórico'
        title='Ver histórico'
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        className={style.menuLink}
        href='/settings'
        arial-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </RouterLink>
      <a
        className={style.menuLink}
        href='#'
        arial-label='mudar tema'
        title='mudar tema'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </div>
  );
}
