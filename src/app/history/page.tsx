'use client';

import { useState, useEffect } from 'react';
import { Ticket, ticketTypes } from '@/models/Ticket';
import { TicketController } from '@/controllers/TicketController';

export default function HistoryPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const loadTickets = () => {
      const allTickets = TicketController.getAllTickets();
      // Filtrar solo tickets resueltos y cerrados
      const resolvedTickets = allTickets.filter(
        ticket => ticket.status === 'resolved' || ticket.status === 'closed'
      ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTickets(resolvedTickets);
    };

    loadTickets();
    window.addEventListener('storage', loadTickets);
    return () => window.removeEventListener('storage', loadTickets);
  }, []);

  const calculateResolutionTime = (ticket: Ticket) => {
    const created = new Date(ticket.createdAt);
    const resolved = new Date(ticket.updatedAt || ticket.createdAt);
    const diff = resolved.getTime() - created.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <main className="min-h-screen bg-[#0d1117] py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Historial de Tickets Atendidos</h1>
        
        <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-6">
          {tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-[#0d1117] p-4 rounded-lg border border-[#30363d]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-200">{ticket.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${ticket.status === 'resolved' ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
                      {ticket.status === 'resolved' ? 'Resuelto' : 'Cerrado'}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-2">{ticket.description}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>Tipo: {ticketTypes.find(t => t.id === ticket.type)?.label}</div>
                    <div>Creado: {new Date(ticket.createdAt).toLocaleString()}</div>
                    <div>Tiempo de resolución: {calculateResolutionTime(ticket)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No hay tickets resueltos para mostrar
            </div>
          )}
        </div>
      </div>
    </main>
  );
}