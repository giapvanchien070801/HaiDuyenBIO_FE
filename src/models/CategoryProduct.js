import { requests } from "./Base";
const version = "/api/v1";

class CategoryProduct {
  getCategoryProductList = async (params) => {
    const urlApi = `${version}/categories`;
    const response = await requests.get(urlApi, { params });

    return response?.data;
  };

  createCategoryProduct = async (data) => {
    const urlApi = `${version}/categories`;
    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  updateCategoryProduct = async (id, data) => {
    const urlApi = `${version}/categories/${id}`;
    const response = await requests.put(urlApi, data);

    return response?.data;
  };

  deleteCategoryProduct = async (id) => {
    const urlApi = `${version}/categories/${id}`;
    const response = await requests.delete(urlApi);

    return response?.data;
  };

  getDetailCategoryProduct = async (id) => {
    const urlApi = `${version}/categories/${id}`;
    const response = await requests.get(urlApi);

    return response?.data;
  };
}

export default new CategoryProduct();
