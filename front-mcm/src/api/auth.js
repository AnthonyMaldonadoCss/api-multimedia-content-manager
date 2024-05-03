import axios from "axios";

const API = 'http://localhost:3000/apiv1';

export const registerRequest = (user) => axios.post(`${API}/users/register`, user);