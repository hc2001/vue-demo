<template>
    <div>
        <div class="sp" v-for="(item,index) in goodList" :key="item.index">
            <router-link :to="'/home/goodInfo/'+item.id">
                <img :src="item.img_url" width="160" height="160" :alt="item.title">
                <h3>{{item.zhaiyao}}</h3>
                <div class="gray-box">
                    <div class="price">
                        <span class="now">￥{{item.sell_price}}</span>
                        <del class="old">￥{{item.market_price}}</del>
                    </div>
                    <div class="hot">
                        <span>热卖中</span>
                        <span>剩余{{item.stock_quantity}}件</span>
                    </div>
                </div>
            </router-link>
        </div>
        <button @click="getMoreList">加载更多数据</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                pageIndex:1, // 默认页码
                goodList:[], // 存放手机列表的数组  
            }
        },
        created(){
            this.getGoodList();
        },
        methods:{
            getGoodList(){
                this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(res=>{
                    if (res.body.status == 0) {
                        this.goodList = this.goodList.concat(res.body.message);
                        console.log(this.goodList);
                    }
                })
            },
            getMoreList(){
                this.pageIndex++;
                this.getGoodList();
            },
        }
    }
</script>

<style lang="less" scoped>
    .sp {
        width: 50%;
        float: left;
        padding: 4px;
        a {
            width: 100%;
            img {
                width: 100%;
                display: block;
            }
        }
        h3 {
            font-size: 15px;
            color: #000;
            width: 100%;
            height: 42px;
            max-height: 42px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .gray-box {
            color: #eee;
            background-color: #ccc;
            padding: 3px;
            .price {
                display: flex;
                justify-content: space-between;
                padding-bottom: 6px;
                .now {
                    color: red;
                }
                .old {
                    font-size: 12px;
                }
            }
            .hot {
                display: flex;
                justify-content: space-between;
            }
        }
    }
    button {
        background-color: red;
        width: 100%;
        height: 40px;
        text-align: center;
        margin: 5px 0;
        font-size: 16px;
        color: #fff;
    }
</style>
