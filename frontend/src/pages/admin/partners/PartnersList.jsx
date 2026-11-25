import { useState, useEffect } from 'react';
import { getPartners, createPartner } from '../../../services/partnerService';
import StatusBadge from '../../../components/admin/StatusBadge';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';

export default function PartnersList() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'Gastronomia', commission: '10%', contact: '' });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getPartners();
      setPartners(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createPartner(form);
    const data = await getPartners();
    setPartners(data);
    setModalOpen(false);
    setForm({ name: '', category: 'Gastronomia', commission: '10%', contact: '' });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando parceiros B2B...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rede de Parceiros B2B 🤝</h1>
          <p className="mt-2 text-gray-500">Hotéis, restaurantes, museus, agências e transporte credenciados.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition shadow-sm"
        >
          + Novo Parceiro
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="border-b border-gray-200 bg-gray-50/80 text-xs font-semibold uppercase text-gray-700">
            <tr>
              <th className="p-4">Parceiro</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Comissão B2B</th>
              <th className="p-4">Contato</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {partners.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-bold text-gray-900">{p.name}</td>
                <td className="p-4 font-semibold text-gray-700">{p.category}</td>
                <td className="p-4 font-bold text-emerald-600">{p.commission}</td>
                <td className="p-4 text-gray-500">{p.contact}</td>
                <td className="p-4">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Novo Parceiro Comercial B2B">
        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <Input
            label="Nome do Estabelecimento / Empresa"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Categoria</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm outline-none focus:border-blue-600"
            >
              <option value="Gastronomia">Gastronomia / Restaurante</option>
              <option value="Hospedagem">Hospedagem / Hotel</option>
              <option value="Turismo / Passeios">Turismo / Passeios</option>
              <option value="Cultura / Museu">Cultura / Museu</option>
              <option value="Transporte / Mobilidade">Transporte / Mobilidade</option>
            </select>
          </div>

          <Input
            label="Comissão (%)"
            value={form.commission}
            onChange={e => setForm({ ...form, commission: e.target.value })}
            required
          />

          <Input
            label="E-mail de Contato"
            type="email"
            value={form.contact}
            onChange={e => setForm({ ...form, contact: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-700 py-3 font-bold text-white hover:bg-blue-800 transition"
          >
            Cadastrar Parceiro
          </button>
        </form>
      </Modal>
    </div>
  );
}
