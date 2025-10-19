import { useState } from 'react';
import { Copy, QrCode, Edit2, Trash2, ExternalLink, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UrlData } from '../types/url';
import { copyToClipboard } from '../utils/copyToClipboard';
import { QrCodeModal } from './QrCodeModal';

interface UrlCardProps {
  url: UrlData;
  onDelete: (shortCode: string) => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export const UrlCard = ({ url, onDelete, onShowToast }: UrlCardProps) => {
  const [showQr, setShowQr] = useState(false);
  const navigate = useNavigate();

  const shortUrl = url.shortUrl || `http://localhost:3000/${url.shortCode}`;

  const handleCopy = async () => {
    const success = await copyToClipboard(shortUrl);
    if (success) {
      onShowToast('Copied to clipboard!', 'success');
    } else {
      onShowToast('Failed to copy', 'error');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:text-blue-700 flex items-center space-x-1"
              >
                <span>{shortUrl}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <strong>{url.title}</strong>
            <p>{url.description}</p>
            <p className="text-sm text-gray-600 truncate" title={url.originalUrl}>
              {url.originalUrl}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <BarChart3 className="w-4 h-4" />
              <span>{url.clicks} clicks</span>
            </span>
            <span>{new Date(url.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowQr(true)}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
              title="Show QR code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(`/urls/${url.shortCode}`)}
              className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
              title="View details"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(url.shortCode)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showQr && <QrCodeModal url={shortUrl} onClose={() => setShowQr(false)} />}
    </>
  );
};
