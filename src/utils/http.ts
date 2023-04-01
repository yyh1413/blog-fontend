import Taro from "@tarojs/taro";

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
const getBaseUrl = () => {
  let BASE_URL = "";

  if (process.env.NODE_ENV === "development") {
    BASE_URL = process.env.NODE_API!;
  } else {
    BASE_URL = "http://172.0.0.1:8000/";
  }
  return BASE_URL;
};

// 拦截器
const interceptor = (chain) => {
  const requestParams = chain.requestParams;
  return chain.proceed(requestParams).then((res) => {
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在");
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现问题");
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      return Promise.reject("无权访问");
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      return Promise.reject("需要鉴权");
    } else {
      return res.data;
    }
  });
};

// 添加拦截器
Taro.addInterceptor(interceptor);
Taro.addInterceptor(Taro.interceptors.logInterceptor);

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
const request = <T>(url: string, param = {}, method, header = {}) => {
  Taro.showLoading({
    title: "加载中",
  });
  // const BASE_URL = getBaseUrl();
  // const BASE_URL = "http://127.0.0.1:8000/";
  const BASE_URL = "http://10.4.95.50:8000/";

  const handleHeader = {
    "content-type": "application/json",
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
        const res = formatData<T>(data);
        resolve(res);
      },
      fail(e) {
        console.log("网络异常");
        reject(e);
      },
      complete() {
        Taro.hideLoading();
      },
    });
  });
};

function get<T>(url, param?: any) {
  return request<T>(url, param, "get");
}
function post<T>(url, param) {
  return request<T>(url, param, "post");
}

export default { get, post };
