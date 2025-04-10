export interface StatusChange {
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  timestamp: string;
}

export interface Ticket {
  id: string;
  type: 'password_change' | 'lamb_access' | 'email_reset' | 'uptodate_renewal';
  title: string;
  description: string;
  phoneNumber: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusChange[];
}

export interface TicketCreate extends Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}

export const ticketTypes = [
  { id: 'password_change', label: 'Cambio de Contraseña' },
  { id: 'lamb_access', label: 'Acceso al Lamb' },
  { id: 'email_reset', label: 'Reseteo de Correo' },
  { id: 'uptodate_renewal', label: 'Renovación del Uptodate' }
];