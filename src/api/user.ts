import { urlEncode } from "../utils/utils";
import api from "../utils/http";

function login(param) {
  const url = urlEncode("api/user/login", param);
  return api.get<any>(url);
}

export { login };
