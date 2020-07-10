/*
 * @Author: bucai
 * @Date: 2020-07-10 09:46:31
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 10:33:11
 * @Description: 
 */
const http = require('../lib/http');

module.exports = async (mid) => {
  const req = await http.get('https://api.bilibili.com/x/space/upstat?mid=' + mid);
  return req;
}