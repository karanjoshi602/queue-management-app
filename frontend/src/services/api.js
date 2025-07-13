import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


export const getQueues = () => API.get("/queues");
export const createQueue = (data) => API.post("/queues", data);
export const deleteQueue = (queueId) => API.delete(`/queues/${queueId}`);


export const addToken = (data) => API.post("/tokens", data);
export const assignToken = (tokenId) => API.put(`/tokens/assign/${tokenId}`);
export const cancelToken = (tokenId) => API.put(`/tokens/cancel/${tokenId}`);
export const deleteToken = (tokenId) => API.delete(`/tokens/${tokenId}`);
export const updateTokenStatus = (tokenId, status) =>
  API.put(`/tokens/${tokenId}/status`, { status });


export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
