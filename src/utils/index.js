/*
 * @Author: bucai
 * @Date: 2020-07-09 21:37:50
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-09 23:15:15
 * @Description: 
 */

const fs = require('fs');
const path = require('path');
/**
 * 获取指定目录下的所有模块
 * @param {string} path 路径
 * @returns {Array}
 */
module.exports.require_context = function require_context (pathname, ignore = new RegExp()) {
  const files = fs.readdirSync(pathname);
  
  const modules = files
    .filter(filename => !ignore.test(filename))
    .map(filename => ({
      filename,
      name: path.parse(filename).name,
      path: path.resolve(pathname, filename)
    }))
    .map(item => {
      try {
        return ({
          ...item,
          module: require(item.path)
        })
      } catch (error) {
        return {
          ...item
        }
      }
    });
  return modules;
}
