/*
 * @Author: bucai
 * @Date: 2020-07-09 21:14:37
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 09:36:06
 * @Description: 
 */
const db = require('../lib/db');
const { require_context } = require('../utils');
const temp_modules = require_context(__dirname, /index\.js/);

const modulesArr = temp_modules.map(({ filename, module, name }) => {
  const status = typeof module == 'function';
  return {
    name,
    filename,
    module,
    handle: status ? module(db) : module,
    status
  }
});
// 展示模块
console.table(modulesArr);

const modules = modulesArr.filter(item=>item.status).reduce((pv, cv) => {
  pv[cv.name] = cv.handle;
  return pv;
}, {});

module.exports = modules;