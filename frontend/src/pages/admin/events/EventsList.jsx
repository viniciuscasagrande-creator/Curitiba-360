import { useState } from 'react';
import { useEvents } from '../../../hooks/useEvents';
import Table from '../../../components/tables/Table';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import EventForm from './EventForm';
import EventDetails from './EventDetails';
import { formatDateTime } from '../../../utils/formatDate';
import { eventStatusMap, getStatusBadge } from '../../../utils/status';
import { CalendarPlus, Search, Eye, Edit2, Trash2 } from 'lucide-react';

export default function EventsList() {
  const { events, loading, addEvent, editEvent, removeEvent } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter(e =>
    e.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setDetailsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja remover este evento?')) {
      await removeEvent(id);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (selectedEvent) {
      await editEvent(selectedEvent.id, formData);
    } else {
      await addEvent(formData);
    }
    setModalOpen(false);
  };

  const columns = [
    {
      header: 'Evento',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-xl bg-gray-100 flex-shrink-0">
            {row.image ? (
              <img src={row.image} alt={row.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-bold text-gray-400">📅</div>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{row.title}</p>
            <p className="text-xs text-gray-500">{row.location}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Data de Início',
      cell: (row) => formatDateTime(row.start_date)
    },
    {
      header: 'Capacidade',
      cell: (row) => `${row.capacity} pessoas`
    },
    {
      header: 'Status',
      cell: (row) => {
        const info = getStatusBadge(row.status, eventStatusMap);
        return <Badge variant={info.color}>{info.label}</Badge>;
      }
    },
    {
      header: 'Ações',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(row)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition"
            title="Visualizar Evento"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition"
            title="Editar Evento"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-red-600 transition"
            title="Remover Evento"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Eventos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Cadastre, edite e acompanhe o status e lotação dos eventos turísticos de Curitiba.
          </p>
        </div>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <CalendarPlus size={18} />
          Criar Evento
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <Search size={18} className="text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Buscar por título, localização ou status..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Table */}
      <Table columns={columns} data={filteredEvents} loading={loading} emptyMessage="Nenhum evento cadastrado." />

      {/* Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedEvent ? 'Editar Evento' : 'Criar Novo Evento'}
      >
        <EventForm
          initialValues={selectedEvent}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title="Detalhes do Evento"
      >
        <EventDetails event={selectedEvent} />
      </Modal>
    </div>
  );
}
