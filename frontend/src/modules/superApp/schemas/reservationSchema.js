export const reservationSchema = {
  validate: (data) => {
    const errors = {};
    if (!data.serviceType) {
      errors.serviceType = "Tipo de serviço é obrigatório.";
    }
    if (!data.date) {
      errors.date = "Data é obrigatória.";
    }
    if (!data.quantity || data.quantity < 1) {
      errors.quantity = "Quantidade de pessoas deve ser no mínimo 1.";
    }
    return {
      success: Object.keys(errors).length === 0,
      errors
    };
  }
};
