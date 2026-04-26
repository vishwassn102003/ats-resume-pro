import axios from "axios";

const API = "https://ats-resume-pro-6x15.onrender.com"; // <-- YOUR BACKEND

export const analyze = (data) => axios.post(`${API}/analyze`, data);
export const improve = (data) => axios.post(`${API}/improve`, data);
export const pay = () => axios.post(`${API}/payment`);
