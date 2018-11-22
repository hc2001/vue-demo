<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
            <!-- "-"按钮，点击可减小当前数值 -->
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" value="1" @change="changeNum" ref="numbox" />
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
                this.$emit('getSelectedNum',parseInt(this.$refs.numbox.value));
            }
        },
        watch:{
            'max':function(newVal,oldVal){
                mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        },
        props:['max']
    }
</script>
<style lang="less" scoped>
    
</style>