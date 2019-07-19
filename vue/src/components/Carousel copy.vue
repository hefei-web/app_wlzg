<template>
  <div>
    <div
      class="carousel"
      :style="'width:'+innerWidth+'px'"
      @swipeleft="move(1)"
      @swiperight="move(-1)"
    >
      <ul :class="ulClass" :style="ulStyle">
        <li class="imgItem" v-for="(item,i) of imgList" :key="i" :style="'width:'+innerWidth+'px'">
          <img :src="item.img_url" :alt="item.title" :style="'width:'+innerWidth+'px'" />
        </li>
        <li class="imgItem" :style="'width:'+innerWidth+'px'">
          <img :src="firstImg" :alt="firstImgTitle" :style="'width:'+innerWidth+'px'" />
        </li>
      </ul>
      <!--       <div class="search-box">
        <img :src="require(`../assets/search.png`)" alt />
        <input type="text" placeholder="搜索景点/攻略" class="index-saerch" />
      </div>
      <div class="saoyisao" @click="login">
        <img :src="require(`../assets/saoyisao.png`)" alt />
      </div>
      -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [],
      innerWidth: window.innerWidth,
      ulClass: { trans: true },
      i: 0,
      timer: null,
      firstImg: "",
      firstImgTitle: "",
      canMove: true
    };
  },
  methods: {
    load() {
      this.axios.get("/travel/carousel").then(result => {
        this.imgList = result.data;
        this.firstImg = this.imgList[0].img_url;
        this.firstImgTitle = this.imgList[0].title;
      });
    },
    move(i) {
      if (this.canMove) {
        this.canMove = false;
        if (i == -1 && this.i == 0) {
          this.ulClass.trans = false;
          setTimeout(() => {
            this.i = this.imgList.length;
            setTimeout(() => {
              this.ulClass.trans = true;
              this.i += i;
              setTimeout(() => {
                this.canMove = true;
              }, 200);
            }, 50);
          }, 50);
        } else if (i == 1 && this.i == this.imgList.length - 1) {
          this.i += i;
          setTimeout(() => {
            this.ulClass.trans = false;
            setTimeout(() => {
              this.i = 0;
              setTimeout(() => {
                this.ulClass.trans = true;
                setTimeout(() => {
                  this.canMove = true;
                });
              }, 50);
            }, 50);
          }, 500);
        } else {
          this.i += i;
          setTimeout(() => {
            this.canMove = true;
          }, 300);
        }
      }
    },
    login() {
      this.$router.push("/login");
    }
  },
  created() {
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth;
    });
    this.load();
    this.timer = setInterval(() => {
      this.move(1);
    }, 3000);
  },
  computed: {
    ulStyle() {
      var width = this.innerWidth * (this.imgList.length + 1) + "px";
      var marginLeft = -this.i * this.innerWidth + "px";
      return { width, marginLeft };
    }
  }
};
</script>
<style scoped>
.carousel {
  height: 210px;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
}

.carousel ul li {
  float: left;
}
.carousel li img,
.carousel ul li {
  height: 210px;
  overflow: hidden;
}
@media screen and (min-width: 768px) {
  .carousel li img,
  .carousel ul li,
  .carousel {
    height: 300px;
  }
}
.carousel ul.trans {
  transition: all 0.5s linear;
}
.search-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.2rem;
  width: 2rem;
  height: 0.3rem;
  padding: 0.1rem 0.9rem 0.2rem 0.8rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.1rem;
}
.search-box img,
.search-box input {
  display: inline-block;
  vertical-align: middle;
}
.search-box img {
  width: 0.28rem;
  height: 0.28rem;
  margin-right: 0.1rem;
}
.search-box input {
  width: 80%;
  font-size: 0.25rem;
  color: #000;
  background-color: transparent;
  border: none;
}
.saoyisao {
  position: absolute;
  top: 0.5rem;
  right: 0.36rem;
  width: 0.4rem;
  height: 0.4rem;
}
.saoyisao img {
  width: 0.4rem;
  height: 0.4rem;
}
</style>
