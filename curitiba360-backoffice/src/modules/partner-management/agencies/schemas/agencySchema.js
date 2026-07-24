export function validateAgencyStep(step, formData) {
  const errors = {};

  if (step === 1) {
    if (!formData.tradeName?.trim()) errors.tradeName = 'Nome fantasia é obrigatório.';
    if (!formData.corporateName?.trim()) errors.corporateName = 'Razão social é obrigatória.';
    if (!formData.cnpj?.trim()) errors.cnpj = 'CNPJ é obrigatório.';
  }

  if (step === 2) {
    if (!formData.responsibleName?.trim()) errors.responsibleName = 'Nome do responsável é obrigatório.';
    if (!formData.responsibleCpf?.trim()) errors.responsibleCpf = 'CPF é obrigatório.';
    if (!formData.email?.trim()) errors.email = 'E-mail é obrigatório.';
    if (!formData.responsiblePhone?.trim()) errors.responsiblePhone = 'Telefone do responsável é obrigatório.';
  }

  if (step === 3) {
    if (!formData.city?.trim()) errors.city = 'Cidade é obrigatória.';
    if (!formData.state?.trim()) errors.state = 'UF é obrigatória.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
