import { stock } from "../interface/essay";
import api from "../utils/http";
import common from "../utils/common";
import { formatFundData, formatFundInfoData } from "../utils/famatData";
import { urlEncode } from "../utils/utils";

//查询股票行情的API接口
async function getStockData() {
  const value = [
    "s_sh000001", // 上证指数
    "s_sz399001", // 深证指数
    "s_sz399006", // 创业板指
    "s_sh000300", // 沪深300
    "s_sh000016", // 上证50
    "s_sh000905", // 中证500
  ];
  let result = await api.post<Array<stock>>("api/fund/getStockData", {
    str: value.join(","),
  });
  result.data.forEach((v) => {
    if (!v.change.includes("-")) {
      v.change = "+" + v.change;
    }
    if (!v.changePercent.includes("-")) {
      v.changePercent = "+" + v.changePercent + "%";
    } else {
      v.changePercent = v.changePercent + "%";
    }
  });

  return result;
}

//查询股票行情的API接口
async function getHoldFundListData(fcode?: any[]) {
  const holdCode = fcode || common.holdCode;
  const urlarr = [
    "fund/fundVarietieValuationDetail", // 获取估值实时 和详情
    "fund/fundVPageDiagram", // 获取净值
    "fund/fundMNPeriodIncrease", // 获取涨幅
  ];
  const qe: Promise<any>[] = [];
  holdCode.forEach((v) => {
    urlarr.forEach((j) => {
      qe.push(api.get<any>(j, v, true));
    });
  });
  const res = await Promise.all(qe).then((v) => {
    let value = formatFundData(v);
    if (fcode) {
      value = formatFundInfoData(value, v);
    }
    return value;
  });
  return res;
}

async function getFundInfoData(c) {
  const value = await getHoldFundListData([c]);
  const info = await api.get<any>("fund/fundMNDetailInformation", c, true);
  const param = { ...value[0], ...info.data.Datas };
  return param;
}

async function getPerformanceData(param) {
  const res = await api.get<any>("fund/fundVPageAcc", param, true);
  return res;
}
async function getFundFilesData(param) {
  const res = await api.get<any>("fund/fundMNMangerList", param, true);
  return res;
}
async function getMangerInfoData(param) {
  const res = await api.get<any>("fund/fundMSNMangerInfo", param, true);
  return res;
}
async function getGSInfoData(param) {
  const res = await api.get<any>(
    `fund/companyApi2?action=companyarchives`,
    param,
    true
  );
  return res;
}
async function getFundRankData(param) {
  const url = urlEncode("fund/fundMNRank", param);
  const res = await api.get<any>(url, undefined, true);
  return res;
}
async function getFundSearchData(param) {
  const res = await api.get<any>('fund/fundSearch', param, true);
  return res;
}
export {
  getFundSearchData,
  getFundRankData,
  getGSInfoData,
  getMangerInfoData,
  getStockData,
  getHoldFundListData,
  getFundInfoData,
  getPerformanceData,
  getFundFilesData,
};
