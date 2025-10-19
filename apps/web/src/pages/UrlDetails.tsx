import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  QrCode,
  Save,
  BarChart3,
  Calendar,
  Globe,
} from 'lucide-react';
import { Header } from '../components/Header';
import { Toast } from '../components/Toast';
import { QrCodeModal } from '../components/QrCodeModal';
import { urlService } from '../services/urlService';
import { UrlData, ClickLog } from '../types/url';
import { copyToClipboard } from '../utils/copyToClipboard';

export const UrlDetails = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();
  const [url, setUrl] = useState<UrlData | null>(null);
  const [clickLogs, setClickLogs] = useState<ClickLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (shortCode) {
      loadUrlDetails();
      loadClickLogs();
    }
  }, [shortCode]);

  const loadUrlDetails = async () => {
    try {
      const response = await urlService.getUrlByShortCode(shortCode!);
      setUrl(response.data);
      setNewUrl(response.data.originalUrl);
    } catch (error: any) {
      setToast({
        message: error.response?.data?.message || 'Failed to load URL details',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadClickLogs = async () => {
    try {
      const response = await urlService.getClickLogs(shortCode!);
      setClickLogs(response.data);
    } catch (error) {
      console.error('Failed to load click logs:', error);
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!shortCode) return;

    try {
      const response = await urlService.updateUrl(shortCode, { longUrl: newUrl.trim() });
      setUrl(response.data);
      setEditing(false);
      setToast({ message: 'URL updated successfully', type: 'success' });
    } catch (error: any) {
      setToast({
        message: error.response?.data?.message || 'Failed to update URL',
        type: 'error',
      });
    }
  };

  const handleCopy = async () => {
    if (!url) return;
    const shortUrl = url.shortUrl || `http://localhost:3000/${url.shortCode}`;
    const success = await copyToClipboard(shortUrl);
    if (success) {
      setToast({ message: 'Copied to clipboard!', type: 'success' });
    } else {
      setToast({ message: 'Failed to copy', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">URL not found</p>
          </div>
        </main>
      </div>
    );
  }

  const shortUrl = url.shortUrl || `http://localhost:3000/${url.shortCode}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/urls')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to URLs</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">URL Details</h1>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-2 text-lg font-medium"
              >
                <span>{shortUrl}</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowQr(true)}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                title="Show QR code"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            {editing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setNewUrl(url.originalUrl);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original URL</label>
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 break-all">{url.originalUrl}</p>
                  <button
                    onClick={() => setEditing(true)}
                    className="ml-4 text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-lg font-semibold text-gray-900">{url.clicks}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(url.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Updated</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(url.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>Click History</span>
          </h2>

          {clickLogs.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No clicks yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      IP Address
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clickLogs.map((log) => (
                    <tr key={log._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{log.ipAddress}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(log.clickedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showQr && <QrCodeModal url={shortUrl} onClose={() => setShowQr(false)} />}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
