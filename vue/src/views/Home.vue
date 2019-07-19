<template>
  <main>
    <section>
      <transition>
        <router-view></router-view>
      </transition>
    </section>
    <section v-if="thePath">
      <carousel></carousel>
      <theme></theme>
      <strate></strate>
    </section>
    <footer class="comm-nav">
      <router-link :to="{path:'/'}">
        <div class="nav-index" @click="selected(0)">
          <div class="nav-img-box">
            <img
              :src="currentIndex[0].isSelected?require(`@/assets/nav_index_chk.png`):require(`@/assets/nav_index.png`)"
            />
          </div>
          <div :style="currentIndex[0].isSelected?{color:'#f7c902'}:''">首页</div>
        </div>
      </router-link>
      <router-link :to="{path:'/travel'}">
        <div class="nav-travel" @click="selected(1)">
          <div class="nav-img-box">
            <img
              :src="currentIndex[1].isSelected?require(`@/assets/nav_travel_chk.png`):require(`@/assets/nav_travel.png`)"
            />
          </div>
          <div :style="currentIndex[1].isSelected?{color:'#f7c902'}:''">攻略</div>
        </div>
      </router-link>
      <router-link :to="{path:'/search'}">
        <div class="nav-chat" @click="selected(2)">
          <div class="nav-img-box">
            <img
              :src="currentIndex[2].isSelected?require(`@/assets/nav_search_chk.png`):require(`@/assets/nav_search.png`)"
            />
          </div>
          <div :style="currentIndex[2].isSelected?{color:'#f7c902'}:''">搜索</div>
        </div>
      </router-link>
      <router-link :to="{path:'/user'}">
        <div class="nav-user" @click="selected(3)">
          <div class="nav-img-box">
            <img
              :src="currentIndex[3].isSelected?require(`@/assets/nav_user_chk.png`):require(`@/assets/nav_user.png`)"
            />
          </div>
          <div :style="currentIndex[3].isSelected?{color:'#f7c902'}:''">我的</div>
        </div>
      </router-link>
    </footer>
  </main>
</template>
<script>
import carousel from "@/components/Carousel";
import theme from "@/components/Theme";
import strate from "@/components/Strate";
export default {
  data() {
    return {
      thePath: true,
      currentIndex: [
        { isSelected: false},
        { isSelected: false },
        { isSelected: false },
        { isSelected: false }
      ]
    };
  },
  watch: {
    $route(to, from) {
      var active1 = to.path;
      this.change(active1);
    }
  },
  created() {
    var active2 = this.$route.path;
    this.change(active2);
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
    },
    change(active) {
      if (active == "/travel") {
        this.thePath = false;
        this.currentIndex[1].isSelected = true;
      } else if (active == "/search") {
        this.thePath = false;
        this.currentIndex[2].isSelected = true;
      } else if (active == "/user") {
        this.thePath = false;
        this.currentIndex[3].isSelected = true;
      } else if (active == "/") {
        this.thePath = true;
        this.currentIndex[0].isSelected = true;
      }
    }
  },
  components: {
    carousel,
    theme,
    strate
  }
};
</script>
<style scope>
.comm-nav {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 1rem;

  border-top: 1px solid #f0ebeb;
  justify-content: space-around;
  font-size: 0.25rem;
  color: #3e3e3e;
  text-align: center;
}
.comm-nav a {
  display: block;
  width: 25%;
  padding: 0.14rem 0;
}
.nav-img-box {
  height: 0.44rem;
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
