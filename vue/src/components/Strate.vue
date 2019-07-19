<template>
  <div>
    <section class="raider-wrap">
      <div class="theme-title">
        <span class="index-title-square"></span>
        <span>城市攻略</span>
        <span>|</span>
        <span>RAIDERS</span>
        <img @click="loadMore" :src="require(`../assets/more.png`)" alt class="more-right" />
      </div>
        <div class="raider-box">
          <div v-for="(item,i) of strates" :key="i">
            <div class="raider-sub">
              <div class="raider-left" :style="width">
                <div @click="linkTo(item.id)" class="raider-title" v-text="item.title"></div>
                <div class="raider-text" v-text="item.abstract"></div>
                <div class="raider-bottom">
                  <span class="raider-bottom-sub">
                    <img :src="require(`../assets/like.png`)" alt />
                    <span v-text="item.likenum"></span>
                  </span>

                  <span class="raider-bottom-sub">
                    <img :src="require(`../assets/love.png`)" alt />
                    <span v-text="item.collect"></span>
                  </span>
                </div>
              </div>
              <div @click="linkTo(item.id)" class="raider-right">
                <img :src="item.thumb" alt />
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
      strates: [],
      pno: 1,
      pageSize: 3,
      spots: [],
      likenum: 0,
      unlikenum: 0,
      collectnum: 0,
      pageCount: 0,
      timer: null,
      width: { width: "3.6rem" }
    };
  },
  methods: {
    load() {
      this.axios
        .get("/travel/strate", {
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
          this.strates = result.data.data;
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
    like(n) {
      n++;
    },
    linkTo(id) {
      this.$router.push(`/article/id=${id}`);
    }
  },
  created() {
    this.load();
    /*     this.timer = setInterval(() => {
      this.loadMore();
    }, 5000); */
    var fontSize = localStorage.getItem("fontSize");
    if (fontSize == "small") {
      this.width = { width: "5.6rem" };
    } else if (fontSize == "big") {
      this.width = { width: "2.6rem" };
    }
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
.raider-box {
  padding-bottom: 1rem;
}
.raider-sub {
  position: relative;
  padding: 0.47rem 0 0.47rem 0.4rem;
  border-bottom: 1px solid #f6f6f6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.1rem;
}
.raider-left,
.raider-right {
  display: inline-block;
}
.raider-left {
  width: 3.6rem;
}
.raider-title {
  margin-bottom: 0.2rem;
  font-size: 0.4rem;
  color: #3e3e3e;
  line-height: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.raider-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 0.28rem;
  color: #656b79;
  line-height: 0.5rem;
}
.raider-bottom {
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  font-size: 0.2rem;
  color: #b0b0b0;
}
.raider-bottom img {
  width: 0.28rem;
  height: 0.28rem;
  margin: 0 0.08rem;
}

.raider-bottom-sub:first-child {
  margin-left: 0;
}
.raider-right {
  position: absolute;
  width: 2.8rem;
  height: 2.06rem;
  top: 0.47rem;
  right: 0.3rem;
  -webkit-border-radius: 0.12rem;
  -moz-border-radius: 0.12rem;
  border-radius: 0.12rem;
  overflow: hidden;
}
.raider-right img {
  width: 100%;
  height: 100%;
}
</style>
