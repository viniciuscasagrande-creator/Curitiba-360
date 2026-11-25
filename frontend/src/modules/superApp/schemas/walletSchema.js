export const walletSchema = {
  validateTransaction: (data) => {
    const errors = {};
    if (typeof data.amount !== "number" || data.amount === 0) {
      errors.amount = "Valor da transação inválido.";
    }
    if (!data.description || data.description.trim().length < 2) {
      errors.description = "Descrição é obrigatória.";
    }
    return {
      success: Object.keys(errors).length === 0,
      errors
    };
  }
};
