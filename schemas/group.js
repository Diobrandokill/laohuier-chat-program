var mongoose = require('mongoose')
//聊天记录模型
var GroupSchema = new mongoose.Schema({
  selfId: String, // 使用默认 _id
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }, // 使用默认 _id
  isDelete: Boolean,
  time: {
    type: Date,
    default: Date.now()
  }
})
//静态方法
GroupSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('time')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}
module.exports = GroupSchema