import request from "@/utils/spRequest";

export function QueryPackingHistory(data) {
  return request({
    url: "/api/packing/QueryPackingHistory",
    method: "post",
    data
  });
}