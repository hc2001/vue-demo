<template>
    <div class="newsInfo-container">
        <div v-for="item in newsInfo" :key="item.id">
            <!-- 标题 -->
            <h1>{{item.title}}</h1>
            <!-- 子标题 -->
            <p>
                <span>发表时间：{{ item.add_time }} </span>
                <span>点击：{{ item.click }}次</span>
            </p>
            <hr>
            <!-- 内容 -->
            <div>
                {{item.content}}
                {{item.content}}
                {{item.content}}
                {{item.content}}
                {{item.content}}
                {{item.content}}
                {{item.content}}
                {{item.content}}
            </div>
        </div>
        <!-- 评论组件 父组件像子组件传值 -->
        <comments :id="id"></comments>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    // 引入评论组件
    import comments from '../commenComponents/comments.vue'
    export default {
        data(){
            return {
                id:this.$route.params.id,
                newsInfo:[],
            }
        },
        created(){
            this.getNewInfo(); 
        },
        methods:{
            getNewInfo(){
                this.$http.get('api/getnew/'+ this.id).then(res=>{
                    if (res.body.status == 0) {
                        this.newsInfo.push(res.body.message);
                        console.log(this.newsInfo[0]);
                    } else {
                        Toast('请求数据失败')
                    }
                })
            }
        },
        components:{
            comments:comments
        }
    }
</script>

<style lang="less" scoped>
    .newsInfo-container {
        padding: 0 6px;
        h1 {
            font-size: 16px;
            color: red;
            text-align: center;
            padding: 10px 0;
        }
        p {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
