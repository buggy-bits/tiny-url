/**
 * Registration page component with comprehensive form validation
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LinkIcon } from 'lucide-react';
import { authService } from '../../services/api/authService';
import { validateEmail, validatePassword, validateRequired } from '../../utils/validators';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './styles.module.css';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: '',
    avatarUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

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
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!validateRequired(formData.firstName)) {
      newErrors.firstName = 'First name is required';
    }

    if (!validateRequired(formData.lastName)) {
      newErrors.lastName = 'Last name is required';
    }

    if (!validateRequired(formData.userName)) {
      newErrors.userName = 'Username is required';
    }

    if (!validateRequired(formData.avatarUrl)) {
      newErrors.avatarUrl = 'Avatar URL is required';
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
      await authService.register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.registerPage}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <Card className={styles.successCard}>
              <div className={styles.successContent}>
                <LinkIcon size={48} />
                <h2>Registration Successful!</h2>
                <p>Your account has been created successfully. Redirecting to login page...</p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.registerPage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <Card className={styles.registerCard}>
            <div className={styles.logoSection}>
              <LinkIcon size={32} />
              <h1>Create Account</h1>
              <p>Join tiny.url and start shortening URLs today</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {apiError && <div className={styles.errorAlert}>{apiError}</div>}

              <div className={styles.nameFields}>
                <Input
                  type="text"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  required
                />

                <Input
                  type="text"
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
                />
              </div>

              <Input
                type="text"
                name="userName"
                label="Username"
                placeholder="Choose a username"
                value={formData.userName}
                onChange={handleChange}
                error={errors.userName}
                required
              />

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
                placeholder="Create a password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                helperText="Minimum 6 characters required"
                required
              />

              <Input
                type="url"
                name="avatarUrl"
                label="Avatar URL"
                placeholder="Enter your avatar image URL"
                value={formData.avatarUrl}
                onChange={handleChange}
                error={errors.avatarUrl}
                helperText="Link to your profile image"
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={loading}
                className={styles.submitBtn}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className={styles.footer}>
              <p>
                Already have an account?{' '}
                <Link to="/login" className={styles.link}>
                  Sign in here
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
