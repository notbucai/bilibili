/*
 * @Author: bucai
 * @Date: 2020-07-10 09:49:55
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-13 17:33:41
 * @Description: 
 */
const axios = require('axios');

const tunnel = require('tunnel');

const http = axios.create({
  timeout:1500,
});

let proxys = [{"IP":"60.169.214.160:28803","ExpireTime":"2020-07-10 20:54:10","IpAddress":"辽宁省葫芦岛市 联通","ISP":"联通"}];

const getProxyData = async () => {
  const res = await axios.get('http://t.11jsq.com/index.php/api/entry?method=proxyServer.generate_api_url&packid=1&fa=0&groupid=0&fetch_key=&time=1&qty=200&port=1&format=json&ss=5&css=&ipport=1&et=1&pi=1&co=1&pro=&city=&usertype=20');
  const resData = res.data;
  if (resData.code == 0) {
    console.table(resData.data);
    proxys = resData.data;
  }
  setTimeout(() => {
    getProxyData();
  }, 60*1000);
}
// getProxyData();

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // const proxyStr = proxys[(Math.random() * proxys.length) | 0].IP.split(':');
  // const tunnelProxy = tunnel.httpsOverHttp({
  //   proxy: {
  //     host: proxyStr[0],
  //     port: proxyStr[1],
  //   },
  // });

  // 在发送请求之前做些什么
  config.headers['referer'] = 'https://space.bilibili.com/214583918';
  // config.proxy = 'http://182.34.203.85:26414';
  // config.proxy = false;
  // config.httpsAgent = tunnelProxy;
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