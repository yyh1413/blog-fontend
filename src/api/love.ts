import api from "../utils/http";

function getMapDepotData(param?: any) {
  return api.post<any>("api/common/getMapDepotData", param);
}

export { getMapDepotData };
