<template>
    <div>
        <comment :id="$route.params.id"></comment>
    </div>
</template>
<script>
    import comment from '../commenComponents/comments.vue'
    export default {
        data(){
            return {
            }
        },
        methods:{
        },
        components:{
            comment
        }
    }
</script>
<style lang="less" scoped>
    
</style>