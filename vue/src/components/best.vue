<template>
  <div>
    <section class="raider-wrap">
      <div class="theme-title">
        <span class="index-title-square"></span>
        <span>必读攻略</span>
      </div>
      <v-touch v-on:swipeleft="moveright" v-on:swiperight="moveleft" class="wrapper">
        <div class="raider-box" :style="{'width':listWidth+'px','margin-left':marginLeft+'px'}">
          <!--         <img id="prev" @click="moveleft" :src="leftImg" />
          <img id="next" @click="moveright" :src="rightImg" />-->
          <div class="raider-sub" v-for="(item,i) of strates" :key="i">
            <div @click="linkTo(item.id)" class="raider-img">
              <img :src="item.thumb" alt />
            </div>
            <div @click="linkTo(item.id)" class="raider-title" v-text="item.title"></div>
            <div class="raider-bottom">
              <span class="raider-bottom-sub">
                <img :src="require(`../assets/like.png`)" alt />
                <span v-text="item.likenum"></span>
              </span>
            </div>
          </div>
        </div>
      </v-touch>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      strates: [],
      pno: 1,
      pageSize: 100,
      spots: [],
      likenum: 0,
      unlikenum: 0,
      collectnum: 0,
      pageCount: 0,
      timer: null,
      listWidth: "",
      marginLeft: 0,
      num: 0
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
          this.strates = result.data.data;
          for (var item of this.strates) {
            if (item.thumb.search(/http/) == -1) {
              item.thumb = this.host + item.thumb;
            }
          }
          this.listWidth = this.strates.length * 142;
        });
    },
    moveleft() {
      if (this.num > 0) {
        this.num--;
        this.marginLeft = -this.num * 152;
      }
    },
    moveright() {
      if (this.num < this.strates.length / 2) {
        this.num++;
        this.marginLeft = -this.num * 152;
      }
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
    }, 5000); */
  }
};
</script>
<style scoped>
.raider-wrap {
  width: 100%;
  overflow: hidden;
}
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
  height: 3.5rem;
  overflow: hidden;
  transition: all 0.5s linear;
}
.raider-wrap {
  position: relative;
}
.raider-box #prev,
.raider-box #next {
  position: absolute;
  top: 1.6rem;
}
.raider-box #prev {
  left: 0.2rem;
}
.raider-box #next {
  right: 0.1rem;
}
.raider-sub {
  float: left;
  width: 2.8rem;
  height: 3.16rem;
  margin: 0.18rem 0 0.18rem 0.18rem;
  border: 1px solid #f6f6f6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
  padding: 0 0.1rem;
  font-size: 0.28rem;
  color: #3e3e3e;
  line-height: 0.38rem;
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
  margin: 0.1rem;
  font-size: 0.2rem;
  color: #b0b0b0;
  float: right;
}
.raider-bottom img {
  width: 0.28rem;
  height: 0.28rem;
  margin: 0 0.08rem;
}

.raider-img {
  width: 2.8rem;
  height: 1.8rem;
  overflow: hidden;
  margin-bottom: 0.1rem;
}
.raider-img img {
  width: 100%;
  height: 100%;
}
</style>

