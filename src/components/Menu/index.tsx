import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import style from './styles.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

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
      <Link
        className={style.menuLink}
        to='/'
        arial-label='Ir para home'
        title='Ir para home'
      >
        <HouseIcon />
      </Link>
      <a
        className={style.menuLink}
        href='#'
        arial-label='Ver histórico'
        title='Ver histórico'
      >
        <HistoryIcon />
      </a>
      <a
        className={style.menuLink}
        href='#'
        arial-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </a>
      <a
        className={style.menuLink}
        href='#'
        arial-label='mudar tema'
        title='musar tema'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </div>
  );
}
