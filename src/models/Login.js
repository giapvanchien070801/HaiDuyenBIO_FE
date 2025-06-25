import { requests } from "./Base";
const version = "/api/v1";

class Login {
  loginAdmin = async (data) => {
    const urlApi = `${version}/auth/login`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };
}

export default new Login();
