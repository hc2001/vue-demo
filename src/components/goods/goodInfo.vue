<template>
    <div>
        <!-- 购物车小球 -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball">
            </div>
        </transition>
        <!-- 轮播图 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <lunbotu :lunboList="lunboList" :full="false"></lunbotu>
            </div>
        </div>
        

        <!-- 商品详情 -->
        <div class="mui-card">
            <div class="mui-card-header">
                {{goodInfo.title}}
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner content">
                    <div class="price">
                        市场价: <del>￥{{goodInfo.market_price}}</del>
                        销售价：<span>￥{{goodInfo.sell_price}}</span>
                    </div>
                    <div class="number">
                        <p>购买数量：</p> <numbox @getSelectedNum="getSelectedNum" :max="goodInfo.stock_quantity"></numbox>
                    </div>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
                </div>
            </div>
        </div>

        <!-- 商品参数 -->
        <div class="mui-card">
            <div class="mui-card-header">
                商品参数
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodInfo.goods_no}}</p>
                    <p>库存情况：{{goodInfo.stock_quantity}}</p>
                    <p>上架时间：{{goodInfo.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    // 引入轮播图组件
    import lunbotu from '../commenComponents/lunbotu.vue'
    // 引入数字框组件
    import numbox from '../commenComponents/goodInfoNumbox.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id,  // 拿到地址栏id
                lunboList:[], // 存放轮播图的数组
                goodInfo: {}, // 存放商品详情
                ballFlag: false,  // 小球的状态
                selectedNum: 1, // 选择默认的数量
            }
        },
        created(){
            this.getLunboList();
            this.getGoodInfo();
        },
        methods:{
            getLunboList(){
                this.$http.get('api/getthumimages/'+this.id).then(res=>{
                    if (res.body.status == 0) {
                        // 轮播图组件只遍历img属性 这里把src的值赋给img就可以了
                        res.body.message.forEach(item=>{
                            item.img = item.src
                        })
                        this.lunboList = res.body.message;
                    }
                })
            },
            getGoodInfo(){
                this.$http.get('api/goods/getinfo/'+this.id).then(res=>{
                    if (res.body.status == 0) {
                        this.goodInfo = res.body.message;
                    }
                })
            },
            goDesc(id){
                // 使用编程式导航跳转
                this.$router.push('/home/goodDesc/'+id)
            },
            goComment(id){
                // 使用编程式导航跳转
                this.$router.push('/home/goodComment/'+id)
            },
            beforeEnter(el){
                el.style.transform = 'translate(0,0)'
            },
            enter(el,done){
                // 拿到小球 和 购物车小点 距离顶部和左边的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();  // 小球的坐标
                const badgePosition = document.getElementById('badge').getBoundingClientRect(); // 购物车小点的坐标
                // 购物车小点距离左边的距离 - 小球距离左边的距离 = 需要位移的距离
                const xDist = badgePosition.left - ballPosition.left; 
                // 购物车小点距离顶部的距离 - 小球距离顶部的距离 = 需要位移的距离
                const yDist = badgePosition.top - ballPosition.top;
                el.offsetWidth;
                el.style.transform = `translate(${xDist}px,${yDist}px)`; 
                el.style.transition = 'all 1s ease'
                done()
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag
            },
            getSelectedNum(count){
                this.selectedNum = count;
            },
            addToCar(){
                this.ballFlag = !this.ballFlag;  // 小球半场动画
                // { id:当前的id, count:购物车的数量, price:手机的单价, selected:是否选择 }
                var toCar = { 
                    id:this.id,count:this.selectedNum,
                    price:this.goodInfo.sell_price,selected:true,
                    title: this.goodInfo.title,
                };
                this.$store.commit('addToCar',toCar)
            }
        },
        components:{
            lunbotu,
            numbox
        }
    }
</script>
<style lang="less" scoped>
    .mui-card-footer {
        display: block;
        button {
            width: 100%;
            margin: 15px 0;
        }
    }
    .content {
        padding: 10px 10px;
        > .price {
            margin-bottom: 10px;
            > span {
                font-size: 16px;
                color: red;
            }
        }
        .number {
            margin-bottom: 20px;
            p {
                float: left;
                height:35px;
                line-height: 35px;
            }
        }
    }
    .ball {
        position: absolute;
        top: 355px;
        left: 143px;
        z-index: 99;
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
    }
</style>