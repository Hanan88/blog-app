import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface AxiosConfig extends AxiosRequestConfig {
  baseURL: string;
  timeout: number;
  headers: {
    "Content-Type": string;
  };
}

const axiosInstance: AxiosInstance = axios.create(
  {
    baseURL: "http://localhost:3001",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json"
    }
  } as AxiosConfig
);

export default axiosInstance;
