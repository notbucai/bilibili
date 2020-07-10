/*
 * @Author: bucai
 * @Date: 2020-07-10 09:45:29
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 10:48:35
 * @Description: 
 */

const { require_context } = require('../utils');

const module_tmp = require_context(__dirname, /index\.js/);
console.table(module_tmp);
const modules = module_tmp.filter(item => item.module).reduce((pv, cv) => {
  pv[cv.name] = cv.module;
  return pv;
}, {});

module.exports = modules;