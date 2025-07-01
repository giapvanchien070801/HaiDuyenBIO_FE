import axios from "axios"
import NProgress from "nprogress"
import * as process from "process"
// import authConfig from "src/configs/auth";
// import { getURL } from "@/constants";
import { message } from "antd"

const BASE_URL = process.env.REACT_APP_API_BASEURL

const config = {
  baseURL: BASE_URL,
  timeout: 1000 * 60,
  withCredentials: false,
  maxRedirects: 3,
  headers: {
    "Content-Type": " application/json;charset=UTF-8"
  }
}

const axiosConfig = axios.create(config)
axiosConfig.interceptors.request.use(
  function () {
    NProgress.start()
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosConfig.interceptors.response.use(
  function (response) {
    NProgress.done()

    if (response.data) {
      const { msg, status } = response.data
      if (status === 1 && !!msg) {
        message.error(msg).then()
      }
    }

    return response && response.data
  },
  function (error) {
    const { response } = error

    /** Kiểm tra xem lỗi xảy ra có phải do chủ động hủy request hay không */
    const manuallyAborted = error?.config?.signal?.aborted

    NProgress.done()

    /** Trường hợp lỗi xảy ra do chủ động hủy request */
    if (manuallyAborted) return

    /** Trường hợp lỗi xảy ra ngoài ý muốn */
    if (typeof window !== "undefined" && !window.navigator.onLine) {
      // Mất mạng
      message.error("Network Error")
    } else if (response && response.status === 502) {
      // Server đang bảo trì (HTTP status code 502)
      message.error("Server đang bảo trì, vui lòng thử lại sau")
    } else if (response && response.status === 403) {
      message.error("Bạn không được cấp quyền với chức năng này")
    } else if (!response) {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau ít phút.")
    }

    return Promise.reject(error)
  }
)

export { axiosConfig }
