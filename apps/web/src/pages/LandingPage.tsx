import { Link, useNavigate } from 'react-router-dom';
import { Link2, BarChart3, QrCode, Shield, Clock, Zap } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TinyUrl</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium">
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
          Shorten Your URLs,
          <br />
          <span className="text-blue-600">Amplify Your Reach</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Transform long, complex URLs into short, shareable links. Track clicks, analyze your
          audience, and optimize your online presence.
        </p>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2 bg-white rounded-lg shadow-lg p-2">
            <input
              type="url"
              placeholder="Enter your long URL here..."
              className="flex-1 px-4 py-3 border-none focus:outline-none text-gray-700"
              readOnly
            />
            <button
              onClick={navigateToDashboard}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
            >
              Shorten Now
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Sign up to start shortening URLs and tracking analytics
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Everything You Need</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Shortening</h3>
            <p className="text-gray-600">
              Create short URLs in seconds. Fast, reliable, and always available.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
            <p className="text-gray-600">
              Track clicks, monitor traffic, and understand your audience better.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">QR Code Generator</h3>
            <p className="text-gray-600">
              Generate QR codes for your short URLs instantly for offline sharing.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">
              Your links are protected with enterprise-grade security and uptime.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Management</h3>
            <p className="text-gray-600">
              Organize, edit, and manage all your short URLs from one dashboard.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Link2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Links</h3>
            <p className="text-gray-600">
              Create branded, memorable short URLs that represent your brand.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who trust TinyUrl for their link management
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center text-gray-600">
            <p>&copy; 2025 TinyUrl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
