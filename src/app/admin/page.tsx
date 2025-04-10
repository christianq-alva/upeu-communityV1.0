'use client';

import { useState, useEffect } from 'react';
import { Ticket, ticketTypes } from '@/models/Ticket';
import { TicketController } from '@/controllers/TicketController';

export default function AdminPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadTickets = () => {
      const allTickets = TicketController.getAllTickets();
      setTickets(allTickets);
    };

    loadTickets();
    // Actualizar la lista cada 30 segundos
    const interval = setInterval(loadTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (ticketId: string, newStatus: Ticket['status']) => {
    const updatedTicket = TicketController.updateTicketStatus(ticketId, newStatus);
    if (updatedTicket) {
      setTickets(TicketController.getAllTickets());
    }
  };

  const handleDelete = (ticketId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este ticket?')) {
      const success = TicketController.deleteTicket(ticketId);
      if (success) {
        setTickets(TicketController.getAllTickets());
      }
    }
  };

  const filteredTickets = statusFilter === 'all'
    ? tickets
    : tickets.filter(ticket => ticket.status === statusFilter);

  return (
    <main className="min-h-screen bg-[#0d1117]">
      <nav className="bg-[#161b22] border-b border-[#30363d] p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
        </div>
      </nav>

      <div className="container mx-auto py-6 sm:py-8 px-4">
        <div className="bg-[#161b22] rounded-lg border border-[#30363d] p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Gestión de Tickets</h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-sm md:text-base text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="resolved">Resuelto</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[800px] sm:w-full p-4 sm:p-0">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-200 border-b border-[#30363d]">
                    <th className="px-4 py-2 text-left text-sm md:text-base">ID</th>
                    <th className="px-4 py-2 text-left text-sm md:text-base">Título</th>
                    <th className="px-4 py-2 text-left text-sm md:text-base">Tipo</th>
                    <th className="px-4 py-2 text-left text-sm md:text-base">Estado</th>
                    <th className="px-4 py-2 text-left text-sm md:text-base">Fecha</th>
                    <th className="px-4 py-2 text-left text-sm md:text-base">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-[#30363d] text-gray-300 text-sm md:text-base">
                      <td className="px-4 py-2">{ticket.id.slice(0, 8)}</td>
                      <td className="px-4 py-2">{ticket.title}</td>
                      <td className="px-4 py-2">{ticketTypes.find(t => t.id === ticket.type)?.label}</td>
                      <td className="px-4 py-2">
                        <select
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticket.id, e.target.value as Ticket['status'])}
                          className="w-full sm:w-auto px-2 py-1 bg-[#0d1117] border border-[#30363d] rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="in_progress">En Progreso</option>
                          <option value="resolved">Resuelto</option>
                          <option value="closed">Cerrado</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <a
                          href={`https://wa.me/51${ticket.phoneNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          WhatsApp
                        </a>
                        <button
                          onClick={() => handleDelete(ticket.id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}