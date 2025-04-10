'use client';

import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar />
      <main className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Bienvenido a UPeU Community</h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Tu plataforma para gestionar tickets y mantenerte conectado con la comunidad universitaria.
          </p>
        </div>
      </main>
    </div>
  );
}
