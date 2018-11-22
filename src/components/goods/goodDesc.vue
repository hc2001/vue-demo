<template>
    <div class="desc">
        <h2>{{desc.title}}</h2>
        <hr>
        <div>
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
            {{desc.content}}
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                desc:{ }  //保存图文详情的对象
            }
        },
        created(){
            this.getDesc()
        },
        methods:{
            getDesc(){
                this.$http.get('api/goods/getdesc/'+this.$route.params.id).then(res=>{
                    if (res.body.status == 0) {
                        this.desc = res.body.message;
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .desc {
        padding: 4px;
        > h2 {
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: blue;
        }
        > div {
            font-size: 14px;
        }
    }
</style>