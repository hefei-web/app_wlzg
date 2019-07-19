<template>
  <div class="carousel">
    <carousel-3d :count="imgList.length" autoplay>
          <slide v-for="(slide, i) in imgList" :index="i" :key="i">
              <img :src="slide.img_url">
          </slide>
        </carousel-3d>
  </div>
</template>
<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  data() {
    return {
      imgList: [],
    };
  },
  components: {
    Carousel3d,
    Slide
  },
  methods: {
    load() {
      this.axios.get("/travel/carousel").then(result => {
        this.imgList = result.data;
      });
    }
  },
  created() {
    this.load();
  },
};
</script>
<style scoped>
.carousel {
  height:210px;
  overflow: hidden;
  position: relative;
   border: none;
}
.carousel-3d-container{
  margin: 0 auto;
}
.carousel-3d-slide{
  width: 300px;
  height: 210px;
  background: none;
  border:none;
  margin-left:30px;
}
.carousel img{
  width: 300px;
  height: 210px;

}
</style>
