/**
 * Login page component with form validation and error handling
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LinkIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api/authService';
import { validateEmail, validateRequired } from '../../utils/validators';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './styles.module.css';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setApiError('');

    try {
      const response = await authService.login(formData);
      login(response.user, response.accessToken, response.refreshToken);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <Card className={styles.loginCard}>
            <div className={styles.logoSection}>
              <LinkIcon size={32} />
              <h1>Welcome Back</h1>
              <p>Sign in to your tiny.url account</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {apiError && <div className={styles.errorAlert}>{apiError}</div>}

              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={loading}
                className={styles.submitBtn}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className={styles.footer}>
              <p>
                Don't have an account?{' '}
                <Link to="/register" className={styles.link}>
                  Sign up here
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
