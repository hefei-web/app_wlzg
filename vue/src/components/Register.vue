<template>
  <div>
    <mt-header title="注册">
      <router-link to="/user" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right">
        <router-link to="/login">已有帐号</router-link>
      </mt-button>
    </mt-header>
    <header class="logon-header">
      <img :src="require('../assets/logon_bg.png')" />
    </header>
    <div class="resbox">
      <!--       <mt-field placeholder="手机号" v-model="cellphone">
        <span>该手机号已注册</span>
      </mt-field>
      <mt-field placeholder="验证码">
        <div class="send-code" @click="sendCode">发送验证码</div>
      </mt-field>
      <mt-field placeholder="密码" type="password" v-model="password"></mt-field>
      <mt-field placeholder="确认密码" type="password" v-model="repassword">
        <span>两次输入不一致</span>
      </mt-field>-->
      <input type="text" placeholder="手机号" v-model="cellphone" autofocus @blur="cpbMsg" />
      <span v-text="phone_msg" :class="show1"></span>
      <input
        type="password"
        placeholder="密码"
        minlength="6"
        maxlength="12"
        v-model="password"
        @focus="pwfMsg"
        @blur="pwbMsg"
      />
      <span v-text="password_msg" :class="show2"></span>
      <input
        type="password"
        placeholder="确认密码"
        v-model="repassword"
        @focus="rpwfMsg"
        @blur="rpwbMsg"
      />
      <span v-text="repassword_msg" :class="show3"></span>
      <mt-button size="large" @click="reg">注册</mt-button>
      <div class="user-agreement">
        点击注册表示同意
        <router-link :to="{path:'/agreement',name:'agreement'}">用户协议</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      cellphone: "",
      password: "",
      repassword: "",
      phone_msg: "请输入手机号",
      password_msg: "",
      repassword_msg: "",
      show1: "",
      show2: "",
      show3: "",
      photo: this.host+"img/unlogin.png"
    };
  },
  methods: {
    cpbMsg() {
      if (!this.cellphone.trim()) {
        this.phone_msg = "手机号不能为空";
        this.show1 = "err";
      } else if (!/^1[3456789]\d{9}$/.test(this.cellphone)) {
        this.phone_msg = "手机号格式错误";
        this.show1 = "err";
      } else {
        var data = { cellphone: this.cellphone };
        this.axios({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "post",
          url: "/travel/phone",
          data: Qs.stringify(data)
        }).then(result => {
          if (result.data.code == "1") {
            this.phone_msg = "该手机号已注册";
            this.show1 = "err";
          } else if (result.data.code == "-1") {
            this.phone_msg = `手机号可以使用`;
            this.show1 = "success";
          }
        });
      }
    },
    pwfMsg() {
      this.password_msg = "请输入6到12位密码";
      this.show2 = "";
    },
    pwbMsg() {
      if (!this.password.trim()) {
        this.password_msg = "密码不能为空";
        this.show2 = "err";
      } else if (!/^\w{6,12}$/.test(this.password)) {
        this.password_msg = "密码格式错误";
        this.show2 = "err";
      } else {
        this.password_msg = "密码输入成功";
        this.show2 = "success";
      }
    },
    rpwfMsg() {
      this.repassword_msg = "请重新输入密码";
      this.show3 = "";
    },
    rpwbMsg() {
      if (!this.password.trim()) {
        this.password_msg = "密码不能为空";
        this.show3 = "err";
      } else if (!/^\w{6,12}$/.test(this.password)) {
        this.repassword_msg = "密码格式错误";
        this.show3 = "err";
      } else if (this.repassword.trim() !== this.password.trim()) {
        this.repassword_msg = "两次输入密码不一致";
        this.show3 = "err";
      } else {
        this.repassword_msg = "密码输入成功";
        this.show3 = "success";
      }
    },
    reg() {
      if (
        this.show1 == "success" &&
        this.show2 == "success" &&
        this.show3 == "success"
      ) {
        var data = {
          cellphone: this.cellphone,
          password: this.password,
          photo: this.photo
        };
        this.axios({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "post",
          url: "/travel/reg",
          data: Qs.stringify(data)
        }).then(result => {
          console.log(result.data);
          if (result.data.code == "1") {
            this.$toast("注册成功");
            this.$router.push("/login");
          } else if (result.data.code == "-1") {
            this.$toast("注册失败");
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.v-enter,
.v-leave-to {
  transform: translateX(100%);
}
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
.resbox {
  padding: 0 0.1rem;
  color: #b8b8b8;
  font-size: 0.28rem;
  font-weight: 100;
}
.resbox span {
  font-size: 0.25rem;
}
.mint-cell-wrapper {
  background-size: 0px;
}
.send-code {
  color: #ec4039;
  font-size: 0.26rem;
}
.resbox {
  position: relative;
  width: 90%;
  padding-left: 0.4rem;
}
.resbox input {
  display: block;
  width: 100%;
  padding: 0.37rem 0;
  color: #000;
  font-size: 0.28rem;
  border-bottom: 1px solid #f5f5f5;
}
.resbox span.success {
  color: #0d0;
}
.resbox span.err {
  color: #ef4f4f;
}
.resbox button {
  background: #f7c902;
  border-radius: 10px;
  height: 0.92rem;
  color: #fff;
  font-size: 0.32rem;
  margin: 0.5rem auto;
}
.user-agreement {
  margin-top: 0.35rem;
  font-size: 0.1rem;
  color: #b8b8b8;
}
.user-agreement a {
  font-size: 0.1rem;
  color: #b8b8b8;
  text-decoration: underline;
}
</style>
