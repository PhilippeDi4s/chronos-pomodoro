import { Link } from 'react-router';
import style from './styles.module.css';


export function Footer() {
  return (
  <footer className={style.footer}>
    <Link to="/about-pomodoro">Entenda como funciona a técnica de pomodoro</Link>
    <a href="#">Chronos Pomodoro &copy; {new Date().getFullYear()}</a>
  </footer>
);
}
