import { requests } from "./Base"

const version = "/api/v1"

class Product {
  async getProductList(params) {
    const urlApi = `${version}/products`
    const response = await requests.get(urlApi, { params })

    return response?.data
  }

  async getProductDetail(id) {
    const urlApi = `${version}/products/${id}`
    const response = await requests.get(urlApi)

    return response?.data
  }

  async createProduct(data) {
    const urlApi = `${version}/products`
    const response = await requests.post(urlApi, data)

    return response?.data
  }

  async updateProduct(id, data) {
    const urlApi = `${version}/products/${id}`
    const response = await requests.put(urlApi, data)

    return response?.data
  }

  async deleteProduct(id) {
    const urlApi = `${version}/products/${id}`
    const response = await requests.delete(urlApi)

    return response?.data
  }
}

export default new Product()
