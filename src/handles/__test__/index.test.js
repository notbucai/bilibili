const handles = require('../index');
// jest.mock('../saveUser');

describe('测试处理模块的加载情况', () => {
  
  it('测试模块加载', () => {
    expect(Object.keys(handles).length).toBe(1);
  });

});