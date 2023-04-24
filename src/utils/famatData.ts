export function formatFundData(data) {
  let i = 0;
  let obj: any = {};
  const res: any[] = [];
  data.forEach((v) => {
    if (i === 0) {
      const ex = v.data.Expansion;
      obj.FCODE = ex?.FCODE; //基金code
      obj.SHORTNAME = ex?.SHORTNAME; // 基金名
      obj.GZTIME = ex?.GZTIME; // 估值时间
      obj.GZ = ex?.GZ; // 估值
      obj.GSZZL = ex?.GSZZL; // 估值百分
      obj.DWJZ = ex?.DWJZ; // 前一天估值数
    }
    if (i === 1) {
      const ex = v.data?.data[v.data.data?.length - 1];
      obj.FSRQ = ex?.FSRQ; // 净值时间
      obj.DWJZ = ex?.DWJZ; // 净值
      obj.JZZZL = ex?.JZZZL; // 净值百分
    }
    if (i === 2) {
      //"title": "2021年度", // 具体周期 或者  Z 近一周  Y 近一月  3Y 近三月  6Y 近六月  1N 近1年  2N 近2年  3N 近3年  5N 近5年  JN 今年来  LN 成立来
      const ex = v.data?.Datas as any[];
      ex?.forEach((z) => {
        obj[z.title] = z;
      });
    }
    if (i != 0 && i % 2 === 0) {
      res.push(obj);
      obj = {};
      i = 0;
    } else {
      i++;
    }
  });
  // console.log(res);
  return res;
}

export function formatFundInfoData(value, v) {
  value[0] = {
    ...value[0],
    history: v[2].data?.Datas,
    jz: v[1].data?.data,
  };
  return value;
}

export function convertDaysToYears(days, flag = false) {
  const yearDays = 365; // 一年的天数
  const years = Math.floor(days / yearDays); // 计算年数
  const remainingDays = days % yearDays; // 计算剩余天数
  if (flag) {
    return `${years}年`;
  }
  return `${years}年${remainingDays}天`;
}
export function formatNumber(number, flag = false) {
  if (number >= 1e8) {
    return (number / 1e8).toFixed(flag ? 0 : 2) + "亿";
  } else if (number >= 1e4) {
    return (number / 1e4).toFixed(flag ? 0 : 2) + "万";
  } else {
    return number.toFixed(flag ? 0 : 2);
  }
}
