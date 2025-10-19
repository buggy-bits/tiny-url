import { X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QrCodeModalProps {
  url: string;
  onClose: () => void;
}

export const QrCodeModal = ({ url, onClose }: QrCodeModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-center p-4 bg-white">
          <QRCodeSVG value={url} size={256} level="H" />
        </div>
        <p className="text-sm text-gray-600 text-center mt-4 break-all">{url}</p>
      </div>
    </div>
  );
};
