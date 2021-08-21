import axios from "axios";
import ToastUse from "../common/ToastUse.js";

axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";

//response拦截器
axios.interceptors.response.use(
  (res) => {
    const { status, msg } = res.data.meta; // 200 为登录成功
    if (status === 200 || status === 201) {
      ToastUse.success(msg);
    } else {
      ToastUse.error(`响应错误${status}`);
    }
    return res;
  },
  (err) => {
    console.log("response error", err);
    ToastUse.error("响应错误");
    return Promise.reject(error);
  }
);

//request拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.log("request error", error);
    ToastUse.error("请求错误");
    return Promise.reject(error);
  }
);

export function login(data) {
  return axios.post("login", data);
}

export function getMenus() {
  return axios.get("menus");
}

//user页
export function getUsers(pagenum, pagesize, query = "") {
  return axios.get("users", {
    params: {
      pagenum,
      pagesize,
      query,
    },
  });
}

export function getUserById(id) {
  return axios.get(`users/${id}`);
}

export function changeUser(id, email, mobile) {
  return axios.put(`users/${id}`, {
    email,
    mobile,
  });
}

export function changeUserState(uid, type) {
  return axios.put(`users/${uid}/state/${type}`);
}

export function addUser(username, password, email, mobile) {
  return axios.post("users", {
    username,
    password,
    email,
    mobile,
  });
}

export function assignUser(id, rid) {
  return axios.put(`users/${id}/role`, {
    rid,
  });
}

export function deleteUser(id) {
  return axios.delete(`users/${id}`);
}

//right页
export function getRightList() {
  return axios.get("rights/list");
}

export function getRightTree() {
  return axios.get("rights/tree");
}

//role页
export function getRolesList() {
  return axios.get("roles");
}

export function getRoleById(id) {
  return axios.get(`roles/${id}`);
}

export function addRole(roleName, roleDesc) {
  return axios.post("roles", {
    roleName,
    roleDesc,
  });
}

export function delRole(id) {
  return axios.delete(`roles/${id}`);
}

export function changeRole(id, roleName, roleDesc) {
  return axios.put(`roles/${id}`, {
    roleName,
    roleDesc,
  });
}

export function assignRight(roleId, rightIds) {
  return axios.post(`roles/${roleId}/rights`, {
    rids: rightIds.join(","),
  });
}

export function deleteRight(roleId, rightId) {
  return axios.delete(`roles/${roleId}/rights/${rightId}`);
}

//cate
export function getCateList(pagenum, pagesize, type) {
  const query = `${pagenum ? "pagenum=" + pagenum : ""}&${
    pagesize ? "pagesize=" + pagesize : ""
  }${type ? "&type=" + type : ""}`;

  return axios.get(`categories?${query}`);
}

export function getCateById(id) {
  return axios.get(`categories/${id}`);
}

export function deleteCate(id) {
  return axios.delete(`categories/${id}`);
}

export function changeCate(id, cat_name) {
  return axios.put(`categories/${id}`, {
    cat_name,
  });
}

export function addCate(cat_pid, cat_name, cat_level) {
  return axios.post("categories", {
    cat_pid,
    cat_name,
    cat_level,
  });
}
//params
export function getParamList(id, sel) {
  return axios.get(`categories/${id}/attributes?sel=${sel}`);
}

export function addParam(id, attr_name, attr_sel, attr_vals = "") {
  return axios.post(`categories/${id}/attributes`, {
    attr_name,
    attr_sel,
    attr_vals,
  });
}

export function changeParam(id, attrId, attr_name, attr_sel, attr_vals = "") {
  return axios.put(`categories/${id}/attributes/${attrId}`, {
    attr_name,
    attr_sel,
    attr_vals,
  });
}

export function deleteParam(id, attrId) {
  return axios.delete(`categories/${id}/attributes/${attrId}`);
}

//goods
export function getGoodsList(pagenum, pagesize, query = "") {
  return axios.get(
    `goods?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`
  );
}
export function deleteGood(id) {
  return axios.delete(`goods/${id}`);
}

export function addGood(
  goods_name,
  goods_cat,
  goods_price,
  goods_number,
  goods_weight,
  goods_introduce,
  pics = [],
  attrs = []
) {
  return axios.post("goods", {
    goods_name,
    goods_cat,
    goods_price,
    goods_number,
    goods_weight,
    goods_introduce,
    pics,
    attrs,
  });
}

//orders
export function getOrders(pagenum, pagesize, query = "") {
  return axios.get(
    `orders?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`
  );
}
