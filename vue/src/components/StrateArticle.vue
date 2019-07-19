<template>
  <div>
    <header class="guide-header">
      <div class="page-header clear-header">
        <mt-header :title="arts.title">
          <span slot="left" @click="back">
            <mt-button icon="back"></mt-button>
          </span>
          <mt-button slot="right">
            <router-link to="/search">
              <img :src="require(`../assets/search.png`)" alt />
            </router-link>
          </mt-button>
        </mt-header>
      </div>
    </header>
    <section class="pb138">
      <div class="guide-content-box">
        <div class="guide-content-pic">
          <img :src="arts.thumb" alt />
        </div>
        <h3 v-text="arts.title"></h3>
        <div class="guide-content" v-text="arts.content"></div>
      </div>
      <div class="article-select">
        <div class="article-like">
          <img :src="require(`../assets/article_like.png`)" alt />
          <span>喜欢 {{arts.likenum}}</span>
        </div>
        <div class="article-dislike">
          <img :src="require(`../assets/article_dislike.png`)" alt />
          <span>不喜欢 {{arts.unlikenum}}</span>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      arts: {}
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
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
          console.log(this.arts);
        });
    }
  },
  created() {
    this.load();
  }
};
</script>
<style scoped>
.pb138 {
  padding-bottom: 1.38rem;
}
.guide-content-box {
  padding-bottom: 0.35rem;
}
.guide-content-box h3 {
  color: #000;
  font-size: 0.3rem;
  text-align: center;
  font-weight: bold;
}
.guide-content {
  width: 95%;
  margin: 0.2rem auto;
  font-size: 0.28rem;
  color: #323232;
  line-height: 0.5rem;
  text-indent: 0.5rem;
}
.guide-content-pic {
  width: 100%;
  height: 4rem;
  margin: 0.2rem 0;
}
.guide-content-pic img {
  width: 100%;
  height: 100%;
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
  font-size: 0.28rem;
  color: #f7ca02;
}
.article-select img {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.2rem;
}
.article-like {
  margin-right: 1.74rem;
}
</style>

