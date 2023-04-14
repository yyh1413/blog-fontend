import api from "../utils/http";

function getAiData(param?: any) {
  return api.get<any>("api/ai/getdata", param);
}

function getAiInitData() {
  return api.get<any>("api/ai/getAITypeList");
}

export { getAiData, getAiInitData };
