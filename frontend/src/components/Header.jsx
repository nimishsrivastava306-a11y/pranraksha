import React from 'react';
import { Shield, LogIn, LogOut, User } from 'lucide-react';

const Header = ({ user, setUser, onAuthClick }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 shadow-xl">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white flex-shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">PRANRAKSHA</h1>
              <p className="text-white/90 text-xs sm:text-sm font-medium">Your Safety, Our Priority</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-center sm:justify-end">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap justify-center sm:justify-end">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span className="text-white font-medium text-sm sm:text-base">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 sm:space-x-2 bg-white text-orange-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg text-sm sm:text-base"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-1.5 sm:space-x-2 bg-white text-orange-600 px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg text-sm sm:text-base"
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
