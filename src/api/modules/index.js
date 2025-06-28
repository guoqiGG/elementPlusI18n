import service from "../request";

export function chatGet(query) {
  return service({
    method: "get",
    url: "/chatGet",
    params: query,
  })
}

export function chatPost(data) {
  return service({
    method: "POST",
    url: "/chatPost",
  })
}

// 获取deepSeek的所有模型
export function deepseekModel(data) {
  return service({
    method: "POST",
    url: "/modelsGet",
  })
}
