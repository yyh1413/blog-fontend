import Taro from "@tarojs/taro";
import { CACHE_CODE, CACHE_TOKEN, CACHE_USERINFO } from "./authority/config";
import { NODE_DEV_API, NODE_FUND_DEV_API, NODE_PRODUCTION_API } from "./config";

// 错误定义
const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

// 获取基础域名
const getBaseUrl = (fund) => {
  let BASE_URL = "";
  if (fund) {
    BASE_URL = NODE_FUND_DEV_API;
    return BASE_URL;
  }
  if (process.env.NODE_ENV === "development") {
    BASE_URL = NODE_DEV_API;
    //  BASE_URL = NODE_PRODUCTION_API;
  } else {
    BASE_URL = NODE_PRODUCTION_API;
  }
  return BASE_URL;
};

function handleError(res, reject) {
  if (res.code === 401) {
    Taro.setStorageSync(CACHE_TOKEN, undefined);
    Taro.setStorageSync(CACHE_CODE, undefined);
    Taro.setStorageSync(CACHE_USERINFO, undefined);
    // Taro.redirectTo({
    //   url: "/pages/login/index",
    // });
    reject();
  }
  reject("handleError异常");
}
function formatData<T>(data: IResult<T>) {
  return {
    code: data.code,
    msg: data.msg,
    data: data.data,
  };
}
interface IResult<T> {
  code: number;
  msg: string;
  data: T;
}

const request = <T>(
  url: string,
  param = {},
  method,
  fund,
  header = {},
  load
) => {
  load &&
    Taro.showLoading({
      title: "加载中",
    });
  const BASE_URL = getBaseUrl(fund);
  const token = Taro.getStorageSync(CACHE_TOKEN);

  const handleHeader = {
    "content-type": "application/json",
    Authorization: `Bearer ` + token,
    ...header,
  };
  return new Promise<IResult<T>>((resolve, reject) => {
    const options = {
      url: `${BASE_URL}${url}`,
      data: param,
      method,
      header: handleHeader,
    };
    Taro.request({
      ...options,
      success(result) {
        const { data } = result;
        if (!fund && data.code !== 200) {
          handleError(data, reject);
        } else {
          const res = formatData<T>(fund ? result : data);
          resolve(res);
        }
      },
      fail(e) {
        console.log("网络异常");
        reject(e);
      },
      complete() {
        load && Taro.hideLoading();
      },
    });
  });
};

function get<T>(url, param?: any, fund = false, load = true) {
  return request<T>(url, param, "get", fund, undefined, load);
}
function post<T>(url, param, fund = false, load = true) {
  return request<T>(url, param, "post", fund, undefined, load);
}

export default { get, post };
