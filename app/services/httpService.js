import axios from "axios";
import Cookies from "js-cookie";
import { SignOut } from "../hooks/Auth";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.viloxapp.com/api/";
// export const TOKEN =  `Bearer ${sessionStorage !== "undefined" && sessionStorage.VILOX_JWT}`
export const TOKEN =  `Bearer ${Cookies.get("vilox_jwt")}`


const timeoutConfig = {
  timeout: 30000,
  timeoutErrorMessage: "Server taking too long to respond. Try again.",
};

export const apiWithOutAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  ...timeoutConfig,
});

export const apiWithAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
  ...timeoutConfig,
});

export const getApiResponse = (data) => {
  // errors
  return {
    status: true,
    data: data.data,
  };
};

export const getErrorResponse = (error) => {
  if (error.response.status === 401) {
    Cookies.remove('vilox_jwt')
    window !== "undefined" && window.location.reload()
  }
  
  return {
    status: false,
    data: error?.response?.data,
  };
};
