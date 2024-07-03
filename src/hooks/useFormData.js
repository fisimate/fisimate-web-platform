export const useFormData = (values) => {
  const formData = new FormData();

  for (const key in values) {
    formData.append(key, values[key]);
  }

  return formData;
};
