import Taro from "@tarojs/taro";
const info = Taro.getSystemInfoSync();
const menu = Taro.getMenuButtonBoundingClientRect();
// console.log(info, menu);

const sysInfo = {
  custom: Taro.getMenuButtonBoundingClientRect(),
  safeBottom: info.statusBarHeight,
};
const SysInfo = (state = sysInfo, action) => {
  switch (action.type) {
    case "setsafe":
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default SysInfo;
