<template>
  <div class="use">
    <transition>
      <router-view></router-view>
    </transition>
    <header class="home-header">
      <div class="home-avatar">
        <img :src="uimg" alt />
      </div>
      <div class="home-name" v-text="uname" @click="user"></div>
    </header>
    <div class="mb-bg"></div>
    <section class="home-box">
      <router-link :to="{path:'/collect',name:'collect'}">
        <div class="home-sub">
          <div class="home-sub-icon">
            <img :src="require(`../assets/home_1.png`)" alt />
          </div>
          <div class="home-sub-sort">我的收藏</div>
          <div class="float-right home-right">
            <img :src="require(`../assets/select.png`)" alt />
          </div>
        </div>
      </router-link>
      <router-link :to="{path:'/comment',name:'comment'}">
        <div class="home-sub">
          <div class="home-sub-icon">
            <img :src="require(`../assets/home_2.png`)" alt />
          </div>
          <div class="home-sub-sort">我的评论</div>
          <div class="float-right home-right">
            <img :src="require(`../assets/select.png`)" alt />
          </div>
        </div>
      </router-link>
      <router-link :to="{path:'/userData',name:'userData'}">
        <div class="home-sub">
          <div class="home-sub-icon">
            <img :src="require(`../assets/home_3.png`)" alt />
          </div>
          <div class="home-sub-sort">个人资料</div>
          <div class="float-right home-right">
            <img :src="require(`../assets/select.png`)" alt />
          </div>
        </div>
      </router-link>
      <router-link :to="{path:'/set',name:'set'}">
        <div class="home-sub">
          <div class="home-sub-icon">
            <img :src="require(`../assets/home_4.png`)" alt />
          </div>
          <div class="home-sub-sort">设置</div>
          <div class="float-right home-right">
            <img :src="require(`../assets/select.png`)" alt />
          </div>
        </div>
      </router-link>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uname: "登录",
      uimg: this.host+"img/unlogin.png"
    };
  },
  created() {
    //console.log(localStorage);
    var userid = localStorage.getItem("userid");
    if (userid) {
      this.axios
        .get("/travel/user", {
          params: {
            userid
          }
        })
        .then(result => {
          if (result.data.code == "-1") {
            this.uname = "登录";
          } else if (result.data.code == "1") {
            this.uname = result.data.result[0].nickname;
            this.uimg = this.host+result.data.result[0].photo;
          }
        });
    }
  },
  methods: {
    user() {
      if (this.uname == "登录") {
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style scoped>
.use {
  height: 13.2rem;
}
.home-header {
  position: relative;
  height: 3.55rem;
  padding-top: 0.63rem;
  background: url("../assets/home_bg.png") no-repeat center
    center;
  background-size: cover;
  text-align: center;
  color: #fff;
}
.home-title {
  font-size: 0.36rem;
  color: #ffffff;
}
.home-avatar {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 1.4rem;
  overflow: hidden;
  margin: 0.4rem auto 0.24rem;
}
.home-avatar img {
  width: 100%;
  height: 100%;
}
.home-name {
  font-size: 0.42rem;
}
.home-box {
  padding-bottom: 1rem;
}
.home-btn {
  position: absolute;
  bottom: 0.25rem;
  right: 0.3rem;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 0.12rem;
  width: 1.2rem;
  height: 0.35rem;
  line-height: 0.35rem;
  font-size: 0.2rem;
}
.home-btn a {
  color: #fff;
}
.home-sub {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 1.37rem;
  padding-left: 0.52rem;
  border-bottom: 1px solid #f5f5f5;
}
.home-sub-sort {
  padding-left: 0.23rem;
  font-size: 0.32rem;
  color: #494949;
  line-height: 1.37rem;
}
.home-sub-icon {
  line-height: 1.37rem;
}
.float-right {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -0.2rem;
  font-size: 0.28rem;
  color: #ff0000;
}
.home-right {
  width: 0.12rem;
  height: 0.22rem;
  right: 0.2rem !important;
}
.home-right img {
  width: 100%;
  height: 100%;
}
</style>
