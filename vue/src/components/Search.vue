<template>
  <div class="search">
    <header class="search-header">
      <div class="search-container">
        <img :src="this.host+'img/search_blank.png'" alt />
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
    <transition>
      <router-view></router-view>
    </transition>
    <section>
      <div class="search-title">
        <span>搜索历史</span>
        <img @click="deleHistory" :src="deleImg" alt />
      </div>
      <div class="search-wrap" v-if="his">
        <span v-for="(item,i) of showArr" :key="i" @click="historyGo(item)">{{item}}</span>
      </div>
      <div class="search-wrap" v-if="!his">
        <span v-for="(item,i) of historyArr" :key="i" @click="historyGo(item)">
          {{item}}
          <img @click.stop="delit(item)" :src="require(`../assets/delete.png`)" alt />
        </span>
      </div>
    </section>
    <section>
      <div class="search-title">
        <span>热门景点</span>
      </div>
      <div class="search-wrap">
        <span v-for="(item,i) of hots" :key="i" @click="historyGo(item.title)">{{item.title}}</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      keywords: [],
      his: true,
      deleImg: require(`../assets/recycle.png`),
      history: "",
      historyArr: [],
      showArr: [],
      hots: []
    };
  },
  methods: {
    formSubmit() {
      return false;
    },
    search() {
      if (this.keyword.trim()) {
        this.$router.replace({
          name: "searchPage",
          params: {
            keyword: this.keyword
          }
        });
      } else {
        this.$toast("请输入搜索关键字");
      }
    },
    historyGo(n) {
      this.$router.replace({
        name: "searchPage",
        params: {
          keyword: n
        }
      });
    },
    removeEmptyArrayEle(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == "") {
          arr.splice(i, 1);
          i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
          // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
        }
      }
      return arr;
    },
    load() {
      this.axios.get("/travel/hot").then(result => {
        this.hots = result.data.data;
      });
      var userid = window.localStorage.getItem("userid");
      if (userid != null) {
        this.history = window.localStorage.getItem("record" + userid);
      } else {
        if(window.localStorage.getItem("record")==null){
        window.localStorage.setItem("record",'');
        }
        this.history = window.localStorage.getItem("record");
      }
      if (this.history != null) {
        this.historyArr = this.history.split(",");
        this.showArr = this.history.split(",");
        this.showArr.splice(10);
        this.removeEmptyArrayEle(this.showArr);
        this.removeEmptyArrayEle(this.historyArr);
      }
    },
    deleHistory() {
      if (this.his) {
        this.his = false;
        this.deleImg = this.host + "img/pay_success.png";
      } else {
        this.his = true;
        this.deleImg = this.host + "img/recycle.png";
        this.load();
      }
    },
    delit(n) {
      this.historyArr.splice(this.historyArr.indexOf(n), 1);
      this.removeEmptyArrayEle(this.historyArr);
      var userid = window.localStorage.getItem("userid");
      if (this.historyArr.length > 0) {
        if (userid != null) {
          window.localStorage.setItem("record" + userid, this.historyArr);
        } else {
          window.localStorage.setItem("record", this.historyArr);
        }
      } else {
        if (userid != null) {
          window.localStorage.setItem("record" + userid, "");
        } else {
          window.localStorage.setItem("record", "");
        }
      }
    }
  },
  created() {
    this.load();
  },
  beforeRouteUpdate(to, from, next) {
    this.load();
    next();
  }
};
</script>
<style scoped>
.search {
  height: 13.2rem;
}
.search-header {
  padding: 0.3rem 0.2rem;
  margin-bottom: 0.3rem;
  font-size: 0.32rem;
  color: #474747;
}
.search-container {
  display: inline-block;
  width: 80%;
  height: 0.5rem;
  margin-right: 0.3rem;
  padding-left: 0.16rem;
  line-height: 0.5rem;
  background: #f3f3f3;
}
.search-container form {
  display: inline-block;
}
.search-container img {
  width: 0.28rem;
  height: 0.28rem;
}
.search-container input {
  width: 80%;
  height: 100%;
  padding-left: 0.1rem;
  background: transparent;
  font-size: 0.24rem;
  color: #474747;
}
.search-title {
  width: 90%;
  margin: 0 auto 0.32rem;
  font-size: 0.28rem;
  color: #494949;
}
.search-title img {
  float: right;
  width: 0.36rem;
  height: 0.36rem;
}
.search-wrap {
  width: 90%;
  margin: 0 auto;
  padding-bottom: 0.2rem;
}
.search-wrap span {
  display: inline-block;
  margin: 0 0.24rem 0.15rem 0;
  padding: 0.23rem;
  font-size: 0.28rem;
  color: #474747;
  background: #f8f8f8;
  border-radius: 0.04rem;
  position: relative;
}
.search-wrap span img {
  position: absolute;
  width: 0.35rem;
  height: 0.35rem;
  top: -0.1rem;
  right: -0.1rem;
}
</style>
