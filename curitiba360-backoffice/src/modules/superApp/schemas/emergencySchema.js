export const emergencySchema = {
  validate: (data) => {
    const errors = {};
    if (!data.emergencyType) {
      errors.emergencyType = "Tipo de emergência é obrigatório.";
    }
    return {
      success: Object.keys(errors).length === 0,
      errors
    };
  }
};
