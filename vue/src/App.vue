<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    if (localStorage.getItem("userid")) {
      this.$store.dispatch("userData");
      var userData = this.$store.getters.userData;
      var { nickname } = userData.userData;
    }

/*     //在页面刷新前将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
       localStorage.setItem("userMsg",JSON.stringify(this.$store.state)) 
    }) */

  },
  mounted() {
    var html = document.getElementsByTagName("html")[0];
    html.style.fontSize = "50px";
    var fontSize = localStorage.getItem("fontSize");
    if (fontSize == "small") {
      html.style.fontSize = "40px";
    } else if (fontSize == "normal") {
      html.style.fontSize = "50px";
    } else if (fontSize == "big") {
      html.style.fontSize = "60px";
    }
  }
};
</script>

<style>

html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
  font-family: arial, "Microsoft Yahei", 微软雅黑;
}
fieldset,
img,
input,
button {
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
} /*去掉input等聚焦时的蓝色边框*/
ul,
ol {
  list-style: none;
}
input {
  padding-top: 0;
  padding-bottom: 0;
}
select,
input {
  vertical-align: middle;
}
select,
input,
textarea {
  font-size: 12px;
  margin: 0;
}
textarea {
  resize: none;
} /*防止拖动*/
img {
  border: 0;
  vertical-align: middle;
} /*  去掉图片低测默认的3像素空白缝隙，或者用display：block也可以*/
table {
  border-collapse: collapse;
}
body {
  font-size: 0.24rem;
  font-family: arial, "Microsoft Yahei", 微软雅黑;
  color: #474747;
  background: #fff;
  font-weight: 600;
}
.clearfix:before,
.clearfix:after {
  /*清除浮动*/
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1; /*IE/7/6*/
}
a {
  color: #666;
  text-decoration: none;
}
a:hover {
  color: #f7c902;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  text-decoration: none;
  font-weight: normal;
  font-size: 100%;
} /*设置h标签的大小，设置跟父亲一样大的字体font-size:100%;*/
s,
i,
em {
  font-style: normal;
  text-decoration: none;
}
.col-red {
  color: #c81623 !important;
}
.v-modal{
  height:0 !important;
}
</style>
