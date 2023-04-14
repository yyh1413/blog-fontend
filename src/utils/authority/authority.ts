import Taro from "@tarojs/taro";
import { CACHE_TOKEN, CACHE_CODE } from "./config";

import { login } from "../../api/user";

export async function authLogin(path, name) {
  const v = await Taro.login();
  if (v.code) {
    await loginMain(v.code);
  } else {
    console.log("登录失败");
  }
  //调用 token 和 储存用户token等信息
  async function loginMain(code) {
    const loginRes = await login({ code, path, name });
    Taro.setStorageSync(CACHE_TOKEN, loginRes.data.token);
    Taro.setStorageSync(CACHE_CODE, loginRes.data.openid);
  }
}
