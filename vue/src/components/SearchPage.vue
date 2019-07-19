<template>
  <div class="searchPage">
    <header class="search-header">
      <span class="back" @click="back">
        <img :src="require(`../assets/back.png`)" alt />
      </span>
      <div class="search-container">
        <img :src="require(`../assets/search_blank.png`)" alt />
        <form @submit.prevent="formSubmit" action="javascript:return true">
          <input
            @keyup.enter="search"
            v-model="keyword"
            type="search"
            class="search-input"
            placeholder="搜索景点/攻略"
          />
        </form>
      </div>
      <span @click="search">搜索</span>
    </header>
    <section>
      <div class="trip-sub" v-for="(item,i) of searchs" :key="i">
        <div class="trip-content-box" @click="linkTo(item.id)">
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
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchs: [],
      keyword: this.$route.params.keyword
    };
  },
  methods: {
    //返回上一层
    back() {
      this.$router.replace("/search");
    },
    formSubmit() {
      return false;
    },
    //搜索
    search() {
      if (this.keyword.trim()) {
        this.load(this.keyword);
      } else {
        this.$toast("请输入搜索关键字");
      }
    },
    //加载搜索数据
    load() {
      var userid = window.localStorage.getItem("userid");
      var getRecord;
      if (userid != null) {
        getRecord = window.localStorage.getItem("record" + userid);
        var recordArr = [];
        if (getRecord == null) {
          recordArr.unshift(this.keyword);
        } else {
          recordArr = getRecord.split(",");
          //向本地添加记录
          if (recordArr.indexOf(this.keyword) !== -1) {
            recordArr.splice(recordArr.indexOf(this.keyword), 1);
            recordArr.unshift(this.keyword);
          } else {
            recordArr.unshift(this.keyword);
          }
          if (recordArr.length > 20) {
            recordArr.pop();
          }
          window.localStorage.setItem("record" + userid, recordArr);
        }
      } else {
        getRecord = window.localStorage.getItem("record");
        var recordArr = [];
        if (getRecord == null) {
          recordArr.unshift(this.keyword);
        } else {
          recordArr = getRecord.split(",");
          //向本地添加记录
          if (recordArr.indexOf(this.keyword) !== -1) {
            recordArr.splice(recordArr.indexOf(this.keyword), 1);
            recordArr.unshift(this.keyword);
          } else {
            recordArr.unshift(this.keyword);
          }
          if (recordArr.length > 20) {
            recordArr.pop();
          }
          window.localStorage.setItem("record", recordArr);
        }
      }

      this.axios
        .get("/travel/search", {
          params: {
            keyword: this.keyword
          }
        })
        .then(result => {
          for (var item of result.data.data) {
            if (item.thumb.search(/http/) == -1) {
              item.thumb = this.host + item.thumb;
            }
          }
          this.searchs = result.data.data;
        });
    },
    //跳转到文章内容页
    linkTo(id) {
      this.$router.push(`/article/id=${id}`);
    }
  },
  created() {
    this.load();
  },
  computed: {}
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
.searchPage {
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  overflow: auto;
}
.searchPage section {
  padding-bottom: 1rem;
}
.search-header {
  padding: 0.25rem 0 0 0;
  font-size: 0.32rem;
  color: #474747;
  height: 0.75rem;
}
.search-header span {
  color: #fff;
}
.search-header span.back {
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 0.3rem;
}
.search-container {
  display: inline-block;
  width: 70%;
  height: 0.5rem;
  margin-right: 0.2rem;
  padding-left: 0.16rem;
  line-height: 0.5rem;
  background: #f3f3f3;
}
.search-container img {
  width: 0.28rem;
  height: 0.28rem;
}
.search-container form {
  display: inline-block;
}
.search-container input {
  height: 100%;
  padding-left: 0.1rem;
  background: transparent;
  font-size: 0.24rem;
  color: #474747;
}

.search-header {
  background: #f7c902;
  width: 100%;
}
.trip-sub {
  position: relative;
  height: 3rem;
  border: 1px solid #f5f5f5;
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
