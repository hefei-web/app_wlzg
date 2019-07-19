<template>
  <div>
    <header class="guide-header">
      <div class="page-header clear-header">
        <mt-header :title="arts.title">
          <span slot="left" @click="back">
            <mt-button icon="back"></mt-button>
          </span>
          <!-- <mt-button slot="right">
            <img :src="require(`../assets/shareto.png`)" alt />
          </mt-button> -->
        </mt-header>
      </div>
    </header>
    <section class="pb8">
      <div class="guide-content-box">
        <div class="guide-content-pic">
          <img :src="thumb" alt />
        </div>
        <h3 v-text="arts.title"></h3>
        <div class="guide-content" v-html="arts.content"></div>
      </div>
    </section>
    <section class="guide-comment" id="comment">
      <div class="comment-box">
        <div class="comment-num">评论 {{count}}</div>
        <div class="article-like" @click="like" ref="like">
          <img :src="this.host+'img/article_dislike.png'" alt />
          <span>赞</span>
          <span>{{arts.likenum}}</span>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-sub" v-for="(item,i) of comments" :key="i">
          <div class="comment-sub-title">
            <div class="comment-pic">
              <img :src="item.photo" alt />
            </div>
            <div class="comment-info">
              <div class="comment-name" v-text="item.uname"></div>
              <div class="comment-time" v-text="item.inputtime"></div>
            </div>
          </div>
          <div class="comment-content" v-text="item.content"></div>
        </div>
      </div>
      <div class="comment-more" @click="loadAll" v-if="loadMsg">加载全部评论</div>
      <div class="comment-state">
        <form @submit.prevent="formSubmit" action="javascript:return true">
          <input
            @focus.capture="isLogin"
            type="text"
            class="comment-input"
            placeholder="写评论..."
            v-model="comment_content"
            @keyup.enter="sub"
          />
        </form>
        <span class="chat" @click="toComment">
          <img class="send" :src="this.host+'img/nav_chat.png'" alt />
          <mt-badge type="error" size="small">{{this.count}}</mt-badge>
        </span>
        <img class="send" ref="collect" @click="collect" :src="this.host+'img/star_no.png'" alt />
        <img class="send" ref="likeImg" @click="like" :src="this.host+'img/index_like.png'" alt />
         <img @click="sub" class="send" :src="this.host+'img/send.png'" alt /> 
      </div>
    </section>
    <img class="toTop" @click="toTop" :src="this.host+'img/top.png'" alt />
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      id: "",
      arts: {},
      canClick: true,
      comment_content: "",
      pno: 1,
      pageSize: 3,
      comments: [],
      count: 0,
      loadMsg: true,
      isCollect: false,
      first: null,
      title: "",
      thumb: "",
      description: ""
    };
  },
  methods: {
    //返回上一步
    back() {
      this.$router.go(-1);
    },
    formSubmit() {
      return false;
    },
    //加载内容
    load() {
      this.id = this.$route.params.id;
      this.axios
        .get("/travel/article", {
          params: {
            id: this.id
          }
        })
        .then(result => {
          this.arts = result.data.data[0];
          this.title = this.arts.title;
          if (this.arts.thumb.search(/http/) == -1) {
            this.thumb = this.host + this.arts.thumb;
          } else {
            this.thumb = this.arts.thumb;
          }
          this.description = this.arts.description + "...";
        });
    },
    //点赞
    like() {
      if (this.canClick) {
        this.canClick = false;
        this.$refs.likeImg.src = this.host + "img/like.png";
        this.$refs.like.children[0].src = this.host + "img/article_like.png";
        this.$refs.like.children[2].innerHTML++;
      } else {
        this.canClick = true;
        this.$refs.like.children[0].src = this.host + "img/article_dislike.png";
        this.$refs.likeImg.src = this.host + "img/index_like.png";
        this.$refs.like.children[2].innerHTML--;
      }
    },
    //获取评论列表
    comment() {
      this.axios
        .get("/travel/comment", {
          params: {
            siteid: this.id,
            pno: this.pno,
            pageSize: this.pageSize
          }
        })
        .then(result => {
          this.comments = result.data.data;
          for (var item of result.data.data) {
            item.photo = this.host + item.photo;
          }
          this.count = result.data.count;
          if (this.count == 0) {
            this.loadMsg = false;
          }
        });
    },
    //加载全部评论
    loadAll() {
      this.pageSize = this.count;
      this.comment();
      this.loadMsg = false;
    },
    //判断是否登录
    isLogin() {
      if (!localStorage.getItem("Flag")) {
        this.$messagebox
          .confirm("请先登录", "您好")
          .then(action => {
            this.$router.push("/login");
          })
          .catch(err => {});
      }
    },
    //添加评论
    sub() {
      if (this.comment_content.trim() == "") {
        this.$toast("评论内容不能为空");
      } else if (localStorage.getItem("userid")) {
        this.$store.dispatch("userData");
        var userData = this.$store.getters.userData;
        var { nickname, photo, userid } = userData.userData;
        var data = {
          uname: nickname,
          photo,
          userid,
          content: this.comment_content,
          siteid: this.id,
          inputtime: new Date().toLocaleString()
        };
        this.axios({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "post",
          url: "/travel/subComment",
          data: Qs.stringify(data)
        }).then(result => {
          this.comment();
          this.toComment();
          this.comment_content = "";
        });
      }
    },
    //返回顶部
    toTop() {
      //获得当前高度
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      //每步的距离
      let step = distance / 50;
      (function jump() {
        if (distance > 0) {
          distance -= step;
          window.scrollTo(0, distance);
          setTimeout(jump, 10);
        }
      })();
    },
    //跳到评论区
    toComment() {
      var comment = document.getElementById("comment");
      comment.scrollIntoView();
    },
    //获取收藏状态
    hasCollect() {
      if (localStorage.getItem("userid")) {
        this.axios
          .get("/travel/hasCollect", {
            params: {
              siteid: this.id,
              userid: localStorage.getItem("userid")
            }
          })
          .then(result => {
            if (result.data.code == "1") {
              this.$store.state.isCollect = true;
              this.$refs.collect.src = this.host + "img/star_chk.png";
              this.$store.commit("isCollect");
              this.first = true;
            } else {
              this.$refs.collect.src = this.host + "img/star_no.png";
              this.first = false;
              this.$store.commit("disCollect");
            }
          });
      }
    },
    //加入收藏
    collect() {
      if (!localStorage.getItem("Flag")) {
        this.$messagebox
          .confirm("请先登录", "您好")
          .then(action => {
            this.$router.push("/login");
          })
          .catch(err => {});
      } else {
        var isCollect = this.host + "img/star_chk.png";
        var disCollect = this.host + "img/star_no.png";
        if (this.$store.getters.isCollect) {
          this.$store.commit("disCollect");
          this.$refs.collect.src = disCollect;
          this.$toast({ message: "取消收藏", duration: 1000 });
        } else {
          this.$store.commit("isCollect");
          this.$refs.collect.src = isCollect;
          this.$toast({ message: "收藏成功", duration: 1000 });
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    if (this.$store.getters.isCollect !== this.first) {
      if (this.$store.getters.isCollect) {
        this.axios
          .get("/travel/subCollect", {
            params: {
              siteid: this.id,
              userid: localStorage.getItem("userid"),
              title: this.title,
              thumb: this.thumb,
              description: this.description
            }
          })
          .then(result => {});
      } else if (!this.$store.getters.isCollect) {
        this.axios
          .get("/travel/deleteCollect", {
            params: {
              siteid: this.id,
              userid: localStorage.getItem("userid")
            }
          })
          .then(result => {});
      }
    }
    next();
  },
  created() {
    this.load();
    this.comment();
    this.hasCollect();
    /*  //监听触发操作
      function hashChange() {
        alert("URL产生了变化");
      }
      //url变化监听器
      if (
        "onhashchange" in window &&
        (typeof document.documentMode === "undefined" ||
          document.documentMode == 8)
      ) {
        // 浏览器支持onhashchange事件
        window.onhashchange = hashChange; // TODO，对应新的hash执行的操作函数
      } else {
        // 不支持则用定时器检测的办法
        setInterval(function() {
          // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
          var ischanged = isHashChanged();
          if (ischanged) {
            hashChange(); // TODO，对应新的hash执行的操作函数
          }
        }, 150);
      } */
  }
};
</script>
<style scoped>
.mint-header {
  background-color: #f7c902;
}
.pb8 {
  padding: 0.8rem 0;
}
.guide-comment {
  border-top: 0.2rem solid #f5f5f5;
}
.guide-content-box {
  padding-bottom: 0.35rem;
}
.guide-content-box h3 {
  color: #000;
  font-size: 0.3rem;
  text-align: center;
  font-weight: bold;
  margin: 0 0.2rem;
}
.guide-header {
  position: fixed;
  top: 0;
  width: 100%;
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
.guide-content-pic {
  width: 95%;
  height: 4rem;
  margin: 0.2rem;
}
.guide-content-pic img {
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
  margin: 0.1rem 0;
}
.guide-info-wrap {
  padding: 0.38rem 0;
}
.guide-pic-sm {
  width: 0.96rem;
  height: 0.96rem;
  margin-right: 0.18rem;
  border-radius: 0.96rem;
  overflow: hidden;
}
.guide-pic-sm img {
  width: 100%;
  height: 100%;
}
.guide-name-sm {
  font-size: 0.28rem;
  line-height: 0.5rem;
  color: #474747;
  text-align: left;
}
.guide-job-sm {
  font-size: 0.2rem;
  line-height: 0.5rem;
  color: #757575;
}
.article-select {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 0.1rem;
  font-size: 0.38rem;
  color: #f7ca02;
}
.article-select img {
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.2rem;
}

/*评论区*/
.guide-comment {
  padding-bottom: 1rem;
}
.comment-box {
  padding-top: 0.3rem;
  padding-bottom: 0.2rem;
  border: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
}
.comment-box .article-like {
  margin-right: 0.2rem;
  font-size: 0.28rem;
}
.comment-box .article-like img {
  margin-right: 0.2rem;
  width: 0.4rem;
  height: 0.4rem;
}
.comment-num {
  font-size: 0.28rem;
  color: #494949;
  margin: 0 0.2rem;
}

.comment-input {
  width: 6.4rem;
  height: 0.6rem;
  margin-top: 0.1rem;
  padding: 0 0.12rem;
  line-height: 0.6rem;
  border: 1px solid #cdcdcd;
  font-size: 0.28rem;
  color: #cdcdcd;
}
.comment-list {
  max-height: 7.45rem;
  overflow: auto;
}
.comment-sub {
  padding: 0.26rem 0.34rem 0.24rem 0.28rem;
  border: 1px solid #f5f5f5;
}
.comment-pic,
.comment-info {
  display: inline-block;
}
.comment-pic {
  width: 0.64rem;
  height: 0.64rem;
  margin-right: 0.12rem;
  border-radius: 0.64rem;
  overflow: hidden;
}
.comment-pic img {
  width: 100%;
  height: 100%;
}
.comment-name {
  font-size: 0.2rem;
  color: #474747;
}
.comment-time {
  font-size: 0.16rem;
  color: #cdcdcd;
  font-weight: 500;
}
.comment-content {
  padding-top: 0.16rem;
  font-size: 0.24rem;
  color: #6c6c6c;
  line-height: 0.36rem;
}
.comment-more {
  height: 0.99rem;
  line-height: 0.99rem;
  text-align: center;
  font-size: 0.28rem;
  color: #494949;
}
.comment-state {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #cdcdcd;
  background: #fff;
  padding-left: 0.26rem;
}
.comment-state form{
  display: inline-block;
  width: 63%
}
.comment-state input {
  width: 88%;
  display: inline-block;
  height: 0.6rem;
  margin: 0.2rem 0.1rem 0.2rem 0;
  padding: 0 0 0 0.3rem;
  line-height: 0.6rem;
  font-size: 0.25rem;
  color: #000;
  border-radius: 0.3rem;
  background: #f1f1f1;
}
.comment-state .send {
  width: 0.45rem;
  height: 0.45rem;
  margin-right: 0.15rem;
}

.comment-share {
  position: absolute;
  top: 0;
  right: 0;
  height: 0.95rem;
  font-size: 0.28rem;
  color: #494949;
}
.comment-share img {
  width: 0.42rem;
  height: 0.42rem;
}
.chat {
  position: relative;
  width: 0.6rem;
  height: 0.45rem;
  display: inline-block;
  margin: 0 0.15rem;
}

.mint-badge.is-size-small {
  position: absolute;
  top: -2px;
  right: 0px;
  font-size: 0.2rem;
  padding: 1px 3px;
}
.toTop {
  position: fixed;
  bottom: 1.2rem;
  right: 0.2rem;
  z-index: 10;
}
</style>
