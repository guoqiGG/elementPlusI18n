import axios from "axios";
import { tansParams, blobValidate } from "../utils/ruoyi";
const service = axios.create({
  timeout: 1000 * 60 * 60 * 12,
  baseURL: "/api",
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    if (localStorage.getItem("token"))
      config.headers.Authorization = localStorage.getItem("token");
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    if (
      config.method == "post" &&
      config.data != undefined &&
      config.data != {}
    ) {
      let obj = JSON.parse(config.data);
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          // 确保属性是对象自身的而不是从原型链继承的
          if ((obj[key] == " " || obj[key] == "") && obj[key] != 0) {
            // 假设我们只想修改字符串类型的值
            obj[key] = null;
          }
        }
      }
      config.data = JSON.stringify(obj);
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    if (response.data.code == 500) {

      return;
    }

    return response.data;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

export default service;
