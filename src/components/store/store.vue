<template>
    <div>
        <input type="button" value="增加" @click="add">
        <input type="button" value="减少" @click="reduce">
        <div>{{ $store.getters.nowNum }}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        methods:{
            add(){
                this.$store.commit('add',{one:10,two:20})
            },
            reduce(){
                this.$store.commit('reduce',5)
            }
        }
    }
</script>
<style lang="less" scoped>
    
</style>