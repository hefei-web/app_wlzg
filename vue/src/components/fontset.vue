<template>
  <div class="userData">
    <mt-header title="字号">
      <span slot="left" @click.stop="back">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <section @click="choice">
      <div class="set-sub small" data-font="small">
        <span>小号字体</span>
        <div class="info-row-right">
          <img v-if="fontSelect[0]" :src="require(`../assets/pay_chk.png`)" alt />
        </div>
      </div>
      <div class="set-sub normal" data-font="normal">
        <span>标准号字体</span>
        <div class="info-row-right">
          <img v-if="fontSelect[1]" :src="require(`../assets/pay_chk.png`)" alt />
        </div>
      </div>
      <div class="set-sub big" data-font="big">
        <span>大号字体</span>
        <div class="info-row-right">
          <img v-if="fontSelect[2]" :src="require(`../assets/pay_chk.png`)" alt />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLogin: false,
      fontSelect: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    choice(e) {
      if (e.target.dataset.font == "small") {
        this.fontSelect = [true, false, false];
        localStorage.setItem("fontSize", "small");
        window.history.go(0);
      } else if (e.target.dataset.font == "normal") {
        this.fontSelect = [false, true, false];
        localStorage.setItem("fontSize", "normal");
        window.history.go(0);
      } else if (e.target.dataset.font == "big") {
        this.fontSelect = [false, false, true];
        localStorage.setItem("fontSize", "big");
        window.history.go(0);
      }
    }
  },
  mounted() {
    var fontSize = localStorage.getItem("fontSize");
    if (fontSize == "small") {
      this.fontSelect = [true, false, false];
      return;
    } else if (fontSize == "normal") {
      this.fontSelect = [false, true, false];
      return;
    } else if (fontSize == "big") {
      this.fontSelect = [false, false, true];
      return;
    }
  }
};
</script>
<style scoped>
.userData {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  background-color: #fff;
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
  border: 1px solid #f5f5f5;
}
.small span {
  font-size: 12px;
}
.normal span {
  font-size: 16px;
}
.big span {
  font-size: 19px;
}
.large span {
  font-size: 0.48rem;
}
.info-row-right {
  position: absolute;
  top: 0;
  right: 0.36rem;
}
.info-row-right img {
  width: 0.6rem;
  height: 0.6rem;
}
</style>
