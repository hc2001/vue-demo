<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                        <span>发表时间：{{item.add_time}}</span>
                        <span>点击：{{item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    // 引入 Toast模块
    import { Toast } from 'mint-ui'
    export default {
        data(){
            return {
                newsList:[],
            }
        },
        created(){
            this.getNewList();
            
        },
        methods:{
            getNewList(){
                this.$http.get('api/getnewslist').then(res=>{
                    if (res.body.status == 0) {
                        this.newsList = res.body.message
                    } else {
                        Toast('获取数据失败')
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    .mui-table-view {
        > li {
            h1 {
                font-size: 14px;
            }
            p {
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
