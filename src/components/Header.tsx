'use client';

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">IWB Recycling</h1>
        <nav className="space-x-4 text-sm md:text-base">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/register" className="hover:underline">Register</Link>
          <Link href="/login" className="hover:underline">Login</Link>
          {/* <Link href="/developer" className="hover:underline">Developer</Link> */}
          {/* <Link href="/investor" className="hover:underline">Investor</Link> */}
          {/* <Link href="/contact" className="hover:underline">Contact</Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
