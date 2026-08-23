import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Job<span className="text-blue-500">Hunt</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Find your dream job and build your career with the best
            opportunities.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">Home</li>
            <li className="hover:text-blue-400 cursor-pointer">Jobs</li>
            <li className="hover:text-blue-400 cursor-pointer">Companies</li>
            <li className="hover:text-blue-400 cursor-pointer">About Us</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <p className="text-sm">Email: support@jobhunt.com</p>
          <p className="text-sm mt-2">Phone: +91 98765 43210</p>
          <p className="text-sm mt-2">India</p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2026 JobHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;