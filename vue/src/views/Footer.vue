<template>
  <main>
    <section>
      <router-view></router-view>
    </section>
    <footer class="comm-nav">
      <router-link :to="{path:'/index'}">
        <div class="nav-index">
          <div class="nav-img-box">
            <img
              :src="currentIndex[0].isSelected?require(`@/assets/nav_index_chk.png`):require(`@/assets/nav_index.png`)"
            />
          </div>
          <div class="nav-active">首页</div>
        </div>
      </router-link>
      <router-link :to="{path:'/travel'}">
        <div class="nav-travel">
          <div class="nav-img-box">
            <img
              :src="currentIndex[1].isSelected?require(`@/assets/nav_travel_chk.png`):require(`@/assets/nav_travel.png`)"
            />
          </div>
          <div>攻略</div>
        </div>
      </router-link>
      <router-link :to="{path:'/search'}">
        <div class="nav-chat">
          <div class="nav-img-box">
            <img
              :src="currentIndex[2].isSelected?require(`@/assets/nav_search_chk.png`):require(`@/assets/nav_search.png`)"
            />
          </div>
          <div>搜索</div>
        </div>
      </router-link>
      <router-link :to="{path:'/user'}">
        <div class="nav-user">
          <div class="nav-img-box">
            <img
              :src="currentIndex[3].isSelected?require(`@/assets/nav_user_chk.png`):require(`@/assets/nav_user.png`)"
            />
          </div>
          <div>我的</div>
        </div>
      </router-link>
    </footer>
  </main>
</template>
<script>
export default {
  data() {
    return {
      active: "index",
      currentIndex: [
        { isSelected: true },
        { isSelected: false },
        { isSelected: false },
        { isSelected: false }
      ]
    };
  },
  watch: {
    active(val) {
      this.$emit("active_change", val);
    }
  },
  methods: {
    selected(n) {
      for (var i = 0; i < this.currentIndex.length; i++) {
        if (n == i) {
          this.currentIndex[i].isSelected = true;
        } else {
          this.currentIndex[i].isSelected = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.comm-nav {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 0.86rem;
  padding-top: 0.14rem;
  border-top: 1px solid #f0ebeb;
  justify-content: space-around;
  font-size: 0.2rem;
  color: #3e3e3e;
  text-align: center;
}
.comm-nav a {
  display: block;
}
.nav-img-box {
  height: 0.49rem;
}
.nav-index img {
  width: 0.34rem;
  height: 0.34rem;
}
.nav-travel img {
  width: 0.34rem;
  height: 0.4rem;
}
.nav-chat img {
  width: 0.34rem;
  height: 0.34rem;
}
.nav-user img {
  width: 0.34rem;
  height: 0.4rem;
}
.nav-active {
  color: #f7c902 !important;
}
</style>
