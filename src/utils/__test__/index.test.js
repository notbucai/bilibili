/*
 * @Author: bucai
 * @Date: 2020-07-09 22:59:46
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-09 23:14:57
 * @Description: 
 */
const { require_context } = require("..");
const path = require('path');

it('测试加载模块', () => {
  const modules = require_context(path.join(__dirname,'./mock/modules'),/123123/);
  expect(Object.keys(modules).length).toBe(3);
});