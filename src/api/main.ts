import api from "../utils/http";
import { IClassfiy, IEssay } from "src/interface/essay";

interface IEssayParam {
  _id?: string;
  classfiyName?: string;
  title?: string;
  type?: number;
}
// 获取文章的list
function getEssayData(param?: IEssayParam) {
  return api.get<any>("api/blog/list", param);
}
// 获取分类列表
function getClassfiyData(param?: any) {
  return api.get<IClassfiy[]>("api/blog/getClassfig", param);
}

export { getEssayData, getClassfiyData };
