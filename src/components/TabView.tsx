'use client';

import { useState } from 'react';
import TicketForm from './TicketForm';
import TicketList from './TicketList';

export default function TabView() {
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-[#30363d]">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 text-sm md:text-base font-medium ${activeTab === 'create' ? 'text-white border-b-2 border-[#238636]' : 'text-gray-400 hover:text-gray-300'}`}
        >
          Crear Ticket
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-sm md:text-base font-medium ${activeTab === 'history' ? 'text-white border-b-2 border-[#238636]' : 'text-gray-400 hover:text-gray-300'}`}
        >
          Historial
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'create' ? (
          <TicketForm />
        ) : (
          <TicketList />
        )}
      </div>
    </div>
  );
}