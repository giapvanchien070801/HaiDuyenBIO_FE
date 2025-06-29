import { requests } from "./Base";

const version = "/api/v1";

class ArticleModal {
  getArticleList = async (params) => {
    const urlApi = `${version}/articles`;
    const response = await requests.get(urlApi, { params });

    return response?.data;
  };

  createArticle = async (data) => {
    const urlApi = `${version}/articles`;
    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  updateArticle = async (id, data) => {
    const urlApi = `${version}/articles/${id}`;
    const response = await requests.put(urlApi, data);

    return response?.data;
  };

  deleteArticle = async (id) => {
    const urlApi = `${version}/articles/${id}`;
    const response = await requests.delete(urlApi);

    return response?.data;
  };

  getArticleDetail = async (id) => {
    const urlApi = `${version}/articles/${id}`;
    const response = await requests.get(urlApi);

    return response?.data;
  };
}

export default new ArticleModal();
