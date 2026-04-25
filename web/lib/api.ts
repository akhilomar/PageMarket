import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: typeof window === "undefined" ? env.apiUrl : "/api",
  withCredentials: true
});
