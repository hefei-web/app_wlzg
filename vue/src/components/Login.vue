<template>
  <div>
    <mt-header title="登录">
      <router-link to="/user" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right">
        <router-link to="/reg">注册</router-link>
      </mt-button>
    </mt-header>
    <header class="logon-header">
      <img :src="require('../assets/logon_bg.png')" />
    </header>
    <section class="logon-box">
      <!--  <mt-field placeholder="手机号" v-model="cellphone" autofocus="autofocus" @keyup.enter="login"></mt-field>
      <mt-field placeholder="密码" type="password" v-model="password" @keyup.enter="login">
        <router-link to class="forget">忘记密码？</router-link>
      </mt-field>-->

      <input type="text" placeholder="手机号" v-model="cellphone" autofocus @keyup.enter="login" />
      <input type="password" placeholder="密码" v-model="password" @keyup.enter="login" />
      <a href class="forget">忘记密码？</a>
      <mt-button size="large" @click="login">登录</mt-button>
      <div class="register-box">
        没有账号？
        <router-link to="/reg">注册</router-link>
      </div>
    </section>
    <section class="logon-link">
      <div class="logon-link-text">使用其他账号登录</div>
      <div class="logon-link-list">
        <span>
          <img :src="require('../assets/wechat.png')" alt />
        </span>
        <span>
          <img :src="require('../assets/weibo.png')" alt />
        </span>
        <span>
          <img :src="require('../assets/qq.png')" alt />
        </span>
      </div>
    </section>
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      cellphone: "",
      password: "",
      id: ""
    };
  },
  methods: {
    login() {
      if (this.cellphone.trim() && this.password.trim()) {
        var data = {
          cellphone: this.cellphone.trim(),
          password: this.password.trim()
        };
        this.axios({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "post",
          url: "/travel/login",
          data: Qs.stringify(data)
        }).then(result => {
          if (result.data.code == "1") {
            this.id = result.data.result[0].userid;
            //设置Vuex登录标志为true，默认userLogin为false
            //this.$store.commit("Login");
            this.$store.commit("userid");
            this.$store.dispatch("userid", this.id);
            this.$store.dispatch("userLogin", true);
            //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
            //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
            localStorage.setItem("Flag", "isLogin");
            localStorage.setItem("userid", this.id);
            localStorage.setItem("record" + this.id,'');
            this.$toast("登录成功");
            /* this.$router.push(`/id=${this.id}`); */
            this.$router.push({
              name: "Home",
              params: {
                id: this.id
              }
            });
          } else {
            this.$toast("手机号或密码错误");
          }
        });
      } else if (!this.cellphone.trim()) {
        this.$toast("手机号不能为空");
      } else if (!this.password.trim()) {
        this.$toast("密码不能为空");
      }
    }
  }
};
</script>
<style scoped>
.mint-header {
  background-color: #f7c902;
}
.mint-button-text a {
  color: #fff;
}
.logon-header {
  width: 100%;
  height: 4.18rem;
}
.logon-header img {
  width: 100%;
  height: 4.18rem;
}
.logon-box {
  position: relative;
  width: 90%;
  padding-left: 0.4rem;
}
.logon-box input {
  display: block;
  width: 100%;
  padding: 0.37rem 0;
  color: #000;
  font-size: 0.28rem;
  border-bottom: 1px solid #f5f5f5;
}
.forget {
  display: block;
  position: absolute;
  right: 0.45rem;
  top: 1.43rem;
  font-size: 0.28rem;
  color: #dadada;
}
.logon-box button {
  background: #f7c902;
  border-radius: 10px;
  height: 0.92rem;
  color: #fff;
  font-size: 0.32rem;
  margin: 0.3rem auto 0 auto;
}
.register-box {
  float: right;
  height: 0.34rem;
  margin-top: 0.26rem;
  margin-right: 0.32rem;
  line-height: 0.34rem;
  font-size: 0.24rem;
  color: #b8b8b8;
}
.register-box a {
  color: #4a9dfe;
}
.logon-link {
  margin-top: 3rem;
  text-align: center;
}
.logon-link-text {
  margin-bottom: 0.25rem;
  font-size: 0.24rem;
  color: #838383;
}
.logon-link-list img {
  width: 1.1rem;
  height: 1.1rem;
  margin: 0 0.5rem;
}
</style>
