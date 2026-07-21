import { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/forms/Select';
import Button from '../../../components/ui/Button';

export default function UserForm({ initialValues, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'turista',
    status: 'ativo'
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
        label="Nome completo"
        placeholder="Ex: João da Silva"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="E-mail"
        type="email"
        placeholder="usuario@curitiba360.com"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <Select
        label="Perfil / Nível de Acesso"
        value={formData.role}
        onChange={e => setFormData({ ...formData, role: e.target.value })}
        options={[
          { value: 'admin', label: 'Administrador (Acesso Total)' },
          { value: 'agencia', label: 'Agência de Turismo' },
          { value: 'parceiro', label: 'Parceiro Comercial' },
          { value: 'turista', label: 'Turista / Consumidor Final' }
        ]}
      />

      <Select
        label="Status da Conta"
        value={formData.status}
        onChange={e => setFormData({ ...formData, status: e.target.value })}
        options={[
          { value: 'ativo', label: 'Ativo' },
          { value: 'inativo', label: 'Inativo' }
        ]}
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : initialValues ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
        </Button>
      </div>
    </form>
  );
}
