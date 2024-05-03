import axiosInstance from "./axios";

export const addTopic = (data) => axiosInstance.post(`/topics/add_topic`, data);
export const updateTopic = (data) => axiosInstance.put(`/topics/update_topic`, data);
export const deleteTopic = (id) => axiosInstance.delete(`/topics/delete_topic`, { data: { _id: id } });
export const getTopics = () => axiosInstance.get(`/topics`);

