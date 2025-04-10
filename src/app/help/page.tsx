'use client';

import TicketForm from '@/components/TicketForm';

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[#0d1117] py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-6">Solicitar Ayuda</h1>
        <TicketForm />
      </div>
    </main>
  );
}