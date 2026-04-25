import axios from "axios";
import { getToken } from "@/storage/token";

const apiBaseUrl = "http://10.0.2.2:3000/api";

export const api = axios.create({
  baseURL: apiBaseUrl
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

