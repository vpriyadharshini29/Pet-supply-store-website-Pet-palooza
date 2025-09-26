import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g. http://127.0.0.1:8000/api/
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to requests if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle 401 globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid or expired
      localStorage.removeItem("token");
      window.location.href = "/auth"; // redirect to login page
    }
    return Promise.reject(error);
  }
);

export default API;

// ✅ Example API calls
export const getBanners = () => API.get("banners1/"); 
export const getPromos = () => API.get("promos/");
export const getNavbarItems = () => API.get("navbar/"); 
export const getProducts = () => API.get("products/"); 
export const getPets = () => API.get("pets/"); 
export const getFooterSections = () => API.get("footer-sections/");
export const getSiteImages = () => API.get("site-images/");


