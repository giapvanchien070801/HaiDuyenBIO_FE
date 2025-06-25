import axios from "axios";
import { Cookies } from "react-cookie";
// export const API_ROOT = "http://192.168.0.103:3017";
// export const API_ROOT = "http://localhost:3017";
// export const API_ROOT = "https://nogulstore-base.onrender.com";
export const API_ROOT = "http://103.90.226.77:8080";

const axiosInstance = axios.create({
  baseURL: API_ROOT,
});

// Thiết lập interceptor để thêm token vào mỗi request (nếu có)
axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken"); // Lấy token từ cookies  hoặc nơi lưu trữ khác
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const requests = {
  get: (url, query) => axiosInstance.get(`${API_ROOT}${url}`, query),
  post: (url, dataSubmit) =>
    axiosInstance.post(`${API_ROOT}${url}`, dataSubmit),
  put: (url, updateData) => axiosInstance.put(`${API_ROOT}${url}`, updateData),
  delete: (url) => axiosInstance.delete(`${API_ROOT}${url}`),
  postFile: (url, formData) =>
    axiosInstance.post(`${API_ROOT}${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
