<template>
    <div>
        <p class="title">获取用户信息</p>
        <van-field
        v-model="address"
        center
        clearable
        placeholder="请输入用户名"
        >
        <template #button>
            <van-button size="small" type="primary" @click="getUser">获取</van-button>
        </template>
        </van-field>   
        <van-overlay :show="loading">
            <div class="loadingWrapper">
                <van-loading />
                 <p>加载中...</p> 
            </div>
        </van-overlay>

        <van-popup
            v-model="show"
            closeable
            position="bottom"
            round 
            :style="{ height: '40%' }"
        >
        <!-- <div class="popupContent"> -->
            <pre id="songResJson" class="popupContent">{{info}}</pre>  
        <!-- </div> -->

        </van-popup>
    </div>

</template>

<script>
import { Toast } from 'vant';
import axios from 'axios'
export default {
    name:'getMoney',
    data () {
        return {
            address:'',
            info:'',
            userName:'',
            show:false,
            loading:false
        }
    },
    methods:{
        getUser(){
            
            const THIS = this
            const parmas={
                method:'getAccount',
                params:this.address
            }


            THIS.loading = true
            
            axios.post(this.$store.state.ip, parmas).then(function (response) {
                console.log(THIS);
                THIS.loading = false

                const {content} = response.data
                if(content === '账户不存在'){
                    Toast('用户不存在');
                }else{
                    THIS.show =true
                    THIS.info = JSON.stringify(content,null,2)
                }
            }).catch(function (error) {
                THIS.loading = false
            });
        },
        onCopy(e) {
            Toast.success('复制成功');
            this.show =false
        },
        onError(e) {
            Toast.fail('复制失败');
        },
    }
}
</script>

<style lang='less' scoped>
    .title{
      text-align: left;
      padding-left: 16px;
      margin: 20px 0 0 0;
    }
    .loadingWrapper{
        width: 120px;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        text-align: center;
        p{
            color: #fff;
        }
    }
    .popupContent{
        padding: 40px 10px 0;
        width: 100%;
        box-sizing: border-box;
        word-wrap:break-word
    }
    .copy{
        background: #1989fa;
        height: 44px;
        text-align: center;
        border-radius: 999px;
        line-height: 44px;
        display: block;
        color: #fff;
        margin-top:20px ;
    }
</style>
