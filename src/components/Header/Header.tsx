import styles from './Header.module.scss';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../Store/Store';
import { Navbar } from '../../enums/Navbar';
import logo from '../../../public/img/physics.png';
import closeIcon from '../../../public/img/icons/close-icon.svg';
import menuIcon from '../../../public/img/icons/menu-icon.svg';
import { Button, message } from 'antd';

const getNavbarLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.header__navbarItem, {
    [styles['is-active']]: isActive,
  });

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { isMenuVisible } = useContext(StateContext);
  const [wasMenuOpen, setWasMenuOpen] = useState(isMenuVisible);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        if (isMenuVisible) {
          setWasMenuOpen(true);
          dispatch({ type: 'closeMenu' });
        }
      } else {
        if (wasMenuOpen) {
          dispatch({ type: 'openMenu' });
          setWasMenuOpen(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, isMenuVisible, wasMenuOpen]);

  const navLabels: Record<string, string> = {
    task: 'роботи',
    create: 'Створити роботу',
  };

  const handleLogout = () => {
    localStorage.removeItem('authData'); // или другой ключ, используемый для сессии
    message.success('Вихід з системи успішно виконано!');
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link to={'/task'} className={styles.header__logoLink}>
          <img src={logo} alt="Logo" className={styles.header__logo} />
        </Link>
        <div className={styles.header__navbar}>
          {Object.values(Navbar).map(page => (
            <NavLink to={page} className={getNavbarLinkClass} key={page}>
              {navLabels[page] || page}
            </NavLink>
          ))}
        </div>
        {location.pathname !== '/' && (
          <Button
            type="primary"
            danger
            onClick={handleLogout}
            size="small"
            style={{ marginLeft: 10 }}
          >
            Вихід із системи
          </Button>
        )}
      </div>

      <div className={styles.header__iconsContainer}>
        <button
          className={styles.header__menuButton}
          onClick={() =>
            isMenuVisible
              ? dispatch({ type: 'closeMenu' })
              : dispatch({ type: 'openMenu' })
          }
        >
          {isMenuVisible ? (
            <img
              src={closeIcon}
              className={styles.header__closeIcon}
              alt="Закрити меню"
            />
          ) : (
            <img
              src={menuIcon}
              className={styles.header__menuIcon}
              alt="Відкрити меню"
            />
          )}
        </button>
      </div>
    </header>
  );
};
