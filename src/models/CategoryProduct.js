import { requests } from "./Base"
const version = "/api/v1"

class CategoryProduct {
  async getCategoryProductList(params) {
    const urlApi = `${version}/categories`
    const response = await requests.get(urlApi, { params })

    return response?.data
  }

  async createCategoryProduct(data) {
    const urlApi = `${version}/categories`
    const response = await requests.post(urlApi, data)

    return response?.data
  }

  async updateCategoryProduct(id, data) {
    const urlApi = `${version}/categories/${id}`
    const response = await requests.put(urlApi, data)

    return response?.data
  }

  async deleteCategoryProduct(id) {
    const urlApi = `${version}/categories/${id}`
    const response = await requests.delete(urlApi)

    return response?.data
  }

  async getDetailCategoryProduct(id) {
    const urlApi = `${version}/categories/${id}`
    const response = await requests.get(urlApi)

    return response?.data
  }
}

export default new CategoryProduct()
