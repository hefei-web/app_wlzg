<template>
  <div>
    <section class="theme-box">
      <div class="theme-title">
        <span class="index-title-square"></span>
        <span>景点推荐</span>
        <span>|</span>
        <span>SCENC SPOTS</span>
        <img @click="loadMore" :src="require(`../assets/more.png`)" alt class="more-right" />
      </div>
        <div class="theme-list">
          <div v-for="(item,i) of spotlist" :key="i">
            <div
              @click="linkTo(item.id)"
              class="theme-sub"
              :style="`background-image: url(${item.thumb});`"
            >
              <div class="theme-title-box">
                <div class="theme-sub-title" v-text="item.title"></div>
                <div class="theme-time" v-text="item.subtitle"></div>
              </div>

              <div class="thmem-writer-box">
                <div class="theme-like">
                  <img :src="img_url" />
                  <span v-text="item.likenum"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      spotlist: [],
      pno: 1,
      pageSize: 3,
      pageCount: 0,
      timer: null,
      isliked: true,
      img_url: this.host + "loved.png",
      id: 0,
      likenum: 0,
      unlikenum: 0,
      liked: {}
    };
  },
  methods: {
    load() {
      this.axios
        .get("/travel/theme", {
          params: {
            pno: this.pno,
            pageSize: this.pageSize
          }
        })
        .then(result => {
          this.pageCount = result.data.pageCount;
          for (var item of result.data.data) {
            if (item.thumb.search(/http/) == -1) {
              item.thumb = this.host + item.thumb;
            }
          }
          this.spotlist = result.data.data;
        });
    },
    loadMore() {
      if (this.pno < this.pageCount) {
        this.pno++;
      } else {
        this.pno = 1;
      }
      this.load();
    },

    linkTo(id) {
      this.$router.push(`/article/id=${id}`);
    }
  },
  created() {
    this.load();
    /*     this.timer = setInterval(() => {
      this.loadMore();
    }, 6000); */
  }
};
</script>
<style scoped>
.theme-title {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 0.84rem;
  line-height: 0.84rem;
  padding-left: 0.2rem;
  font-size: 0.28rem;
  color: #494949;
  border-bottom: 1px solid #f6f6f6;
}
.index-title-square {
  width: 0.28rem;
  height: 0.28rem;
  margin-top: 0.28rem;
  margin-right: 0.16rem;
  background: #f7ca02;
}
.theme-title span:nth-child(3) {
  margin: 0 0.22rem;
}
.more-right {
  width: 0.35rem;
  height: 0.4rem;
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
}
.theme-list {
  padding: 0.16rem 0;
  height: 100%;
}
.theme-sub {
  position: relative;
  width: 95%;

  height: 3.82rem;
  margin: 0.14rem auto;
  border-radius: 0.12rem;
  overflow: hidden;
  background-size: cover;
}
.theme-title-box {
  padding-left: 0.3rem;
}
.theme-sub-title {
  height: 0.92rem;
  line-height: 0.92rem;
  font-size: 0.36rem;
  color: #fff;
}
.theme-time {
  font-size: 0.25rem;
  color: #fff;
}
.thmem-writer-box {
  position: absolute;
  bottom: 0.2rem;
  left: 0.3rem;
  width: 90%;
  display: flex;
  flex-direction: row;
}
.theme-avatar {
  display: inline-block;
  width: 0.74rem;
  height: 0.74rem;
  border-radius: 0.74rem;
  overflow: hidden;
}
.theme-avatar img {
  width: 100%;
  height: 100%;
}
.theme-writer div,
.theme-writer span {
  vertical-align: middle;
}
.theme-writer span {
  margin-left: 0.2rem;
  color: #fff;
  font-size: 0.28rem;
}
.theme-like {
  position: absolute;
  bottom: 0;
  right: 0;
}
.theme-like img {
  width: 0.6rem;
  height: 0.5rem;
  margin-right: 0.1rem;
  margin-top: -0.1rem;
}
.theme-like span {
  color: #fff;
  font-size: 0.3rem;
  line-height: 0.3rem;
}
</style>
