import Axios from './axios';

const Service = {
  // 登录接口
  loginUser: data => Axios.post('/api/user/signin', data),
  // 注册接口
  RegisterUser: data => Axios.post('/api/user/signup', data),
  // 获取当前房间所有历史记录
  getRoomHistory: data => Axios.get('/api/message/history/byUser', {
    params: data
  }),
  RoomHistoryAll: data => Axios.get('/api/message/v2/history', {
    params: data
  }),
  // 查询最火用户
  getHostUserList: data => Axios.get('/api/message/getHot', {
    params: data
  }),
  // 查询 vip 用户
  getvipuser: data => Axios.get('/api/user/vipuser', {
    params: data
  }),
  getSearchUser: data => Axios.get('/api/user/searchUser', {
    params: data
  }),
  getSearchGroup: data => Axios.get('/api/room/searchGroup', {
    params: data
  }),
  // 机器人
  getRobotMessage: data => Axios.get('/api/message/robotapi', {
    params: data
  }),
  // 上传图片
  postUploadFile: data => Axios.post('/api/file/uploadimg', data, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }),
  // 修改头像
  postUploadAvatar: data => Axios.post('/api/file/avatar', data, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }),
  // 查询用户信息
  getUserInfo: data => Axios.get('/api/user/getInfo', {
    params: data
  }),
  getRoomInfo: data => Axios.get('/api/room/getInfo', {
    params: data
  }),
  // 创建群组
  postCreateRoom: data => Axios.post('/api/room/create', data),
  // 添加好友
  postAddFriend: data => Axios.post('/api/friend/add', data),
  // 删除好友
  postDeleteFriend: data => Axios.post('/api/friend/delete', data),
  // 添加群组
  postAddGroup: data => Axios.post('/api/group/add', data),
  // 退出群组
  postDeleteGroup: data => Axios.post('/api/group/delete', data),
  // 查询好友李彪
  postListFriend: data => Axios.post('/api/friend/list', data),
  // 查询群组
  postListGroup: data => Axios.post('/api/group/list', data),
  // 请求公告
  getNotice: () => Axios.get('https://s3.qiufengh.com/config/notice-config.js')
};

export default Service;

