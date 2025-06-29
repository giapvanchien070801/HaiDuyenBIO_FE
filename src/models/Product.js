import { requests } from "./Base";

const version = "/api/v1";

class Product {
  getProductList = async (params) => {
    const urlApi = `${version}/products`;
    const response = await requests.get(urlApi, { params });

    return response?.data;
  };

  getProductDetail = async (id) => {
    const urlApi = `${version}/products/${id}`;
    const response = await requests.get(urlApi);

    return response?.data;
  };

  createProduct = async (data) => {
    const urlApi = `${version}/products`;
    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  updateProduct = async (id, data) => {
    const urlApi = `${version}/products/${id}`;
    const response = await requests.put(urlApi, data);

    return response?.data;
  };

  deleteProduct = async (id) => {
    const urlApi = `${version}/products/${id}`;
    const response = await requests.delete(urlApi);

    return response?.data;
  };
}

export default new Product();
