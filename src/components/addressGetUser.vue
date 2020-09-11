<template>
    <div>
        <p class="title">主账户:tixonshare
            <span 
                class="copyMain"
                type="button"
                v-clipboard:copy="'tixonshare'"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
            ><i class="iconfont iconfuzhi"></i>复制主账户名称</span>
        </p>
        <p class="title">根据公钥地址获取用户</p>
        <van-field
        v-model="address"
        center
        clearable
        placeholder="请输入公钥地址"
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
        <div class="popupContent">
            {{info}}

            <span 
                class="copy"
                type="button"
                v-clipboard:copy="userName"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
            ><i class="iconfont iconfuzhi"></i>复制用户名</span>
        </div>

        </van-popup>
    </div>

</template>

<script>
import { Toast } from 'vant';
import axios from 'axios'
export default {
    name:'addressGetUser',
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
                method:'getKeyReferences',
                params:this.address
            }


            THIS.loading = true
            
            axios.post(this.$store.state.ip, parmas).then(function (response) {
                console.log(THIS);
                THIS.loading = false

                const {content} = response.data
                if(content === 'null'){
                    Toast('公钥地址不存在');
                }else{
                    THIS.info = `${THIS.address}的用户名是${content}`
                    THIS.userName = content
                    THIS.show =true
                }


                console.log(response);
            }).catch(function (error) {
                THIS.loading = false
                console.log(error);
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
    .copyMain{
        background: #1989fa;
        height: 44px;
        text-align: center;
        border-radius: 999px;
        line-height: 44px;
        display: inline-block;
        color: #fff;
        padding:0 20px ;
        margin-top:20px ;
    }
</style>
