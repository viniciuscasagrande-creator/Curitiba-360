import { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/forms/Select';
import Button from '../../../components/ui/Button';

export default function EventForm({ initialValues, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    capacity: 100,
    status: 'rascunho',
    image: ''
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Título do Evento / Atração"
        placeholder="Ex: Festival de Música no Parque Barigui"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          placeholder="Descreva detalhes do evento, programação e atrações..."
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <Input
        label="Localização"
        placeholder="Ex: Parque Barigui, Curitiba - PR"
        value={formData.location}
        onChange={e => setFormData({ ...formData, location: e.target.value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Data / Hora Início"
          type="datetime-local"
          value={formData.start_date}
          onChange={e => setFormData({ ...formData, start_date: e.target.value })}
          required
        />

        <Input
          label="Data / Hora Fim"
          type="datetime-local"
          value={formData.end_date}
          onChange={e => setFormData({ ...formData, end_date: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Capacidade Total de Público"
          type="number"
          min="1"
          value={formData.capacity}
          onChange={e => setFormData({ ...formData, capacity: Number(e.target.value) })}
          required
        />

        <Select
          label="Status do Evento"
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
          options={[
            { value: 'rascunho', label: 'Rascunho' },
            { value: 'publicado', label: 'Publicado' },
            { value: 'encerrado', label: 'Encerrado' },
            { value: 'cancelado', label: 'Cancelado' }
          ]}
        />
      </div>

      <Input
        label="URL da Imagem de Capa"
        placeholder="/jardim_botanico.jpg ou https://..."
        value={formData.image}
        onChange={e => setFormData({ ...formData, image: e.target.value })}
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : initialValues ? 'Atualizar Evento' : 'Criar Evento'}
        </Button>
      </div>
    </form>
  );
}
