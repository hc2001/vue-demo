<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunboList" :key="item.img">
                <img :src="item.img" alt="" :class="{fullWidth:full}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
        methods:{

        },
        props:['lunboList','full']  // 接收父组件传来的值 第一个是轮播图的数据 第二个是是否开启宽度百分之百 
    }
</script>
<style lang="less" scoped>
    .mint-swipe {
        text-align: center;
        height: 200px;
        .mint-swipe-item {
            > img {
                display:blcok;
                height: 100%;
            }
        }
    }
    .fullWidth {
        width: 100%;
    }
</style>