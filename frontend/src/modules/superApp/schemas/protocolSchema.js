export const protocolSchema = {
  validate: (data) => {
    const errors = {};
    if (!data.serviceId) {
      errors.serviceId = "Serviço é obrigatório.";
    }
    if (!data.subject || data.subject.trim().length < 5) {
      errors.subject = "Assunto deve ter pelo menos 5 caracteres.";
    }
    if (!data.description || data.description.trim().length < 10) {
      errors.description = "Descrição deve ter pelo menos 10 caracteres.";
    }
    return {
      success: Object.keys(errors).length === 0,
      errors
    };
  }
};
