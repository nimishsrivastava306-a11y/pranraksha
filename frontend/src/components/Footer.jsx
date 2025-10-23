import React from 'react';
import { Shield, Mail, Phone, Linkedin, Instagram, Twitter, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t-4 border-orange-500">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-10 h-10 text-orange-500" />
              <div>
                <h3 className="text-2xl font-bold text-white">PRANRAKSHA</h3>
                <p className="text-orange-400 text-sm font-medium">Your Safety, Our Priority</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Leading the way in safety solutions and secure document management. 
              Your trusted partner for confidential and public resources.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-orange-500" />
              Contact Us
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:pranrakshaa@gmail.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-orange-400 transition-colors duration-300 group"
              >
                <div className="bg-orange-500/20 p-2 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <span className="font-medium">pranrakshaa@gmail.com</span>
              </a>
              
              <a 
                href="tel:+918383997355"
                className="flex items-center space-x-3 text-gray-400 hover:text-orange-400 transition-colors duration-300 group"
              >
                <div className="bg-orange-500/20 p-2 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <span className="font-medium">+91 8383997355</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-orange-500" />
              Quick Links
            </h4>
            <div className="space-y-3">
              <a 
                href="https://pranraksha.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium"
              >
                → Official Website
              </a>
              <a
                href="https://pranraksha.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium"
              >
                → Shop
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3 text-center md:text-left">
                Connect With Us
              </h4>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a
                  href="https://www.linkedin.com/company/pranraksha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                
                <a
                  href="https://www.instagram.com/pran.raksha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-pink-600 to-purple-700 p-3 rounded-lg hover:from-pink-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                
                <a
                  href="https://x.com/pranraksha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-gray-500/50 hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-6 h-6 text-white" />
                </a>
                
                <a
                  href="https://wa.me/918383997355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Pranraksha. All rights reserved.
              </p>
              <p className="text-orange-400 text-sm mt-1 font-medium">
                Developed with ❤️ by Pranraksha Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
