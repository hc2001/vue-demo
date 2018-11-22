<template>
    <div>
        <!-- 轮播图 -->
        <lunbotu :lunboList="lunboList" :full="true"></lunbotu>

        <!-- 九宫格改造的六宫格导航栏 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <img src="../../images/menu1(1).png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photoShare">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodLists">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul> 
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import lunbotu from '../commenComponents/lunbotu.vue'  // 引入评论的子组件
    export default {
        data(){
            return {
                lunboList:[], // 保存轮播图的数组
            }
        },
        created(){
            this.getlunbo()
        },
        methods:{
            getlunbo(){
                this.$http.get('api/getlunbo').then( res=> {
                    if (res.body.status == 0) {
                        // 请求成功  把数组给轮播图的数组
                        this.lunboList = res.body.message
                    } else {
                        // 请求失败
                        Toast('请求失败')
                    }
                })
            }
        },
        components:{
            lunbotu   
        }
    }
</script>

<style lang="less" scoped>
    
    .mui-table-view {
        background-color: #fff;
        > .mui-table-view-cell {
            border-right: none;
            border-bottom: none;
            img {
                width: 60px;
            }
            .mui-media-body {
                font-size: 14px;
            }
        }
    }
</style>
