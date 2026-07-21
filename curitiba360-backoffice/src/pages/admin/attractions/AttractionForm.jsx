import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAttraction } from '../../../services/attractionService';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { ArrowLeft } from 'lucide-react';

export default function AttractionForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAttraction({
      ...form,
      price: Number(form.price)
    });
    navigate('/admin/events');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Nova Atração Turística 🏞️</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <Input
          label="Nome da atração"
          name="name"
          placeholder="Ex: Ópera de Arame"
          value={form.name}
          onChange={handleChange}
          required
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            name="description"
            placeholder="Descreva a atração, história e principais destaques..."
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            rows={4}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Categoria"
            name="category"
            placeholder="Ex: Parque / Cultura / Museu"
            value={form.category}
            onChange={handleChange}
            required
          />

          <Input
            label="Preço de Entrada (R$)"
            name="price"
            type="number"
            step="0.01"
            placeholder="0.00 para gratuito"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          label="Endereço"
          name="address"
          placeholder="Rua, número e bairro em Curitiba"
          value={form.address}
          onChange={handleChange}
          required
        />

        <Button type="submit" className="w-full">
          Cadastrar Atração Turística
        </Button>
      </form>
    </div>
  );
}
