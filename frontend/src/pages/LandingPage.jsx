import React, { useState } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProtectedDocs from '../components/ProtectedDocs';
import PublicResources from '../components/PublicResources';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header user={user} setUser={setUser} onAuthClick={() => setIsAuthModalOpen(true)} />
      <Banner />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <ProtectedDocs />
        <PublicResources />
      </div>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(userData) => {
          setUser(userData);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
};

export default LandingPage;
