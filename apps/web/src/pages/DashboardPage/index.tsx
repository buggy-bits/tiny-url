/**
 * Dashboard page component for authenticated users with URL management
 */
import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, Plus, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { urlService, ShortUrl } from '../../services/api/urlService';
import { validateUrl, validateRequired } from '../../utils/validators';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './styles.module.css';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [longUrl, setLongUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingUrls, setFetchingUrls] = useState(true);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setFetchingUrls(true);
      const userUrls = await urlService.getUserUrls();
      setUrls(userUrls);
    } catch (error: any) {
      console.error('Failed to fetch URLs:', error);
      setApiError('Failed to load your URLs. Please try again.');
    } finally {
      setFetchingUrls(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
    if (urlError) setUrlError('');
    if (apiError) setApiError('');
    if (successMessage) setSuccessMessage('');
  };

  const validateUrlForm = () => {
    if (!validateRequired(longUrl)) {
      setUrlError('URL is required');
      return false;
    }

    if (!validateUrl(longUrl)) {
      setUrlError('Please enter a valid URL (including http:// or https://)');
      return false;
    }

    return true;
  };

  const handleShortenUrl = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUrlForm()) return;

    setLoading(true);
    setApiError('');

    try {
      const newUrl = await urlService.shortenUrl({ longUrl });
      setUrls((prev) => [newUrl, ...prev]);
      setLongUrl('');
      setSuccessMessage(`Short URL created: ${newUrl.shortUrl}`);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('Failed to shorten URL. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.dashboardPage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.welcomeSection}>
            <h1>Welcome back, {user?.firstName}!</h1>
            <p>Create and manage your shortened URLs</p>
          </div>

          <Card title="Create New Short URL" className={styles.createCard}>
            <form onSubmit={handleShortenUrl} className={styles.createForm}>
              {apiError && <div className={styles.errorAlert}>{apiError}</div>}

              {successMessage && <div className={styles.successAlert}>{successMessage}</div>}

              <div className={styles.inputGroup}>
                <Input
                  type="url"
                  placeholder="Enter your long URL (e.g., https://example.com/very-long-url)"
                  value={longUrl}
                  onChange={handleUrlChange}
                  error={urlError}
                  className={styles.urlInput}
                />
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className={styles.shortenBtn}
                >
                  <Plus size={16} />
                  {loading ? 'Creating...' : 'Shorten'}
                </Button>
              </div>
            </form>
          </Card>

          <Card title="My Short URLs" className={styles.urlsCard}>
            <div className={styles.urlsHeader}>
              <span className={styles.urlsCount}>
                {urls.length} {urls.length === 1 ? 'URL' : 'URLs'}
              </span>
              <Button
                variant="secondary"
                size="small"
                onClick={fetchUrls}
                loading={fetchingUrls}
                className={styles.refreshBtn}
              >
                <RefreshCw size={16} />
                Refresh
              </Button>
            </div>

            {fetchingUrls ? (
              <div className={styles.loading}>Loading your URLs...</div>
            ) : urls.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No URLs yet. Create your first short URL above!</p>
              </div>
            ) : (
              <div className={styles.urlsList}>
                {urls.map((url) => (
                  <div key={url.id} className={styles.urlItem}>
                    <div className={styles.urlInfo}>
                      <div className={styles.shortUrl}>
                        <strong>{url.shortUrl}</strong>
                        <button
                          className={styles.copyBtn}
                          onClick={() => copyToClipboard(url.shortUrl)}
                          title="Copy to clipboard"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                      <div className={styles.longUrl}>
                        <a
                          href={url.longUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.longUrlLink}
                        >
                          {url.longUrl}
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <div className={styles.urlMeta}>Created on {formatDate(url.createdAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
