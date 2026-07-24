import { useState } from 'react';
import { initialAgencyFormData } from '../utils/agencyFormMapper';
import { validateAgencyStep } from '../schemas/agencySchema';

export function useAgencyForm(initialData = null) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData ? { ...initialAgencyFormData, ...initialData } : initialAgencyFormData);
  const [errors, setErrors] = useState({});
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }

  async function searchCep(cep) {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    try {
      setIsSearchingCep(true);
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          street: data.logradouro || prev.street,
          district: data.bairro || prev.district,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      }
    } catch {
      // Ignorar falha de busca no ViaCEP
    } finally {
      setIsSearchingCep(false);
    }
  }

  function nextStep() {
    const validation = validateAgencyStep(step, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }
    setErrors({});
    setStep((prev) => Math.min(prev + 1, 7));
    return true;
  }

  function previousStep() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  return {
    step,
    setStep,
    formData,
    setFormData,
    errors,
    isSearchingCep,
    updateField,
    searchCep,
    nextStep,
    previousStep,
  };
}
