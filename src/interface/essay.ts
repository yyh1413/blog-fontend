interface IEssay {
  _id: string;
  title: string;
  picture: string;
  readingVolume: number;
  likeNumber: number;
  wordNumber: number;
  commentsNumber: number;
  classfiy: [];
  label: [];
  content: string;
  userId: number;
  userName: string;
  createTime: string;
  updateTime: string;
  remark: string;
}

interface IClassfiy {
  classfiyName: string;
  fileName: string;
  path: string;
  active?: boolean;
}
interface stock {
  name: string; // ：股票名称，如 "上证指数"。
  code: string; // 股票代码，如 "000001" 表示上证指数。
  point: string; // 当前点数，如 "3338.15"。
  change: string; // 涨跌值，如 "19.79"，表示相对于前一个交易日收盘价的涨跌幅度。
  changePercent: string; // 涨跌幅，如 "0.60%"，表示相对于前一个交易日收盘价的涨跌幅百分比。
  volume: string; // 成交量，如 "338299275"，表示当日该股票的成交量。
  amount: string; // 成交额，如 "47834542"，表示当日该股票的成交额，单位为元。
}
export { IEssay, IClassfiy ,stock};
