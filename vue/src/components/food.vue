<template>
  <div>
    <div class="theme-title">
      <span class="index-title-square"></span>
      <span>热门美食</span>
    </div>
    <section
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isMoreLoading"
      infinite-scroll-distance="10"
      :infinite-scroll-immediate-check="true"
    >
      <div class="raider-box">
        <div class="raider-left">
          <div class="raider-sub" v-for="(item,i) of foods1" :key="i">
            <div @click="linkTo(item.id)" class="raider-img">
              <img :src="item.thumb" alt />
            </div>
            <div @click="linkTo(item.id)" class="raider-title" v-text="item.title"></div>
          </div>
        </div>
        <div class="raider-right">
          <div class="raider-sub" v-for="(item,i) of foods2" :key="i">
            <div @click="linkTo(item.id)" class="raider-img">
              <img :src="item.thumb" alt />
            </div>
            <div @click="linkTo(item.id)" class="raider-title" v-text="item.title"></div>
          </div>
        </div>
      </div>
      <div class="loading-box tc" v-if="isLoading">
        <mt-spinner type="snake" class="loading-more"></mt-spinner>
        <span class="loading-more-txt">加载中...</span>
      </div>
      <div class="no-more" v-if="noMore">没有更多了~</div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pno: 1,
      pageSize: 4,
      foods: [],
      moreFoods: [],
      count: 0,
      i: 0,
      isMoreLoading: false, // 加载更多中
      isLoading: false,
      noMore: false
    };
  },
  watch: {
    //监控评论数量，当全部加载时，禁用滚动
    foods() {
      if (this.foods.length == this.count) {
        this.isMoreLoading = true;
        this.isLoading = false;
        this.noMore = true;
        this.loadMore = null;
      }
    }
  },
  methods: {
    //返回上一层
    back() {
      this.$router.go(-1);
    },
    //加载评论数据
    load() {
      this.axios
        .get("/travel/food", {
          params: {
            pno: this.pno,
            pageSize: this.pageSize
          }
        })
        .then(result => {
          this.foods = result.data.data;
          this.count = result.data.count;
          for (var item of this.foods) {
            if (item.thumb.search(/http/) == -1) {
              item.thumb = this.host + item.thumb;
            }
          }
        });
    },
    //加载更多
    loadMore() {
      this.busy = true;
      this.isMoreLoading = true;
      this.isLoading = true;
      this.noMore = false;
      this.pno++;
      setTimeout(() => {
        var userid = parseInt(localStorage.getItem("userid"));
        this.axios
          .get("/travel/food", {
            params: {
              pno: this.pno,
              pageSize: this.pageSize
            }
          })
          .then(result => {
            for (var item of result.data.data) {
              if (item.thumb.search(/http/) == -1) {
                item.thumb = this.host + item.thumb;
              }
            }
            this.foods = this.foods.concat(result.data.data);
          });
        this.busy = false;
        this.noMore = false;
        this.isMoreLoading = false;
      }, 1000);
    },
    //跳转到文章内容页
    linkTo(id) {
      this.$router.push(`/article/id=${id}`);
    }
  },
  created() {
    this.load();
  },
  computed: {
    foods1() {
      var arr = [];
      for (var i = 0; i < this.foods.length; i++) {
        if (i % 2 == 0) {
          arr.push(this.foods[i]);
        }
      }
      return arr;
    },
    foods2() {
      var arr = [];
      for (var i = 0; i < this.foods.length; i++) {
        if (i % 2 != 0) {
          arr.push(this.foods[i]);
        }
      }
      return arr;
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
.raider-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  padding-top: 0.1rem;
}
.raider-left,
.raider-right {
  width: 48%;
  overflow: hidden;
}
.raider-sub {
  padding: 0.2rem;
  border: 1px solid #f6f6f6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.1rem;
  margin-bottom: 0.1rem;
}
.raider-sub img {
  width: 100%;
  border-radius: 0.1rem;
  margin-bottom: 0.2rem;
}
.raider-title {
  font-size: 0.28rem;
  text-align: center;
}
.loading-box {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.8rem;
}
.loading-more,
.loading-more-text {
  margin: 0.2rem 0;
}
.no-more {
  margin: 0.8rem auto 1.5rem auto;
  text-align: center;
}
</style>
