import { requests } from "./Base";

const version = "/api/v1";

class Article {
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
}

export default new Article();
