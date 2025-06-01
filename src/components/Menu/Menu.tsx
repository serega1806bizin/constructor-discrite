import styles from './Menu.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DispatchContext } from '../../Store/Store';
import { Navbar } from '../../enums/Navbar';

// Функция для установки класса активной ссылки
const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.menu__navLink, {
    [styles['is-active']]: isActive,
  });

// Объект с переводами для навигационных ссылок
const navLabels: Record<string, string> = {
  [Navbar.task]: 'роботи',
  [Navbar.create]: 'Створити роботу',
};

export const Menu = () => {
  const dispatch = useContext(DispatchContext);

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__nav}>
        <ul className={styles.menu__navList}>
          {Object.values(Navbar).map(page => (
            <li className={styles.menu__navItem} key={page}>
              <NavLink
                to={page}
                className={getNavLinkClass}
                onClick={() => dispatch({ type: 'closeMenu' })}
              >
                {navLabels[page] || page}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
