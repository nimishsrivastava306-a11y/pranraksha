import React from 'react';
import { Shield, LogIn, LogOut, User } from 'lucide-react';

const Header = ({ user, setUser, onAuthClick }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-10 h-10 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">PRANRAKSHA</h1>
              <p className="text-white/90 text-sm font-medium">Your Safety, Our Priority</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                <span>Login / Register</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
