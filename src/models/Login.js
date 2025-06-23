import { requests } from "./Base";

class Login {
  loginAdmin = async (data) => {
    const urlApi = `/api/user/login`;
    const response = await requests.post(urlApi, data);
    return response?.data;
  };
}

export default new Login();