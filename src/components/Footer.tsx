'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} IWB Recycling. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
