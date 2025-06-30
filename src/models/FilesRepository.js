import { requests } from "./Base"

const version = "/api/v1"

class FilesRepository {
  async uploadFile(file) {
    const urlApi = `${version}/files`
    const response = await requests.postFile(urlApi, file)

    return response?.data
  }

  async getFiles(params) {
    const urlApi = `${version}/files`
    const response = await requests.get(urlApi, { params })

    return response?.data
  }

  async updateFile(id, data) {
    const urlApi = `${version}/files/${id}`
    const response = await requests.put(urlApi, data)

    return response?.data
  }

  async deleteFile(id) {
    const urlApi = `${version}/files/${id}`
    const response = await requests.delete(urlApi)

    return response?.data
  }
}

export default new FilesRepository()
