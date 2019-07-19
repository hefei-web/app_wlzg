import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Travel from "@/components/Travel"
import Search from "@/components/Search";
import User from "@/components/User";
import Register from '@/components/Register'
import Login from '@/components/Login.vue'
import Article from '@/components/Article'
import Collect from "@/components/Collect";
import Comment from "@/components/Comment";
import About from "@/components/About";
import set from "@/components/Set";
import userData from "@/components/userData";
import undefind from "@/views/Undefind"
import fontset from "@/components/fontset"
import agreement from "@/components/userAgreement"
import searchPage from "@/components/SearchPage"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', name: 'Home', component: Home,
      children: [
        {
          path: 'travel', name: 'Travel', component: Travel,
        },
        {
          path: 'search', name: 'Search', component: Search,
          children: [
            { path: 'searchPage/keyword=:keyword', name: 'searchPage', component: searchPage },
          ]
        },
        {
          path: 'user', name: 'User', component: User,
          children: [
            { path: 'collect', name: 'collect', component: Collect, meta: { isLogin: true } },
            { path: 'comment', name: 'comment', component: Comment, meta: { isLogin: true } },
            { path: 'userData', name: 'userData', component: userData, meta: { isLogin: true } },
            {
              path: 'set', name: 'set', component: set,
              children: [
                { path: 'about', name: 'about', component: About },
                { path: 'fontset', name: 'fontset', component: fontset },
              ]
            },
          ]
        },
      ]
    },
    { path: '/article/id=:id', component: Article },
    { path: '/reg', name: 'Register', component: Register, },
    { path: '/agreement', name: 'agreement', component: agreement },
    { path: '/login', name: 'Login', component: Login },
    { path: '/*', name: 'undefind', component: undefind },

  ]
})

/*  routes: [
   {
     path: '/', name: 'index', component: Index,
     children: [
       { path: 'collect', name: 'collect', component: Collect, meta: { isLogin: true } },
       { path: 'comment', name: 'comment', component: Comment, meta: { isLogin: true } },
       { path: 'about', name: 'about', component: About },
       {
         path: 'set', name: 'set', component: set,
         children: [
           { path: 'userData', name: 'userData', component: userData, meta: { isLogin: true } },
         ]
       },
     ]
   },
   { path: '/reg', component: Register },
   { path: '/login', component: Login },
   { path: '/article/id=:id', component: Article },
   { path: '/search', component: Search },
 ] */
