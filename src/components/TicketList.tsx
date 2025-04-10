'use client';

import { useEffect, useState } from 'react';
import { Ticket, ticketTypes } from '@/models/Ticket';
import { TicketController } from '@/controllers/TicketController';
// Usando SVG directamente en lugar de @heroicons/react

const statusColors = {
  pending: 'bg-yellow-500',
  in_progress: 'bg-blue-500',
  resolved: 'bg-green-500',
  closed: 'bg-gray-500'
};

const statusLabels = {
  pending: 'Pendiente',
  in_progress: 'En Proceso',
  resolved: 'Resuelto',
  closed: 'Cerrado'
};

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<Ticket['status'] | 'all'>('all');
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  useEffect(() => {
    const loadTickets = () => {
      const allTickets = TicketController.getAllTickets();
      const sortedTickets = allTickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTickets(sortedTickets);
    };

    loadTickets();
    // Escuchar eventos de almacenamiento y creación de tickets
    window.addEventListener('storage', loadTickets);
    window.addEventListener('ticketCreated', loadTickets);
    return () => {
      window.removeEventListener('storage', loadTickets);
      window.removeEventListener('ticketCreated', loadTickets);
    };
  }, []);



  const filteredTickets = filter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === filter);

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Ticket['status'] | 'all')}
          className="w-full sm:w-48 px-3 py-2 bg-[#21262d] border border-[#30363d] rounded-md text-gray-300 focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
        >
          <option value="all">Todos los estados</option>
          {Object.entries(statusLabels).map(([status, label]) => (
            <option key={status} value={status}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-[#161b22] p-4 rounded-lg border border-[#30363d] hover:border-[#6e7681]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-200">{ticket.title}</h3>
                <span className="text-xs text-gray-400">Id del ticket: #{ticket.id.slice(0, 8)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-md text-white ${statusColors[ticket.status]} text-sm`}>
                  {statusLabels[ticket.status]}
                </span>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-400 mb-2">{ticket.description}</p>
            <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-500">
              <div>Tipo: {ticketTypes.find(t => t.id === ticket.type)?.label}</div>
              <div>Creado: {new Date(ticket.createdAt).toLocaleString()}</div>
              <button
                onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 mt-2"
              >
                {expandedTicket === ticket.id ? (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M19 15l-7-7-7 7" />
                    </svg>
                    Ocultar historial
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                    Ver historial
                  </>
                )}
              </button>
              {expandedTicket === ticket.id && (
                <div className="mt-3 pl-4 border-l-2 border-[#30363d]">
                  {ticket.statusHistory?.map((change, index) => (
                    <div key={index} className="relative pb-4 last:pb-0">
                      <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-[#30363d] border-2 border-[#0d1117]"></div>
                      <div className="text-gray-300">{statusLabels[change.status]}</div>
                      <div className="text-gray-500 text-xs">
                        {new Date(change.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredTickets.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No hay tickets para mostrar
          </div>
        )}
      </div>
    </div>
  );
}