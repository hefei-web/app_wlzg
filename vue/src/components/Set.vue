<template>
  <div class="set">
    <transition>
      <router-view></router-view>
    </transition>
    <mt-header title="设置">
      <span slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <section>
      <div class="set-sub">
        <span>推送消息</span>
        <div class="info-row-right">
          <mt-switch v-model="on_off" @change="isOpen"></mt-switch>
        </div>
      </div>
      <router-link :to="{path:'/fontset',name:'fontset'}">
        <div class="set-sub">
          <span>字体设置</span>
          <div class="info-row-right">
            <img :src="require(`../assets/select.png`)" alt />
          </div>
        </div>
      </router-link>
      <div class="set-sub" @click="clear">
        <span>清除缓存</span>
        <div class="info-row-right">
          <span v-text="cache"></span>
          <img :src="require(`../assets/select.png`)" alt />
        </div>
      </div>
      <router-link :to="{path:'/about',name:'about'}">
        <div class="set-sub">
          <span>关于我们</span>
          <div class="info-row-right">
            <img :src="require(`../assets/select.png`)" alt />
          </div>
        </div>
      </router-link>
      <div class="logout" v-if="isLogin">
        <span @click="quit">
          <button>切换账号</button>
        </span>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      on_off: false,
      cache: "12MB"
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    quit() {
      this.$messagebox
        .confirm("确认退出登录？")
        .then(action => {
          localStorage.removeItem("Flag");
          localStorage.removeItem("userid");
          this.$store.dispatch("userid", undefined);
          this.$router.push("/login");
        })
        .catch(err => {});
    },
    clear() {
      this.$messagebox
        .confirm("请确定是否清理缓存","温馨提示")
        .then(action => {
          this.cache="0"
        })
        .catch(err => {});
    },
    isOpen() {
      this.$messagebox
        .confirm("请在“系统设置-去旅游-通知”中开启通知", "温馨提示")
        .then(action => {
          this.on_off = false;
        })
        .catch(err => {
          this.on_off = false;
        });
    }
  },
  created() {
    if (localStorage.getItem("Flag")) {
      this.isLogin = true;
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
.set {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #f9f9f9;
}

.mint-header {
  background-color: #f7c902;
}
.set-sub {
  position: relative;
  height: 1.07rem;
  padding-left: 0.5rem;
  line-height: 1.07rem;
  font-size: 0.32rem;
  color: #494949;
  border: 1px solid #fff;
}
.logout {
  width: 4.18rem;
  height: 0.84rem;
  margin: 0.6rem auto;
}
.logout button {
  width: 100%;
  height: 100%;
  background: #f7c902;
  border-radius: 0.2rem;
  font-size: 0.32rem;
  color: #ffffff;
}

.info-row-right {
  position: absolute;
  top: 0;
  right: 0.36rem;
}
.info-row-right span {
  font-size: 0.25rem;
  margin: 0.1rem;
  color: #999;
}
.info-row-right img {
  width: 0.12rem;
  height: 0.22rem;
}
.mint-switch {
  margin-top: 0.2rem;
}
</style>
