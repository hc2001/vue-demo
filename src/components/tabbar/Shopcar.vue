<template>
    <div class="shopCar">
        <div class="mui-card"  v-for="(item,index) in carList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 开关 简洁模式开关打开状态 -->
                    <div :class="['mui-switch','mui-switch-mini',$store.getters.getGoodSelected[item.id]?'mui-active':'']"
                        @click="selectedChanged(item.id,$store.getters.getGoodSelected[item.id])"
                    >
                        <div class="mui-switch-handle"></div>
                    </div>
                    <img src="https://i8.mifile.cn/a1/pms_1533728433.7469953.jpg" alt="">
                    <h3>{{item.title}}</h3>
                    <div class="info">
                        <span class="price">￥{{item.price}}</span>
                        <shopCar :carNum="item.count" :carId="item.id"></shopCar>
                        <a href="#" class="del" @click.prevent="remove(item.id,index)">删除</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner settlement">
                    <div class="left">
                        <p>总价（不含运费）</p>
                        <p>已勾选商品<span class="num" :class="'red'">{{$store.getters.getNumPrice.num}}</span>件，总价<span class="price" :class="'red'">￥{{$store.getters.getNumPrice.price}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
        <p>{{ $store.getters.getGoodSelected }}</p>
    </div>
</template>

<script>
    // 引入mui js
    import mui from '../../lib/mui/js/mui.min.js'
    // 引入购物车数量组件
    import shopCar from '../commenComponents/shopCarNumbox.vue'
    export default {
        data(){
            return {
                carList:[],  //保存购物车的数据
            }
        },
        created(){
            this.getShopCar();
        },
        mounted(){
            mui('.mui-switch')['switch']();
        },
        methods:{
            // 获取存储在本地的购物车数据
            getShopCar(){
                var carInfo = JSON.parse(localStorage.getItem('car'));
                this.carList = carInfo;
            },
            remove(id,index){
                this.$store.commit('removeCarInfo',id);  // 调用公共仓库方法 删除公共仓库数组里面的数据 
                this.carList.splice(index,1)  // 删除当前数组指定的数据
            },
            selectedChanged(id,val){
                this.$store.commit('updateGoodSelected',{ id:id,selected:val })
            },
        },
        components:{
            shopCar, // 购物车数量组件
        }
    }
</script>

<style lang="less" scoped>
    .shopCar {
        background-color: #eee;
        .mui-switch {
            float: left;
            margin-top: 15px;
        }
        img {
            width: 20%;
            float: left;
        }
        h3 {
            font-size: 13px;
            float: left;
        }
        .info {
            float: left;
            .price {
                color: red;
                float: left;
                padding: 5px 0;
            }
            .del {
                display: inline-block;
                padding-top: 5px;
            }
        }
        .red {
            color:red;
            font-size: 16px;
        }
        .settlement {
            display: flex;
            justify-content: space-between;
        }
        
    }
</style>
