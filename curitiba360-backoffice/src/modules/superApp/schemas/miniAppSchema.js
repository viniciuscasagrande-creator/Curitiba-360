export const miniAppSchema = {
  validateManifest: (data) => {
    const errors = {};
    if (!data.id) errors.id = "ID do Mini App é obrigatório.";
    if (!data.name) errors.name = "Nome é obrigatório.";
    if (!data.entryUrl) errors.entryUrl = "URL de entrada é obrigatória.";
    return {
      success: Object.keys(errors).length === 0,
      errors
    };
  }
};
