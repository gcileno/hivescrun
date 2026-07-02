// Organization Model
// Assinature of models for consuming and sending data to the API

export const organizationInput = (data) => {
  if (!data) return null;
  
  return {
    name: data.name || '',
    cnpj: data.cnpj || '',
  };
};

export const organizationResponse = (data) => {
  if (!data) return null;

    return {
      id: data.id || null,
      name: data.name || '',
      cnpj: data.cnpj || '',
      createdAt: data.created_at || null,
      director: data.director || null,
      members: Array.isArray(data.members) ? data.members : [],
    };
};