/*
 * @Author: bucai
 * @Date: 2020-07-10 09:38:02
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 14:12:01
 * @Description: 
 */

// 
class User {
  constructor(data) {
    const keys = ["mid", "sex", "face", "sign", "level", "jointime", "moral", "silence", "birthday", "coins", "fans_badge", "top_photo", "rank", "temp"]

    keys.reduce((pv, key) => {
      const value = typeof data[key] == 'object' ? JSON.stringify(data[key]) : data[key];
      pv[key] = value;
      return pv;
    }, this);

    this.temp = JSON.stringify(data);
  }
}

module.exports.User = User;