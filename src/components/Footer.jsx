import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              Your one-stop shop for all your electronic needs. We provide high-quality products with the best prices and customer service.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors block">Home</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors block">Products</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors block">Categories</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors block">New Arrivals</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors block">Deals & Promotions</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-white transition-colors block">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors block">FAQs</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors block">Shipping Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors block">Returns & Refunds</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors block">Track Order</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">123 Tech Street, Digital District, Yangon, Myanmar</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="h-4 w-4 text-gray-400 mr-3" />
                <a href="tel:+959123456789" className="text-sm hover:text-white transition-colors">+95 9 123 456 789</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-4 w-4 text-gray-400 mr-3" />
                <a href="mailto:info@techshop.com" className="text-sm hover:text-white transition-colors">info@techshop.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} TechShop. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
