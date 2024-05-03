import axiosInstance from "./axios";

export const registerRequest = (user) => axiosInstance.post(`/users/register`, user);
export const loginRequest = (user) => axiosInstance.post(`/users/signin`, user);
export const verifyRequest = () => axiosInstance.post(`/users/verify`);