// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init() //
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
 try {
  return await db.collection('asklist')
   .orderBy("createTime","desc")//新发布的在前
   .get({
    success: function(res) {
     return res;
     console.log('列表：', res)
    }
   });
 } catch (e) {
  console.error(e)
 }
}