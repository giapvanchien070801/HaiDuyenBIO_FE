import { requests } from "./Base";

const version = "/api/v1";

class FilesRepository {
  uploadFile = async (file) => {
    const urlApi = `${version}/files`;
    const response = await requests.postFile(urlApi, file);

    return response?.data;
  };
}

export default new FilesRepository();
