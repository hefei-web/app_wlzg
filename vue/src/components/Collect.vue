<template>
  <div class="collect">
    <mt-header title="我的收藏">
      <span slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <section
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isMoreLoading"
      infinite-scroll-distance="10"
      :infinite-scroll-immediate-check="true"
    >
      <div class="trip-sub" v-for="(item,i) of collects" :key="i">
        <div class="trip-content-box" @click="linkTo(item.siteid)">
          <div class="trip-avatar">
            <img :src="item.thumb" alt />
          </div>
          <div class="trip-content">
            <div class="trip-title">{{item.title}}</div>
            <div class="trip-text">{{item.description}}</div>
          </div>
          <div class="float-right trip-right">
            <img :src="require(`../assets/select.png`)" alt />
          </div>
        </div>
        <div class="trip-btn-box">
          <mt-button size="small" class="delete" @click="deleteCollect(item.siteid)">删除</mt-button>
        </div>
      </div>
    </section>
    <div class="loading-box tc" v-if="isLoading">
      <mt-spinner type="snake" class="loading-more"></mt-spinner>
      <span class="loading-more-txt">加载中...</span>
    </div>
    <div class="no-more" v-if="noMore">没有更多了~</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pno: 1,
      pageSize: 5,
      collects: [],
      moreCollects: [],
      count: 0,
      i: 0,
      isMoreLoading: false, // 加载更多中
      isLoading: false,
      noMore: false
    };
  },
  watch: {
    //监控收藏数量，当全部加载时，禁用滚动事件
    collects() {
      if (this.collects.length == this.count) {
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
    //加载收藏数据
    load() {
      var userid = parseInt(localStorage.getItem("userid"));
      this.axios
        .get("/travel/userCollect", {
          params: {
            userid,
            pno: this.pno,
            pageSize: this.pageSize
          }
        })
        .then(result => {
          this.collects = result.data.data;
          this.count = result.data.count;
          for (var item of this.collects) {
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
          .get("/travel/userCollect", {
            params: {
              userid,
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
            this.collects = this.collects.concat(result.data.data);
          });
        this.busy = false;
        this.noMore = false;
        this.isMoreLoading = false;
      }, 1000);
    },
    //删除收藏
    deleteCollect(id) {
      this.$messagebox
        .confirm("确认删除吗？", "您好")
        .then(action => {
          this.axios
            .get("/travel/deleteCollect", {
              params: {
                siteid: id,
                userid: localStorage.getItem("userid")
              }
            })
            .then(result => {
              if (result.data.code == "1") {
                this.$toast("删除成功");
                this.pno = 1;
                this.load();
              } else {
                this.$toast("删除失败");
              }
            });
        })
        .catch(err => {});
    },
    //跳转到文章内容页
    linkTo(id) {
      this.$router.push(`/article/id=${id}`);
    }
  },
  created() {
    this.load();
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
.collect {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #f9f9f9;
  overflow: auto;
}

.mint-header {
  background-color: #f7c902;
}
.trip-sub {
  position: relative;
  height: 3rem;
  border: 1px solid #fff;
}
.trip-state {
  position: absolute;
  top: 0;
  right: 0.3rem;
  font-size: 0.28rem;
  color: #f7c902;
}
.trip-content-box {
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin: 0.3rem 0;
}
.trip-avatar {
  width: 30%;
  height: 1.8rem;
  margin: 0.3rem 0.25rem 0 0.25rem;
  overflow: hidden;
}
.trip-avatar img {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.2rem;
}
.trip-title {
  font-size: 0.28rem;
  line-height: 0.45rem;
}
.trip-text {
  height: 0.45rem;
  line-height: 0.45rem;
  font-size: 0.22rem;
  color: #6c6c6c;
}
.trip-content {
  width: 60%;
  margin-right: 1rem;
  height: 2.5rem;
  overflow: hidden;
}
.trip-right {
  right: 0.37rem !important;
}
.trip-btn-box {
  position: absolute;
  right: 0.2rem;
  bottom: 0.2rem;
}

.mint-button--small {
  background: #fff;
  color: #f7c902;
  border: 1px solid #f7c902;
}
.float-right {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -0.2rem;
  font-size: 0.28rem;
  color: #ff0000;
}
.loading-box {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  flex-direction: column;
  align-items: center;
}
.loading-more,
.loading-more-text {
  margin: 0.2rem 0;
}
.no-more {
  margin: 0.8rem auto;
  text-align: center;
}
</style>
