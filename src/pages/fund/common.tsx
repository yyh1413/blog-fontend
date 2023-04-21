import Taro from "@tarojs/taro";


export function handleFundInfoPage(code) {

  Taro.navigateTo({
    url: "/pages/fund/view/info/index?code=" + code,
  });
}


export const fundType = Object.entries({
  "基金类型（全部）": 0,
  "股票": 25,
  "混合": 27,
  "指数": 26,
  "债券": 31,
  "货币": 35,
  "QDII": 6,
}).map(v => ({ text: v[0], value: v[1] + '' }))

export const fundType1 = Object.entries({
  "筛选方案（全部）": "0",
  "金牛奖": "022",
  "五星评级": "006",
  "高股息红利": "029",
  "优质债券": "038",
  "高夏普比率": "021",
  "持续霸榜": "025",
  "沪深 300 指数增强": "030",
  "十年老牌": "031",
  "低回撤": "034",
  "电子信息主题": "044",
}).map(v => ({ text: v[0], value: v[1] }))


export const titeType = Object.entries({
  "日涨幅": "RZDF",
  "近1周": "SYL_Z",
  "近1月": "SYL_Y",
  "近3月": "SYL_3Y",
  "近6月": "SYL_6Y",
  // "今年来": "SYL_JN",
  "近1年": "SYL_1N",
  "近2年": "SYL_2N",
  "近3年": "SYL_3N",
  "近5年": "SYL_5N",
  "成立来": "SYL_LN"
}).map(v => ({ text: v[0], value: v[1] }))

export const recommendType = Object.entries({
  "医疗": "1",
  "半导体概念": "1",
  "白酒": "1",
  "保险": "0",
  "光伏建筑一体化": "0",
  "刀片电池": "2",
}).map(v => ({ name: v[0], type: v[1] }))

