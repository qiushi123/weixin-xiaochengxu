// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init() //
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
 let {
  detailId
 } = event
 // const _ = db.command;
 try {
  return await db.collection('asklist')
   .doc("" + detailId)
   .get({
    success: function (res) {
     return res;
     console.log('详情：', res)
    }
   });
 } catch (e) {
  console.error(e)
 }
}