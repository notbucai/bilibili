/*
 * @Author: bucai
 * @Date: 2020-07-10 09:46:31
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 15:02:44
 * @Description: 
 */
const http = require('../lib/http');

module.exports = async (mid, type = 0) => {
  let urls = ['https://api.bilibili.com/x/relation/followers', 'https://api.bilibili.com/x/relation/followings'];
  const req = await http.get((urls[type] || urls[0]) + '?vmid=' + mid);
  return req;
}