// 入口文件

// 引入Vue
import Vue from 'Vue'

// 引入App
import app from './App.vue'


// 引入vueRouter模块 并且挂载到Vue
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入VueResource 发送ajax请求
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 引入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 设置请求的根路径
Vue.http.options.root = 'http://localhost:5000';
// 设置post提交的 Web服务器无法处理编码为application/json的请求，你可以启用emulateJSON选项
Vue.http.options.emulateJSON = true;

// 按需引入样式模块
// import { Header, Swipe, SwipeItem,Lazyload  } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

// 引入缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 引入mui样式文件
import './lib/mui/css/mui.min.css'
// 引入mui字体图标文件
import './lib/mui/css/icons-extra.css'


import router from './router'

var car = JSON.parse(localStorage.getItem('car') || '[]');  // 一进来就拿到本地的值

var store = new Vuex.Store({
    state:{
        car:car,   // 用于存放购物车的数据
    },
    mutations:{
        // 加入购物车逻辑
        addToCar(state,goodInfo){
            var flag = false;
            state.car.some(item=>{
                if (item.id == goodInfo.id) {  // 如果是加入了同一个商品
                    console.log(item.count + '--' + goodInfo.count);
                    item.count += goodInfo.count;
                    flag = true;
                    return true;  // 终止循环
                }
            })

            if (!flag) {  // 如果没有进入上面的判断 则会进入这里 把传过来的属性 push到数组里面
                state.car.push(goodInfo)
            }
            localStorage.setItem('car',JSON.stringify(state.car)); // 把购物车数据存到本地
        },
        updateCarInfo(state,goodInfo){
            state.car.some(item=>{
                if (item.id == goodInfo.id) {  // 找到对应的id 修改本地存储的数量
                    item.count = parseInt(goodInfo.count);
                    return true;  // 终止循环
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car)); // 把购物车数据存到本地
        },
        removeCarInfo(state,id){
            state.car.some((item,index)=>{
                if (item.id == id) {
                    state.car.splice(index,1)
                    return true 
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodSelected(state,goodInfo){
            state.car.some(item=>{
                if (item.id == goodInfo.id) {
                    item.selected = !goodInfo.selected;
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car));
        }
    },
    getters:{
        carNum(state){
            var c = 0;
            state.car.forEach(item=>{
                c += item.count;
            })
            return c;
        },
        getGoodSelected(state){
            var o = {};
            state.car.forEach(item=>{
                o[item.id] = item.selected
                // console.log(o[item.id] = item.selected);
            })
            return o
        },
        getNumPrice(state){
            var price = 0;
            var num = 0;
            var obj = {};
            state.car.forEach(item=>{
                if (item.selected == true) {
                    price += parseInt(item.price) * parseInt(item.count);
                    num += parseInt(item.count);
                }
            })
            obj.num = num;
            obj.price = price;
            return obj;
        }
    }
})


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store,  // 将Vuex 创建的store实例挂载到vue实例上面
})
