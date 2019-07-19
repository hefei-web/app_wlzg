<template>
  <div class="about">
    <mt-header title="关于我们">
      <span slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <section class="pb8">
      <div class="guide-content">
        <p>
          去旅游，中国年轻一代用得更多的旅游网站。
          得益于“内容 + 交易” 的核心优势，去旅游更理解年轻人的偏好
          让复杂的旅游决策、预订和体验，变得简单、高效和便捷。
        </p>
        <p>
          去旅游是旅游社交网站，是数据驱动平台，是新型旅游电商。
          提供全球 60,000个旅游目的地的
          交通、酒店、景点、餐饮、购物、用车、当地玩乐等信息和产品预订服务。
          基于 10年的内容积累，去旅游通过AI技术与大数据算法，
          将个性化旅游信息与来自全球各地的旅游产品供应商实现连接，
          为用户提供与众不同的旅游体验。
        </p>
        <p>
          去旅游独有的“内容获客”模式，高效匹配供需，
          助力平台商家提升利润率，并重塑旅游产业链。
          自 2010 年公司化运营以来，经大量旅行者自主分享，
          去旅游社区的信息内容不断丰富和完善，
          成为年轻一代首选的“旅游神器”。
          与父辈们常用的传统在线旅游网站(OTA)相比，
          去旅游更潮、更酷，深谙“年轻一代的选择”，
          帮助他们从不同角度，重新发现世界。
        </p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
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
.about {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
}
.mint-header {
  background-color: #f7c902;
}
.guide-content {
  width: 95%;
  overflow: hidden;
  margin: 0.2rem auto;
  font-size: 0.28rem;
  color: #323232;
  line-height: 0.5rem;
  text-indent: 0.5rem;
}
</style>
