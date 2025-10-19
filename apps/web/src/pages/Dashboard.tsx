import { useState, useEffect, FormEvent } from 'react';
import { Link2, Plus, BarChart3, Link as LinkIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { Toast } from '../components/Toast';
import { urlService } from '../services/urlService';
import { UrlData } from '../types/url';

export const Dashboard = () => {
  const [longUrl, setLongUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [stats, setStats] = useState({ totalUrls: 0, totalClicks: 0 });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const response = await urlService.getAllUrls();
      setUrls(response.data);
      const totalClicks = response.data.reduce((sum, url) => sum + url.clicks, 0);
      setStats({ totalUrls: response.data.length, totalClicks });
    } catch (error) {
      console.error('Failed to load URLs:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await urlService.createUrl({ longUrl: longUrl.trim() });
      setToast({
        message: response.message || 'Short URL created successfully!',
        type: 'success',
      });
      setLongUrl('');
      await loadUrls();
    } catch (error: any) {
      setToast({
        message: error.response?.data?.message || 'Failed to create short URL',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Create and manage your shortened URLs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total URLs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUrls}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <LinkIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Clicks</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalClicks}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg. Clicks</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalUrls > 0 ? (stats.totalClicks / stats.totalUrls).toFixed(1) : 0}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Link2 className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create Short URL</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your long URL
              </label>
              <input
                id="longUrl"
                type="url"
                required
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="https://example.com/very/long/url"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              <span>{loading ? 'Creating...' : 'Shorten URL'}</span>
            </button>
          </form>
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
