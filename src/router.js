 import VueRouter from 'vue-router'

//  引入组件
import home from './components/tabbar/Home.vue'
import member from './components/tabbar/Member.vue'
import shopcar from './components/tabbar/Shopcar.vue'
import search from './components/tabbar/Search.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photoShare from './components/photo/photoShare.vue'
import photoInfo from './components/photo/photoInfo.vue'
import goodLists from './components/goods/goodLists.vue'
import goodInfo from './components/goods/goodInfo.vue'
import goodDesc from './components/goods/goodDesc.vue'
import goodComment from './components/goods/goodComment.vue'
import store from './components/store/store.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path:'/',redirect:'/home'}, // 重定向 
    { path:'/home',component:home },
    { path:'/member',component:member },
    { path:'/shopcar',component:shopcar },
    { path:'/search',component:search },
    { path:'/home/newsList',component:newsList },
    { path:'/home/newsInfo/:id',component:newsInfo },
    { path:'/home/photoShare',component:photoShare },
    { path:'/home/photoInfo/:id',component:photoInfo },
    { path:'/home/goodLists',component:goodLists },
    { path:'/home/goodInfo/:id',component:goodInfo },
    { path:'/home/goodDesc/:id',component:goodDesc },
    { path:'/home/goodComment/:id',component:goodComment },
    { path:'/member/store',component:store },
  ],
  linkActiveClass:'mui-active',  // 更改选中样式
})

// 把路由对象暴露出去
export default router