import api from "@/services/axios";

export const getCategories = async () => {
  const { data } = await api.get("/Categories");
  return data;
};

export const getCategory = async (id: string) => {
  const { data } = await api.get(`/Categories/${id}`);
  return data;
};
