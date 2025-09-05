/**
 * Application header with navigation and user actions
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LinkIcon, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button';
import styles from './styles.module.css';

const Header: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <LinkIcon size={24} />
          <span>tiny.url</span>
        </Link>

        <nav className={styles.nav}>
          {isLoggedIn ? (
            <div className={styles.userSection}>
              <Link to="/dashboard" className={styles.userInfo}>
                <User size={18} />
                <span>{user?.userName}</span>
              </Link>
              <Button
                variant="secondary"
                size="small"
                onClick={handleLogout}
                className={styles.logoutBtn}
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login">
                <Button variant="secondary" size="small">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="small">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
