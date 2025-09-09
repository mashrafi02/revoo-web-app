import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900/90 text-white py-12 pt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        {/* About Section */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-200">
            This is a demo movie review platform. Here you can explore movies, check top reviewers, and get the latest updates.
          </p>
          <Link to="/about" className="underline">See more</Link>
        </div>

        {/* Contact Section */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <ul className="text-gray-200 space-y-2">
            <li>Email: demo@example.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Demo Street, City, Country</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-gray-200">
            <a href="#" className="hover:text-red-400 transition">Facebook</a>
            <a href="#" className="hover:text-red-400 transition">Twitter</a>
            <a href="#" className="hover:text-red-400 transition">Instagram</a>
            <a href="#" className="hover:text-red-400 transition">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SceneIt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
