import axios from "axios";
import useAuthStore from "@/stores/useAuthStore";

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

// interceptor: auto-attach authorization header
axiosInstance.interceptors.response.use(
  (config) => {
    // GET session from store
    const session = useAuthStore.getState().session;

    // attach Bearer token if session exists
    if (session?.objectId) {
      config.headers.Authorization = `Bearer ${session.objectId}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor: handle 401 reponses (auto logout)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if 401 unauthorized, clear session
    if (error.response?.status === 401) {
      const { clearSession } = useAuthStore.getState();
      clearSession();

      // redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
