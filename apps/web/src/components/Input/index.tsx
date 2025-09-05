/**
 * Reusable input component with consistent styling and validation
 */
import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from './styles.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const classes = [styles.input, error && styles.error, className].filter(Boolean).join(' ');

    return (
      <div className={styles.inputGroup}>
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input ref={ref} className={classes} {...props} />
        {error && <span className={styles.errorText}>{error}</span>}
        {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
