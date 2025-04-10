'use client';

import { useState, Fragment } from 'react';
import { TicketCreate, ticketTypes } from '@/models/Ticket';
import { TicketController } from '@/controllers/TicketController';

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^[0-9]{9}$/;
  return phoneRegex.test(phone);
};

export default function TicketForm() {
  const [formData, setFormData] = useState<TicketCreate>({
    type: 'password_change',
    title: '',
    description: '',
    phoneNumber: ''
  });

  const [phoneError, setPhoneError] = useState('');
  const [error, setError] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setPhoneError('Por favor ingrese un número de celular válido (9 dígitos)');
      return;
    }

    try {
      await TicketController.createTicket(formData);
      setFormData({
        type: 'password_change',
        title: '',
        description: '',
        phoneNumber: ''
      });
      setPhoneError('');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      // Disparar evento para actualizar la lista de tickets
      window.dispatchEvent(new Event('ticketCreated'));
    } catch (err) {
      setError('Hubo un error al crear el ticket. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <Fragment>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      {isSubmitted && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Ticket creado exitosamente
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#161b22] p-4 sm:p-6 rounded-lg border border-[#30363d]">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-200 mb-2">
          Tipo de Incidencia
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as TicketCreate['type'] })}
          className="w-full px-3 sm:px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-sm md:text-base text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {ticketTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-2">
          Título
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 sm:px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-sm md:text-base text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-3 sm:px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-sm md:text-base text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200 mb-2">
          Número de Celular
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => {
            setFormData({ ...formData, phoneNumber: e.target.value });
            if (phoneError) setPhoneError('');
          }}
          className="w-full px-3 sm:px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-sm md:text-base text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          pattern="[0-9]{9}"
          placeholder="Ingrese 9 dígitos"
        />
        {phoneError && <p className="mt-1 text-sm text-red-500">{phoneError}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-3 sm:px-4 py-2 bg-green-600 text-white text-sm md:text-base font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Crear Ticket
      </button>
    </form>
    </Fragment>
  );
}