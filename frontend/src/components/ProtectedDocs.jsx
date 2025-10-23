import React, { useState } from 'react';
import axios from 'axios';
import { Lock, FileText, Unlock, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProtectedDocs = () => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const documents = [
    { icon: '📊', title: 'Pranraksha Google Sheet', link: 'https://docs.google.com/spreadsheets/d/1eskvdoopSGGqnTubF3A_eAm_J_Bh94EQwnH0EmVQjbI/edit?usp=sharing' },
    { icon: '📋', title: 'Market Analysis', link: 'https://drive.google.com/file/d/1D7E5HCu3xtQJojk-VYCg6hXZVDRatQfE/view?usp=drivesdk' },
    { icon: '🔒', title: 'Competitors Analysis', link: 'https://drive.google.com/file/d/1DMkHTWQBaYLjKbztMcJIhMPxPIJ7aNsr/view?usp=drivesdk' },
    { icon: '📈', title: 'USP Differentiation', link: 'https://drive.google.com/file/d/1PRMNj82G_KESBCWt39yIxQzT2Rc2R9ua/view?usp=drivesdk' },
    { icon: '📄', title: 'Competitors Document', link: 'https://docs.google.com/document/d/138W-3psWwAbtoqcGJWvGu3fFjgg7x5LKrNj-qWJajIM/edit?usp=drivesdk' },
  ];

  const handleUnlock = async () => {
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(`${API}/verify-document-password`, {
        password: password
      });
      
      if (response.data.success) {
        setIsUnlocked(true);
        setError('');
      }
    } catch (err) {
      setError('Incorrect password. Please try again.');
      setIsUnlocked(false);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-3">
          🔐 Confidential Documents
        </h2>
        <p className="text-gray-400 text-lg">Enter password to access protected materials</p>
      </div>

      {!isUnlocked ? (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-orange-500/20">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-orange-500/20 p-4 rounded-full">
                <Lock className="w-12 h-12 text-orange-400" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter password"
                  className="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-all duration-300"
                />
              </div>
              
              {error && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
              
              <button
                onClick={handleUnlock}
                disabled={loading || !password}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Unlock className="w-5 h-5" />
                <span>{loading ? 'Verifying...' : 'Unlock Documents'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documents.map((doc, index) => (
            <a
              key={index}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-orange-500/20 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30"
            >
              <div className="text-5xl mb-4">{doc.icon}</div>
              <div className="flex items-start space-x-2">
                <FileText className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <h3 className="text-white font-semibold text-lg group-hover:text-orange-400 transition-colors">
                  {doc.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProtectedDocs;
