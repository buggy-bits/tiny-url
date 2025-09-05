/**
 * Home page component with hero section and call-to-action
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { LinkIcon, Zap, Shield, BarChart3 } from 'lucide-react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Card from '../../components/Card';
import styles from './styles.module.css';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Lightning Fast',
      description: 'Shorten your URLs instantly with our optimized infrastructure.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure & Reliable',
      description: 'Your links are protected with enterprise-grade security.',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analytics Ready',
      description: 'Track and analyze your shortened URLs performance.',
    },
  ];

  return (
    <div className={styles.homePage}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.logoLarge}>
                <LinkIcon size={48} />
                <h1>tiny.url</h1>
              </div>

              <p className={styles.subtitle}>
                The modern URL shortener that makes sharing simple, secure, and smart.
              </p>

              <div className={styles.ctaButtons}>
                <Link to="/register">
                  <Button variant="primary" size="large">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" size="large">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.container}>
            <h2 className={styles.featuresTitle}>Why Choose tiny.url?</h2>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Card key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
