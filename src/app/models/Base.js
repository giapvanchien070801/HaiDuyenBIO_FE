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
  delete: (url) => axiosInstance.delete(`${API_ROOT}${url}`),
};

class Base {
  // API login
  loginAdmin = async (data) => {
    const urlApi = `/api/user/login`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  //----------------------------------Api Thể loại bài viết --------------------------//
  // api lấy danh sách thể loại bài viết, có phân trang
  getListCatePagination = async (data) => {
    const urlApi = `/api/category/get-page`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  // api lấy chi tiết thể loại bài viết, có phân trang
  getDetailCate = async (categoryId) => {
    const urlApi = `/api/category/get-detail/${categoryId}`;
    const response = await requests.get(urlApi);
    return response?.data;
  };

  // api lấy chi tiết thể loại bài viết, có phân trang
  getAllCategory = async () => {
    const urlApi = `/api/category/get-all`;
    const response = await requests.get(urlApi);
    return response?.data;
  };

  // api tạo mới thể loại bài viết
  createCategory = async (data) => {
    const urlApi = `/api/category/create`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  // api sửa thể loại bài viết
  updateCategory = async (data) => {
    const urlApi = `/api/category/update`;
    const response = await requests.put(urlApi, data);
    return response?.data;
  };

  // api xóa thể loại bài viết
  deleteCategory = async (categoryId) => {
    const urlApi = `/api/category/delete/${categoryId}`;
    const response = await requests.delete(urlApi);
    return response?.data;
  };
}
export default new Base("");
