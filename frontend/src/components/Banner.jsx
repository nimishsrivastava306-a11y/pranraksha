import React from 'react';
import { Shield, Lock, Users } from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://media.licdn.com/dms/image/v2/D4D3DAQHTlUd0a2Ra3g/image-scale_191_1128/B4DZoH7IO2HwAc-/0/1761069540820/pranraksha_cover?e=1761814800&v=beta&t=ei_cs26uwZOqEhqrztzL8Tfnq68_V7eKn5nsvtIlEj8)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-orange-900/70"></div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Welcome to Pranraksha
            </h2>
            <p className="text-xl md:text-2xl text-orange-300 mb-8 font-medium">
              Your Safety, Our Priority - Access Resources and Documents
            </p>
            
            <div className="flex flex-wrap gap-8 mt-8">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Secure Access</p>
                  <p className="text-gray-300 text-sm">Protected documents</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-3 rounded-full">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Confidential</p>
                  <p className="text-gray-300 text-sm">Password protected</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Public Resources</p>
                  <p className="text-gray-300 text-sm">Free access materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
