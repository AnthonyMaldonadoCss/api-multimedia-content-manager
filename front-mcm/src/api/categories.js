import axiosInstance from "./axios";

export const addCategory = (data) => axiosInstance.post(`/categories/add_categories`, data);
export const updateCategory = (data) => axiosInstance.put(`/categories/update_categories`, data);
export const deleteCategory = (id) => axiosInstance.delete(`/categories/delete_categories`, { data: { _id: id } });
export const getCategories = () => axiosInstance.get(`/categories`)