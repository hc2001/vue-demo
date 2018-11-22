<template>
    <div class="comments">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="msg">

        </textarea>
        <input type="button" class="fabiao-comments" @click="postComments" value="发表评论">
        <div class="comments-list" v-for="(item,i) in commentsList" :key="item.id">
            <div class="comments-title">
                第{{i+1}}楼 &nbsp;&nbsp; 用户：{{item.user_name}} &nbsp;&nbsp; 发表时间：{{item.add_time}}
            </div>
            <div class="comments-body">
                {{item.content}}
            </div>
        </div>
        <input type="button" class="getMore" @click="getMore" value="加载更多">
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import moment from 'moment'
    export default {
        data(){
            return {
                commentsId:this.id,
                pageIndex:1, // 默认显示一页
                commentsList:[],
                msg:''
            }
        },
        created(){
            this.getComments();
        },
        methods:{
            getComments(){
                this.$http.get('api/getcomments/'+this.$route.params.id + '?pageindex=' +this.pageIndex).then(res=>{
                    if (res.body.status === 0) {
                        // 每当获取新数据的时候，不要把老数据覆盖，而是拼接上
                        this.commentsList = this.commentsList.concat(res.body.message)
                    } else {
                        Toast('获取评论失败!')
                    } 
                })
            },
            getMore(){
                this.pageIndex++;
                this.getComments();
            },
            postComments(){
                if (this.msg.trim().length < 1) {
                    return Toast('评论内容不能为空!')
                }

                this.$http.post('api/postcomment/'+this.$route.params.id,{ content:this.msg })
                .then(res=>{
                    if (res.body.status === 0) {
                        Toast('评论成功!');
                        var cmt = { user_name:'匿名用户',add_time: moment().format('YYYY-MM-DD HH:mm:ss'),content:this.msg.trim() }
                        this.commentsList.unshift(cmt)
                    }
                })
            },
        },
        props:['id'], // 拿到父组件传来的id 
    }
</script>

<style lang="less" scoped>
    .comments {
        margin-top: 20px;
        textarea {
            height: 90px;
            font-size: 14px;
            margin: 0;
        }
        .fabiao-comments {
            width: 100%;
            line-height: 30px;
            text-align: center;
            font-size: 18px; 
            color:#fff;
            background-color: blue;
        }
        .getMore {
            width: 100%;
            line-height: 30px;
            text-align: center;
            font-size: 18px; 
            color:red;
            border: 1px solid red;
        }
        .comments-list {
            margin: 5px 0;
            .comments-title {
                background-color: #ccc;
                font-size: 13px;
                line-height: 30px;
            }
            .comments-body {
                padding-left: 2em;
                font-size: 14px;
            }
        }
    }
</style>
