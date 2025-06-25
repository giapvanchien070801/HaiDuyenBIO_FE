import { requests } from "./Base";

const version = "/api/v1";

class Order {
  getOrderList = async (params) => {
    const urlApi = `${version}/orders`;
    const response = await requests.get(urlApi, { params });

    return response?.data;
  };

  getOrderDetail = async (id) => {
    const urlApi = `${version}/orders/${id}`;
    const response = await requests.get(urlApi);

    return response?.data;
  };

  createOrder = async (data) => {
    const urlApi = `${version}/orders`;
    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  updateOrder = async (id, data) => {
    const urlApi = `${version}/orders/${id}`;
    const response = await requests.put(urlApi, data);

    return response?.data;
  };

  deleteOrder = async (id) => {
    const urlApi = `${version}/orders/${id}`;
    const response = await requests.delete(urlApi);

    return response?.data;
  };
}

export default new Order();
