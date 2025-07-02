import { message } from "antd"
import axios from "axios"
import { Cookies } from "react-cookie"
// export const API_ROOT = "http://192.168.0.103:3017";
// export const API_ROOT = "http://localhost:3017";
// export const API_ROOT = "https://nogulstore-base.onrender.com";
// export const API_ROOT = "http://103.90.226.77:8080";
export const API_ROOT = "https://haiduyenbiobe.haiduyenbio.com"

const axiosInstance = axios.create({
  baseURL: API_ROOT
})

// Thiết lập interceptor để thêm token vào mỗi request (nếu có)
axiosInstance.interceptors.request.use(
  config => {
    const cookies = new Cookies()
    const token = cookies.get("accessToken") // Lấy token từ cookies  hoặc nơi lưu trữ khác
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Thêm token vào header Authorization
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Thiết lập interceptor để xử lý response và kiểm tra token expired
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.status === 401) {
      message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!")
      const cookies = new Cookies()
      cookies.remove("accessToken", { path: "/" })
      setTimeout(() => {
        window.location.href = "/login-admin"
      }, 5000)
    }
    return Promise.reject(error)
  }
)

export const requests = {
  get: (url, query) => axiosInstance.get(`${API_ROOT}${url}`, query),
  post: (url, dataSubmit) => axiosInstance.post(`${API_ROOT}${url}`, dataSubmit),
  put: (url, updateData) => axiosInstance.put(`${API_ROOT}${url}`, updateData),
  delete: url => axiosInstance.delete(`${API_ROOT}${url}`),
  postFile: (url, formData) =>
    axiosInstance.post(`${API_ROOT}${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
}

class Base {
  // API login
  async loginAdmin(data) {
    const urlApi = `/api/user/login`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  //----------------------------------Api Thể loại bài viết --------------------------//
  // api lấy danh sách thể loại bài viết, có phân trang
  async getListCatePagination(data) {
    const urlApi = `/api/category/get-page`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  // api lấy chi tiết thể loại bài viết, có phân trang
  async getDetailCate(categoryId) {
    const urlApi = `/api/category/get-detail/${categoryId}`
    const response = await requests.get(urlApi)
    return response?.data
  }

  // api lấy tất cả thể loại bài viết
  async getAllCategory() {
    const urlApi = `/api/category/get-all`
    const response = await requests.get(urlApi)
    return response?.data
  }

  // api tạo mới thể loại bài viết
  async createCategory(data) {
    const urlApi = `/api/category/create`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  // api sửa thể loại bài viết
  async updateCategory(data) {
    const urlApi = `/api/category/update`
    const response = await requests.put(urlApi, data)
    return response?.data
  }

  // api xóa thể loại bài viết
  async deleteCategory(categoryId) {
    const urlApi = `/api/category/delete/${categoryId}`
    const response = await requests.delete(urlApi)
    return response?.data
  }

  //-----------------------------------Api phòng ban----------------//

  // api lấy danh sách khoa, có phân trang
  async getListDepartmentPagination(data) {
    const urlApi = `/api/department/get-page`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  // api xóa khoa
  async deleteDepartment(departmentId) {
    const urlApi = `/api/department/delete/${departmentId}`
    const response = await requests.delete(urlApi)
    return response?.data
  }

  // api lấy tất cả khoa
  async getAllDepartment() {
    const urlApi = `/api/department/get-all`
    const response = await requests.get(urlApi)
    return response?.data
  }

  // api tạo mới khoa
  async createDepartment(data) {
    const urlApi = `/api/department/create`

    const response = await requests.post(urlApi, data)

    return response?.data
  }

  // api lấy chi tiết khoa
  async getDetailDepartment(departmentId) {
    const urlApi = `/api/department/get-detail/${departmentId}`
    const response = await requests.get(urlApi)
    return response?.data
  }

  // api sửa khoa
  async updateDepartment(data) {
    const urlApi = `/api/department/update`
    const response = await requests.put(urlApi, data)
    return response?.data
  }

  //-----------------------------------Api dịch vụ----------------//

  // api lấy danh sách khoa, có phân trang
  async getListServicePagination(data) {
    const urlApi = `/api/service/get-page`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  // api lấy tất cả dịch vụ
  async getAllService() {
    const urlApi = `/api/service/get-all`
    const response = await requests.get(urlApi)
    return response?.data
  }

  // api tạo mới dịch vụ
  async createService(data) {
    const urlApi = `/api/service/create`

    const response = await requests.post(urlApi, data)

    return response?.data
  }

  // api lấy chi tiết dịch vụ
  async getDetailService(serviceId) {
    const urlApi = `/api/service/get-detail/${serviceId}`
    const response = await requests.get(urlApi)

    return response?.data
  }

  // api sửa dịch vụ
  async updateService(data) {
    const urlApi = `/api/service/update`
    const response = await requests.put(urlApi, data)
    return response?.data
  }

  // api xóa dịch vụ
  async deleteService(serviceId) {
    const urlApi = `/api/service/delete/${serviceId}`
    const response = await requests.delete(urlApi)
    return response?.data
  }

  //------------------------- api danh sách bài viết-------------------//
  // api lấy danh sách bài viết, có phân trang
  async getListPostPagination(data) {
    const urlApi = `/api/post/get-page`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  // api tạo mới dịch vụ
  async createPost(data) {
    const urlApi = `/api/post/create`

    const response = await requests.post(urlApi, data)

    return response?.data
  }

  // api lấy chi tiết bài viết
  async getDetailPost(postId) {
    const urlApi = `/api/post/get-detail/${postId}`
    const response = await requests.get(urlApi)

    return response?.data
  }

  // api sửa bài viết
  async updatePost(data) {
    const urlApi = `/api/post/update`
    const response = await requests.put(urlApi, data)
    return response?.data
  }

  // api xóa bài viết
  async deletePost(postId) {
    const urlApi = `/api/post/delete/${postId}`
    const response = await requests.delete(urlApi)
    return response?.data
  }

  //------------------------------slide--------------------//
  async getAllSlider() {
    const urlApi = `/api/slider/get-all`
    const response = await requests.get(urlApi)
    return response?.data
  }

  // api sửa slider
  async updateSlider(data) {
    const urlApi = `/api/slider/update`
    const response = await requests.put(urlApi, data)
    return response?.data
  }

  //------------------------------upload file--------------------//
  // api upload file
  async uploadFile(data) {
    const urlApi = `api/upload/thumbnail`
    const response = await requests.postFile(urlApi, data)
    return response?.data
  }

  //--------------------------nhân viên----------------//
  // api lấy danh sách nhân viên, có phân trang
  async getListDoctorPagination(data) {
    const urlApi = `/api/doctor/get-page`
    const response = await requests.post(urlApi, data)
    return response?.data
  }
  // api tạo mới nhân sự
  async createDoctor(data) {
    const urlApi = `/api/doctor/create`

    const response = await requests.post(urlApi, data)

    return response?.data
  }

  // api lấy chi tiết nhân sự
  async getDetailDoctor(doctorId) {
    const urlApi = `/api/doctor/get-detail/${doctorId}`
    const response = await requests.get(urlApi)

    return response?.data
  }

  // api sửa nhân sự
  async updateDoctor(data) {
    const urlApi = `/api/doctor/update`
    const response = await requests.put(urlApi, data)
    return response?.data
  }

  // api xóa bác sĩ
  async deleteDoctor(doctorId) {
    const urlApi = `/api/doctor/delete/${doctorId}`
    const response = await requests.delete(urlApi)
    return response?.data
  }

  async getAllDoctor() {
    const urlApi = `/api/doctor/get-all`
    const response = await requests.get(urlApi)
    return response?.data
  }

  //-----------------------------liên hệ------------------------//
  // api lấy danh sách liên hệ, có phân trang
  async getListContactPagination(data) {
    const urlApi = `/api/contact/get-page`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  // api tạo mới liên hệ
  async createContact(data) {
    const urlApi = `/api/contact/create`

    const response = await requests.post(urlApi, data)

    return response?.data
  }

  // api xóa liên hệ
  async deleteContact(contactId) {
    const urlApi = `/api/contact/delete/${contactId}`
    const response = await requests.delete(urlApi)
    return response?.data
  }

  //---------------------------------tài khoản quản trị --------------------------//
  // api lấy danh sách thể loại bài viết, có phân trang
  async getListAccount(data) {
    const urlApi = `/api/user/get-page`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  // api tạo mới tài khoản
  async createAccount(data) {
    const urlApi = `/api/user/create`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  //---------------------------------api lấy thông tin tài khoản đăng nhập --------------------------//
  async getInforAdmin() {
    const urlApi = `/api/user/get-info`
    const response = await requests.get(urlApi)

    return response?.data
  }

  //---------------------------------api lịch hẹn --------------------------//
  async getListSchedulePagination(data) {
    const urlApi = `/api/schedule/get-page`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  // api xóa lịch hẹn
  async deleteSchedule(scheduleId) {
    const urlApi = `/api/schedule/delete/${scheduleId}`
    const response = await requests.delete(urlApi)
    return response?.data
  }

  // api tạo mới lịch hẹn
  async createSchedule(data) {
    const urlApi = `/api/schedule/create`
    const response = await requests.post(urlApi, data)
    return response?.data
  }
}
export default new Base("")
