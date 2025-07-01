import { requests } from "./Base"

const version = "/api/v1"

class ArticleModal {
  async getArticleList(params) {
    const urlApi = `${version}/articles`
    const response = await requests.get(urlApi, { params })
    return response?.data
  }

  async createArticle(data) {
    const urlApi = `${version}/articles`
    const response = await requests.post(urlApi, data)
    return response?.data
  }

  async updateArticle(id, data) {
    const urlApi = `${version}/articles/${id}`
    const response = await requests.put(urlApi, data)
    return response?.data
  }

  async deleteArticle(id) {
    const urlApi = `${version}/articles/${id}`
    const response = await requests.delete(urlApi)
    return response?.data
  }

  async getArticleDetail(id) {
    const urlApi = `${version}/articles/${id}`
    const response = await requests.get(urlApi)
    return response?.data
  }
}

export default new ArticleModal()
