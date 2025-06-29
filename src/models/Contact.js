import { requests } from "./Base";

const version = "/api/v1";

class ContactModel {
  getContactList = async (params) => {
    const urlApi = `${version}/contacts`;
    const response = await requests.get(urlApi, { params });

    return response?.data;
  };

  createContact = async (data) => {
    const urlApi = `${version}/contacts`;
    const response = await requests.post(urlApi, data);

    return response?.data;
  };

  updateStatusContact = async (id, status) => {
    const urlApi = `${version}/contacts/${id}/${status}`;
    const response = await requests.put(urlApi);

    return response?.data;
  };

  deleteContact = async (id) => {
    const urlApi = `${version}/contacts/${id}`;
    const response = await requests.delete(urlApi);

    return response?.data;
  };
}

export default new ContactModel();
