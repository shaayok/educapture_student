
import React from 'react';
import styles from './Header.module.css';
import { FiMenu, FiLogOut } from 'react-icons/fi';

const Header = ({ onLogout, onMenuClick }) => {
  const handleMenuClick = () => {
    window.dispatchEvent(new Event('toggleSidebar'));
    if (onMenuClick) onMenuClick();
  };

  return (
    <header className={styles.header} style={{fontFamily: 'var(--font-base)'}}>
      <div
        className={styles.leftSection}
        onClick={() => window.location.reload()}
        aria-label="Home"
      >
      <img src="/logo192.png"
          alt="Educapture Logo"
          className={styles.logo}
          aria-label="Educapture Logo"
          role="img"
        />
      </div>

      {/* hamburger on right (mobile only) */}
      <button
        className={styles.menuBtn}
        onClick={handleMenuClick}
        aria-label="Toggle menu"
      >
        <FiMenu size={24} />
      </button>

      {/* logout on right (desktop only) */}
      <button className={styles.logoutDesktop} onClick={onLogout}>
        <FiLogOut size={18} style={{ marginRight: 8 }} />
        Uitloggen
      </button>
    </header>
  );
};

export default Header;
