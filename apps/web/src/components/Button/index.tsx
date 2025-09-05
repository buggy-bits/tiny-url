/**
 * Reusable button component with consistent styling
 */
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
};

export default Button;
