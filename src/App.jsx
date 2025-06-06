import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ShoppingCart from "./ShoppingCart";
import ProductManagement from "./components/ProductManagement";
import Login from "./components/Login";
import Footer from "./components/Footer";
import { ProtectedRoute } from './components/ProtectedRoute';

// Navigation component
const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center border-b border-gray-200">
          <div className="flex">
            <Link
              to="/"
              className={`py-4 px-6 font-medium text-sm ${
                isActive('/') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Shop
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/manage"
                className={`py-4 px-6 font-medium text-sm ${
                  isActive('/manage') ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Products
              </Link>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <span className="text-sm text-gray-700 mr-4">
                  Welcome, {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main App component
const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/manage"
            element={
              <ProtectedRoute requiredRole="admin">
                <ProductManagement />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
