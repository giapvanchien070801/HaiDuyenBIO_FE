import axios from "axios";
// export const API_ROOT = "https://stagingonedx.vnpt-technology.vn:6443";
export const API_ROOT = "http://192.168.0.103:3017";

const axiosInstance = axios.create({
  baseURL: API_ROOT,
});

// Thiết lập interceptor để thêm token vào mỗi request (nếu có)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage hoặc nơi lưu trữ khác
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requests = {
  get: (url, query) => axiosInstance.get(`${API_ROOT}${url}`, query),
  post: (url, dataSubmit) =>
    axiosInstance.post(`${API_ROOT}${url}`, dataSubmit),
  put: (url, updateData) => axiosInstance.put(`${API_ROOT}${url}`, updateData),
  delete: (url) => axiosInstance.put(`${API_ROOT}${url}`),
};

class Base {
  getListNewService = async ({ size, customerType }) => {
    const urlApi = `/api/portal/service-recommend/new-service`;
    const response = await requests.get(urlApi, {
      params: { size, customerType },
    });
    return response.data;
  };

  getListCategory = async () => {
    const urlApi = `/api/category/get-all`;
    const response = await requests.get(urlApi);
    return response.data;
  };

  loginAdmin = async (data) => {
    const urlApi = `/api/user/login`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };
}
export default new Base("");
