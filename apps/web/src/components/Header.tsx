import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Link2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Link2 className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TinyUrl</span>
          </Link>

          {isAuthenticated && (
            <div className="flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/urls"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                My URLs
              </Link>
              <div className="flex items-center space-x-4 pl-6 border-l border-gray-200">
                <span className="text-sm text-gray-600">{user?.userName}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
