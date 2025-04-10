'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#161b22] border-b border-[#30363d] py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">UPeU Community</Link>
        
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <span className="sr-only">Abrir menú</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1c2128] ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  href="/tickets"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#30363d] hover:text-white"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Sistema de Tickets
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}