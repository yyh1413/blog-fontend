import Taro from "@tarojs/taro";


export function handleFundInfoPage(code) {
  Taro.navigateTo({
    url: "/pages/fund/view/info/index?code=" + code,
  });
}