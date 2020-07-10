/*
 * @Author: bucai
 * @Date: 2020-07-09 21:19:17
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-10 14:28:51
 * @Description: 
 */
const sql = "SELECT COUNT(*) as count FROM `users` WHERE `mid` = ?";

module.exports = (db) => {
  return (mid) => {
    return new Promise((ok, gg) => {
      db.query({
        sql,
        values: [mid]
      }, (err, results) => {
        if (err) return gg(err);
        if (results[0].count <= 0) return ok();
        return gg();
      });
    });
  }
}