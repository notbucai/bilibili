/*
 * @Author: bucai
 * @Date: 2020-07-09 21:19:17
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 14:09:37
 * @Description: 
 */
const sql = "INSERT INTO users SET ?";

module.exports = (db) => {

  return (user) => {

    return new Promise((ok, gg) => {

      db.query(sql, user, (err) => {

        if (err) return gg(err);
        ok();
      });
    });

  }

}