import axios from "axios";
import { Cookies } from "react-cookie";
// export const API_ROOT = "http://192.168.0.103:3017";
// export const API_ROOT = "http://localhost:3017";
export const API_ROOT = "https://nogulstore-base.onrender.com";

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

  // api lấy tất cả thể loại bài viết
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

  //-----------------------------------Api phòng ban----------------//

  // api lấy danh sách khoa, có phân trang
  getListDepartmentPagination = async (data) => {
    const urlApi = `/api/department/get-page`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  // api xóa khoa
  deleteDepartment = async (departmentId) => {
    const urlApi = `/api/department/delete/${departmentId}`;
    const response = await requests.delete(urlApi);
    return response?.data;
  };

  // api lấy tất cả khoa
  getAllDepartment = async () => {
    const urlApi = `/api/department/get-all`;
    const response = await requests.get(urlApi);
    return response?.data;
  };

  // api tạo mới khoa
  createDepartment = async (data) => {
    const urlApi = `/api/department/create`;

    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  // api lấy chi tiết khoa
  getDetailDepartment = async (departmentId) => {
    const urlApi = `/api/department/get-detail/${departmentId}`;
    const response = await requests.get(urlApi);
    return response?.data;
  };

  // api sửa khoa
  updateDepartment = async (data) => {
    const urlApi = `/api/department/update`;
    const response = await requests.put(urlApi, data);
    return response?.data;
  };

  //-----------------------------------Api dịch vụ----------------//

  // api lấy danh sách khoa, có phân trang
  getListServicePagination = async (data) => {
    const urlApi = `/api/service/get-page`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  // api lấy tất cả dịch vụ
  getAllService = async () => {
    const urlApi = `/api/service/get-all`;
    const response = await requests.get(urlApi);
    return response?.data;
  };

  // api tạo mới dịch vụ
  createService = async (data) => {
    const urlApi = `/api/service/create`;

    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  // api lấy chi tiết dịch vụ
  getDetailService = async (serviceId) => {
    const urlApi = `/api/service/get-detail/${serviceId}`;
    const response = await requests.get(urlApi);

    return response?.data;
  };

  // api sửa dịch vụ
  updateService = async (data) => {
    const urlApi = `/api/service/update`;
    const response = await requests.put(urlApi, data);
    return response?.data;
  };

  // api xóa dịch vụ
  deleteService = async (serviceId) => {
    const urlApi = `/api/service/delete/${serviceId}`;
    const response = await requests.delete(urlApi);
    return response?.data;
  };

  //------------------------- api danh sách bài viết-------------------//
  // api lấy danh sách bài viết, có phân trang
  getListPostPagination = async (data) => {
    const urlApi = `/api/post/get-page`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  // api tạo mới dịch vụ
  createPost = async (data) => {
    const urlApi = `/api/post/create`;

    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  // api lấy chi tiết bài viết
  getDetailPost = async (postId) => {
    const urlApi = `/api/post/get-detail/${postId}`;
    const response = await requests.get(urlApi);

    return response?.data;
  };

  // api sửa bài viết
  updatePost = async (data) => {
    const urlApi = `/api/post/update`;
    const response = await requests.put(urlApi, data);
    return response?.data;
  };

  // api xóa bài viết
  deletePost = async (postId) => {
    const urlApi = `/api/post/delete/${postId}`;
    const response = await requests.delete(urlApi);
    return response?.data;
  };

  //------------------------------slide--------------------//
  getAllSlider = async () => {
    const urlApi = `/api/slider/get-all`;
    const response = await requests.get(urlApi);
    return response?.data;
  };

  // api sửa slider
  updateSlider = async (data) => {
    const urlApi = `/api/slider/update`;
    const response = await requests.put(urlApi, data);
    return response?.data;
  };

  //------------------------------upload file--------------------//
  // api upload file
  uploadFile = async (data) => {
    const urlApi = `api/upload/thumbnail`;
    const response = await requests.postFile(urlApi, data);
    return response?.data;
  };

  //--------------------------nhân viên----------------//
  // api lấy danh sách nhân viên, có phân trang
  getListDoctorPagination = async (data) => {
    const urlApi = `/api/doctor/get-page`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };
  // api tạo mới nhân sự
  createDoctor = async (data) => {
    const urlApi = `/api/doctor/create`;

    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  // api lấy chi tiết nhân sự
  getDetailDoctor = async (doctorId) => {
    const urlApi = `/api/doctor/get-detail/${doctorId}`;
    const response = await requests.get(urlApi);

    return response?.data;
  };

  // api sửa nhân sự
  updateDoctor = async (data) => {
    const urlApi = `/api/doctor/update`;
    const response = await requests.put(urlApi, data);
    return response?.data;
  };

  // api xóa bác sĩ
  deleteDoctor = async (doctorId) => {
    const urlApi = `/api/doctor/delete/${doctorId}`;
    const response = await requests.delete(urlApi);
    return response?.data;
  };

  getAllDoctor = async () => {
    const urlApi = `/api/doctor/get-all`;
    const response = await requests.get(urlApi);
    return response?.data;
  };

  //-----------------------------liên hệ------------------------//
  // api lấy danh sách liên hệ, có phân trang
  getListContactPagination = async (data) => {
    const urlApi = `/api/contact/get-page`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  // api tạo mới liên hệ
  createContact = async (data) => {
    const urlApi = `/api/contact/create`;

    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  // api xóa liên hệ
  deleteContact = async (contactId) => {
    const urlApi = `/api/contact/delete/${contactId}`;
    const response = await requests.delete(urlApi);
    return response?.data;
  };

  //---------------------------------tài khoản quản trị --------------------------//
  // api lấy danh sách thể loại bài viết, có phân trang
  getListAccount = async (data) => {
    const urlApi = `/api/user/get-page`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  // api tạo mới tài khoản
  createAccount = async (data) => {
    const urlApi = `/api/user/create`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  //---------------------------------api lấy thông tin tài khoản đăng nhập --------------------------//
  getInforAdmin = async () => {
    const urlApi = `/api/user/get-info`;
    const response = await requests.get(urlApi);

    return response?.data;
  };

  //---------------------------------api lịch hẹn --------------------------//
  getListSchedulePagination = async (data) => {
    const urlApi = `/api/schedule/get-page`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };

  // api xóa lịch hẹn
  deleteSchedule = async (scheduleId) => {
    const urlApi = `/api/schedule/delete/${scheduleId}`;
    const response = await requests.delete(urlApi);
    return response?.data;
  };

  // api tạo mới lịch hẹn
  createSchedule = async (data) => {
    const urlApi = `/api/schedule/create`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };
}
export default new Base("");
