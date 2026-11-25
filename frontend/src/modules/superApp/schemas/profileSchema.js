export const profileSchema = {
  validate: (data) => {
    const errors = {};
    if (!data.fullName || data.fullName.trim().length < 3) {
      errors.fullName = "Nome completo deve ter pelo menos 3 caracteres.";
    }
    if (!data.email || !data.email.includes("@")) {
      errors.email = "E-mail inválido.";
    }
    return {
      success: Object.keys(errors).length === 0,
      errors
    };
  }
};
