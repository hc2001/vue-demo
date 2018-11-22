<template>
    <div class="photoInfo">
        <h3 class="title">{{photoInfo.title}}</h3>
        <div class="subtitle">
            <span>发表时间：{{photoInfo.add_time}}</span>
            <span>点击：{{photoInfo.click}}次</span>
        </div>
        <hr>
        <!-- 略缩图 -->
        <div class="thumbs">
            <vue-preview :slides="list" @close="handleClose"></vue-preview>
            <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> -->
        </div>
        <div class="content">
            {{photoInfo.content}}
            {{photoInfo.content}}
            {{photoInfo.content}}
            {{photoInfo.content}}
            {{photoInfo.content}}
            {{photoInfo.content}}
            {{photoInfo.content}}
            {{photoInfo.content}}
            {{photoInfo.content}}
            {{photoInfo.content}}
        </div>

        <!-- 评论组件 -->
        <comment></comment>
    </div>
</template>

<script>
    import comment from '../commenComponents/comments.vue';
    export default {
        data(){
            return {
                id:this.$route.params.id,
                photoInfo:{}, // 渲染的对象
                list:[], // 缩略图数组
            }
        },
        created(){
            this.getPhotoInfo(); // 获取请求到的数据
            this.getThumbs();  // 获取到缩略图数据
        },
        methods:{
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(res=>{
                    if (res.body.status == 0) {
                        this.photoInfo = res.body.message;
                    }
                })
            },
            getThumbs() {
                // 获取缩略图
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                        if (result.body.status === 0) {
                        // 循环每个图片数据，补全图片的宽和高
                        result.body.message.forEach((item,index) => {
                            item.w = 600;
                            item.h = 400;
                            item.msrc = item.src;
                        });
                        // 把完整的数据保存到 list 中
                        this.list = result.body.message;
                    }
                });
            },
            handleClose () {
                // console.log('close event')
            }
        },
        components:{
            comment
        }
    }
</script>

<style lang="less">
    .photoInfo {
        padding: 3px;
        .title {
            font-size: 16px;
            text-align: center;
            color: blue;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
        }
        .thumbs {
            overflow: hidden;
            .my-gallery{
                figure {
                    margin: 0;
                    padding: 0;
                    width: 100px;
                    height: 100px;
                    float: left;
                    margin-left: 10px;
                    margin-bottom: 10px;
                    a {
                        width: 100%;
                        color: red;
                        img {
                            border: 0;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
