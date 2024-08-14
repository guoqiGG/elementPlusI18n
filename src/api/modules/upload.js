import service from "../request";
// 图片base64上传
export function uploadImageByBase64(query) {
  return service({
    method: "POST",
    url: "/upload/base64",
    data: JSON.stringify(query),
  });
}
