import { requests } from "./Base"

const version = "/api/v1"

class Order {
  async getOrderList(params) {
    const urlApi = `${version}/orders`
    const response = await requests.get(urlApi, { params })

    return response?.data
  }

  async getOrderDetail(id) {
    const urlApi = `${version}/orders/${id}`
    const response = await requests.get(urlApi)

    return response?.data
  }

  async createOrder(data) {
    const urlApi = `${version}/orders`
    const response = await requests.post(urlApi, data)

    return response?.data
  }

  async updateOrder(id, data) {
    const urlApi = `${version}/orders/${id}`
    const response = await requests.put(urlApi, data)

    return response?.data
  }

  async deleteOrder(id) {
    const urlApi = `${version}/orders/${id}`
    const response = await requests.delete(urlApi)

    return response?.data
  }

  async updateStatusOrder(id, data) {
    const urlApi = `${version}/orders/${id}/status`
    const response = await requests.put(urlApi, data)

    return response?.data
  }
}

export default new Order()
