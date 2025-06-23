import { requests } from "./Base";

const version = "/api/v1";

class Product {
  getProductList = async (params) => {
    const urlApi = `${version}/products`;
    const response = await requests.get(urlApi, { params });

    return response?.data;
  };
}

export default new Product();
