/**
 * Reusable card component for content sections
 */
import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  const classes = [styles.card, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
