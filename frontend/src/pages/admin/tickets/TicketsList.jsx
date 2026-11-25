import { useState, useEffect } from 'react';
import { getTickets, createTicketType } from '../../../services/ticketService';
import Table from '../../../components/tables/Table';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Ticket, Plus, Search } from 'lucide-react';

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [newTicket, setNewTicket] = useState({
    event_name: 'Festival de Inverno no Jardim Botânico',
    name: '',
    price: 0,
    quantity: 100
  });

  const fetchTicketsData = async () => {
    setLoading(true);
    const data = await getTickets();
    setTickets(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTicketsData();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    await createTicketType(newTicket);
    setModalOpen(false);
    fetchTicketsData();
  };

  const filteredTickets = tickets.filter(t =>
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.event_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Tipo de Ingresso',
      cell: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.event_name}</p>
        </div>
      )
    },
    {
      header: 'Preço Unitário',
      cell: (row) => (
        <span className="font-bold text-gray-900">{formatCurrency(row.price)}</span>
      )
    },
    {
      header: 'Estoque Disponível / Total',
      cell: (row) => (
        <span className="font-medium text-gray-700">
          {row.available_quantity} / {row.quantity} unidades
        </span>
      )
    },
    {
      header: 'Status de Vendas',
      cell: (row) => {
        let variant = 'green';
        let label = 'Disponível';
        if (row.available_quantity === 0) {
          variant = 'red';
          label = 'Esgotado';
        } else if (row.available_quantity < 30) {
          variant = 'yellow';
          label = 'Poucas Unidades';
        }
        return <Badge variant={variant}>{label}</Badge>;
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Ingressos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure lotes, preços e monitore o controle de estoque em tempo real.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} />
          Novo Lote / Tipo
        </Button>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <Search size={18} className="text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Buscar por nome do lote ou nome do evento..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <Table columns={columns} data={filteredTickets} loading={loading} emptyMessage="Nenhum lote de ingresso encontrado." />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Novo Lote de Ingresso">
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            label="Nome do Evento"
            value={newTicket.event_name}
            onChange={e => setNewTicket({ ...newTicket, event_name: e.target.value })}
            required
          />
          <Input
            label="Nome do Tipo de Ingresso"
            placeholder="Ex: Pista VIP, Camarote ou Meia Estudante"
            value={newTicket.name}
            onChange={e => setNewTicket({ ...newTicket, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Preço (R$)"
              type="number"
              step="0.01"
              value={newTicket.price}
              onChange={e => setNewTicket({ ...newTicket, price: Number(e.target.value) })}
              required
            />
            <Input
              label="Quantidade no Lote"
              type="number"
              value={newTicket.quantity}
              onChange={e => setNewTicket({ ...newTicket, quantity: Number(e.target.value) })}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit">Cadastrar Lote</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
