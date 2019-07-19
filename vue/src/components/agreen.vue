<template>
  <div :data-canargeen="can" class="theme-like" @click="like">
    <img :data-canargeen="can" :src="img_url" alt />
    <span v-text="likenum" :data-lid="id" :data-id="id" :data-canargeen="can"></span>
  </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    props:{
        id:'',
        likenum:'',
        img_url:'',
        can:'',
        like:{type: Function }
    }
};
</script>
<style scoped>
.theme-like {
  position: absolute;
  bottom: 0;
  right: 0;
}
.theme-like img {
  width: 0.6rem;
  height: 0.5rem;
  margin-right: 0.1rem;
  margin-top: -0.1rem;
}
.theme-like span {
  color: #fff;
  font-size: 0.3rem;
  line-height: 0.3rem;
}
</style>
