import axios from "axios";

const API = "https://your-backend-url";

export const analyze = (data) => axios.post(`${API}/analyze`, data);
export const improve = (data) => axios.post(`${API}/improve`, data);
export const pay = () => axios.post(`${API}/payment`);
