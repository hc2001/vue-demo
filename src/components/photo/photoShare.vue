<template>
    <div>
        <!-- 顶部侧滑栏 -->
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item',item.id == 0 ? 'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoList(item.id)">
                    {{ item.title }}
                </a>
            </div>
        </div>
        <!-- 图片列表 -->
        <ul class="photo-list">
            <router-link v-for="a in photoList" :key="a.id" :to="'/home/photoInfo/'+ a.id" tag="li">
                <img v-lazy="a.img_url">
                <div class="info">
                    <h3 class="photo-title">
                    {{ a.title }}
                    </h3>
                    <p class="photo-zhaiyao">
                        {{ a.zhaiyao }}
                        {{ a.zhaiyao }}
                        {{ a.zhaiyao }}
                        {{ a.zhaiyao }}
                        {{ a.zhaiyao }}
                        {{ a.zhaiyao }}
                        {{ a.zhaiyao }}
                        {{ a.zhaiyao }}
                    </p>
                </div>
            </router-link>
        </ul>
        
    </div>
</template>

<script>
    // 引入mui JS
    import mui from '../../lib/mui/js/mui.min.js';
    
    export default {
        data(){
            return {
                cates:[],
                photoList:[]
            }
        },
        created(){
            // 获取顶部侧滑栏
            this.getAllList();
            // 获取图文详情
            this.getPhotoList(0);
        },
        mounted(){
            // 初始化滑动 在DOM元素都已经渲染好了之后才开始初始化 确保初始化生效
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getAllList(){
                this.$http.get('api/getimgcategory').then(res=>{
                    if (res.body.status ==0) {
                        var all = {id:0,title:'全部'};
                        this.cates = res.body.message;
                        this.cates.unshift(all);
                    }
                })
            },
            getPhotoList(id){
                this.$http.get('api/getimages/'+id).then(res=>{
                    if (res.body.status == 0) {
                        this.photoList =  res.body.message;
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    //  解决谷歌滑动的警告
    * {
        touch-action: pan-y;
    }
    .photo-list {
        margin: 0;
        padding: 0;
        li {
            position: relative;
            list-style: none;
            margin: 0;
            padding: 10px;
            img {
                background-color: #ccc;
                width: 100%;
                display: block;
            }
            img[lazy=loading] {
                width: 100%;
                height: 90px;
                margin: auto;
            }
            .info {
                position: absolute;
                bottom: 0;
                background-color: rgba(0,0,0,.4);
                color:#fff;
                padding: 10px;
                .photo-title {
                    font-size: 14px;
                    text-align: center;
                }
                .photo-zhaiyao {
                    font-size: 13px;
                    color:#fff;
                }
            }
        }
    }
    
</style>
