<template>
  <div class="login">
    <div class="content">
      <form action="" name="form2">
        <div class="context-logo">
            唠会~
<!--          <img src="https://s3.qiufengh.com/webchat/webchat-logo-160.png" alt="">-->
        </div>
        <Input v-model="username" type="text" placeholder="输入账号"/>
        <br/>
        <Input v-model="password" type="password" placeholder="输入密码"/>
        <br/>
        <div class="box box2" @click="submit">
          <div class="but">
            {{type === 'login' ? '登陆' : '注册' }}
          </div>
        </div>
      </form>
      <div class="bottom-wraper">
        <mu-flex align-items="center">
          <mu-flex justify-content="center" fill>
            <router-link :to="{ name: type === 'login' ? 'Register' : 'Login'}"><div class="tip-user">{{type === 'login' ? '注册帐号' : '去登录' }}</div></router-link>
          </mu-flex>
          <mu-flex justify-content="center">|</mu-flex>
          <mu-flex justify-content="center" fill><div class="tip-user">忘记密码</div></mu-flex>
        </mu-flex>
        <div class="bottom-arguemnt">
          登录即可代表同意协议
        </div>
<!--        <p style="text-align: center"><a href="http://beian.miit.gov.cn" target="_blank">浙ICP备16040413号-1</a></p>-->
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SvgModal from "@components/svg-modal/index.vue";
import Alert from "@components/Alert";
import Toast from "@components/Toast";
import socket from "../../socket";
import ios from '@utils/ios';
import Arrow from '@components/arrow';
import Input from '@components/input';
import { handleInit } from '../../socket-handle';
import store from '../../store';

export default {
  name: 'login-template-component',
  props: ['type'],
  components: {
    Arrow,
    SvgModal,
    Input
  },
  data() {
    return {
      loading: "",
      username: "",
      password: "",
      visibility: false
    };
  },
  methods: {
    async submit() {
      const name = this.username.trim();
      const password = this.password.trim();
      if (name !== "" && password !== "") {
        const data = {
          name: name,
          password: password
        };
        let res;
        if(this.type === 'login') {
          res = await this.$store.dispatch("loginSubmit", data);
        } else {
          const src = `//s3.qiufengh.com/avatar/${Math.ceil(Math.random() * 272)}.jpeg`;
          data.src = src;
          res = await this.$store.dispatch("registerSubmit", data);
        }
        if (res.status === "success") {
          Toast({
            content: res.data.data,
            timeout: 1000,
            background: "#2196f3"
          });
          const userInfo = {
            userid: res.data.userInfo.name,
            src: res.data.userInfo.src,
            id: res.data.userInfo.id,
            token: res.data.token,
          }
          this.$store.commit("setUserInfo", userInfo);
          this.$store.dispatch('getSearchGroup', { name: userInfo.id });
          const roomList = store.state.groupList;
          await handleInit({
            name: userInfo.userid,
            id: userInfo.id,
            src: userInfo.src,
            roomList: roomList
          })
          this.$router.push({ path: "/" });
        } else {
          Alert({
            content: res.data.data
          });
        }
      } else {
        Alert({
          content: "用户名和密码不能为空"
        });
      }
      this.password = '';
    },
  },
  mounted() {
    // 微信 回弹 bug
    ios();
  },
  computed: {
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #eaeaea;
  background-size: 100% 100%;
  background-position: center center;
  .content {
    width: 80vw;
    margin: 100px auto 20px;
    .context-logo {
      width: 70vw;
      margin: 0 auto 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      color: #03a9f4;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .mu-input {
      width: 100%;
    }
  }
}
.btn-radius {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  border: 1px solid rgba(255, 255, 255, 0.38);
  background: rgba(255, 255, 255, 0.02);
  color: #fff;
  line-height: 40px;
  text-align: center;
  border-radius: 50px;
}
.tip-user {
  width 100%;
  text-align:center;
}

.bottom-wraper {
  position: absolute;
  bottom: 50px;
  left:0;
  right: 0;
  margin: 0 auto;
  width: 60vw;
  .bottom-arguemnt {
    margin-top: 5px;
    text-align: center;
  }
}

.box {
  width: 80px;
  height: 80px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, #2196f3 0%, #8fd3f4 100%);
}

.box2 {
  border-radius: 25px;
  width: 300px;
  height: 50px;
  color: #fff;
  font-size: 20px;
  margin-top: 0px;
}
// @keyframes morph {
//   0% {
//     border-radius: 26% 74% 49% 51% / 21% 51% 49% 79%;
//   }
//   25% {
//     border-radius: 74% 26% 50% 50% / 53% 29% 71% 47%;
//   }
//   50% {
//     border-radius: 48% 52% 28% 72% / 45% 71% 29% 55%;
//   }
//   75% {
//     border-radius: 48% 52% 76% 24% / 70% 49% 51% 30%;
//   }
//   100% {
//     border-radius: 26% 74% 49% 51% / 21% 51% 49% 79%;
//   }
// }
//
</style>
