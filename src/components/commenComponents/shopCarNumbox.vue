<template>
    <div class="shopCar">
        <div class="mui-numbox" data-numbox-min="1" style="height:25px">
            <!-- "-"按钮，点击可减小当前数值 -->
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" :value="carNum" @change="changeNum" ref="numbox" />
            <!-- "+"按钮，点击可增大当前数值 -->
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>
<script>
    // 引入mui的js
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        data(){
            return {

            }
        },
        mounted(){
            mui('.mui-numbox').numbox()
        },
        methods:{
            changeNum(){
                // 数量变化触发 调用公共仓库的方法 把值存到本地
                this.$store.commit('updateCarInfo',{ id: this.carId,count:this.$refs.numbox.value});
            }
        },
        props:["carNum","carId"]
    }
</script>
<style lang="less" scoped>
    .shopCar {
        background-color: #fff;
        float: left;
        padding: 5px;
    }
</style>