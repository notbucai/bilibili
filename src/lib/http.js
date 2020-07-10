/*
 * @Author: bucai
 * @Date: 2020-07-10 09:49:55
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 10:01:47
 * @Description: 
 */
const axios = require('axios');

const http = axios.create({

});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['referer'] = 'https://space.bilibili.com/214583918';
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // return Promise.reject(response.data);
  const resData = response.data;
  if (resData.code === 0) {
    return resData.data;
  }
  return Promise.reject(resData);
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

module.exports = http;