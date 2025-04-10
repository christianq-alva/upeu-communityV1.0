'use client';

import TabView from '@/components/TabView';
import Navbar from '@/components/Navbar';

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar />
      <main className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Sistema de Tickets</h1>
          
          <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-6">
            <TabView />
          </div>
        </div>
      </main>
    </div>
  );
}