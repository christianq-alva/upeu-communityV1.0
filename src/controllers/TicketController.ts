import { Ticket, TicketCreate } from '@/models/Ticket';

export class TicketController {
  private static STORAGE_KEY = 'tickets';

  static getAllTickets(): Ticket[] {
    if (typeof window === 'undefined') return [];
    const tickets = localStorage.getItem(this.STORAGE_KEY);
    return tickets ? JSON.parse(tickets) : [];
  }

  static getTicketById(id: string): Ticket | null {
    const tickets = this.getAllTickets();
    return tickets.find(ticket => ticket.id === id) || null;
  }

  static createTicket(ticketData: TicketCreate): Ticket {
    const timestamp = new Date().toISOString();
    const newTicket: Ticket = {
      ...ticketData,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp,
      statusHistory: [{
        status: 'pending',
        timestamp
      }]
    };
    // Asegurarse de que statusHistory siempre esté inicializado
    if (!newTicket.statusHistory) {
      newTicket.statusHistory = [{
        status: 'pending',
        timestamp
      }];
    }

    const tickets = this.getAllTickets();
    tickets.push(newTicket);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tickets));

    return newTicket;
  }

  static updateTicketStatus(id: string, status: Ticket['status']): Ticket | null {
    const tickets = this.getAllTickets();
    const ticketIndex = tickets.findIndex(ticket => ticket.id === id);

    if (ticketIndex === -1) return null;

    const timestamp = new Date().toISOString();
    const currentTicket = tickets[ticketIndex];
    
    // Asegurarse de que statusHistory exista
    if (!currentTicket.statusHistory) {
      currentTicket.statusHistory = [{
        status: currentTicket.status,
        timestamp: currentTicket.createdAt
      }];
    }

    tickets[ticketIndex] = {
      ...currentTicket,
      status,
      updatedAt: timestamp,
      statusHistory: [
        ...currentTicket.statusHistory,
        { status, timestamp }
      ]
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tickets));
    return tickets[ticketIndex];
  }

  static deleteTicket(id: string): boolean {
    const tickets = this.getAllTickets();
    const filteredTickets = tickets.filter(ticket => ticket.id !== id);
    
    if (filteredTickets.length === tickets.length) return false;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredTickets));
    return true;
  }
}