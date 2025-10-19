import { useState, useEffect } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { UrlCard } from '../components/UrlCard';
import { Toast } from '../components/Toast';
import { urlService } from '../services/urlService';
import { UrlData } from '../types/url';

export const UrlList = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const response = await urlService.getAllUrls();
      setUrls(response.data);
    } catch (error: any) {
      setToast({
        message: error.response?.data?.message || 'Failed to load URLs',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortCode: string) => {
    if (!confirm('Are you sure you want to delete this URL?')) {
      return;
    }

    try {
      await urlService.deleteUrl(shortCode);
      setToast({ message: 'URL deleted successfully', type: 'success' });
      setUrls(urls.filter((url) => url.shortCode !== shortCode));
    } catch (error: any) {
      setToast({
        message: error.response?.data?.message || 'Failed to delete URL',
        type: 'error',
      });
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <LinkIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">My URLs</h1>
          </div>
          <p className="text-gray-600">Manage all your shortened URLs</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading your URLs...</p>
          </div>
        ) : urls.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <LinkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs yet</h3>
            <p className="text-gray-600">Create your first shortened URL to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {urls.map((url) => (
              <UrlCard key={url._id} url={url} onDelete={handleDelete} onShowToast={showToast} />
            ))}
          </div>
        )}
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
