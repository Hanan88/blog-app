"use client";

import { useQuery, UseQueryResult } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useFetchData = <T>(url: string): UseQueryResult<T, Error> => {
  const fetchData = async (): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  };

  return useQuery<T, Error>(url, fetchData);
};

export default useFetchData;
