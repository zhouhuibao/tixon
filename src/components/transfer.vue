<template>
    <div>
        <p class="title">转账</p>
        <van-form @submit="onSubmit">
            
            <van-field
                v-model="from"
                label="转账人"
                name="from"
                placeholder="请输入转账人"
                :rules="[{ required: true, message: '请填写转账人' }]"
            />
            <van-field
                v-model="to"
                label="收款人"
                name="to"
                placeholder="请输入收款人"
                :rules="[{ required: true, message: '请填写收款人' }]"
            />
            <van-field
                v-model="amount"
                label="金额"
                name="amount"
                placeholder="请输入转账金额"
                :rules="[{ required: true, message: '请填写转账金额' }]"
            />
            
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                转账
                </van-button>
            </div>
        </van-form>
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
            :style="{ height: '90%' }"
        >
        <p>转账结果</p>
        <!-- <div class="popupContent"> -->
            <pre id="songResJson" class="popupContent">{{info}}</pre>  
        <!-- </div> -->

        </van-popup>
    </div>
</template>

<script>
const accMul = (arg1,arg2) => {
    let m=0,s1=arg1.toString(),s2=arg2.toString(); 
   try{m+=s1.split(".")[1].length}catch(e){} 
   try{m+=s2.split(".")[1].length}catch(e){} 
   return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
};

// 判断数据类型
const dataType = data => {
  return Object.prototype.toString
    .call(data)
    .split(' ')[1]
    .split(']')[0];
};
import { Toast } from 'vant';
import axios from 'axios'
export default {
    name:'transfer',
    data () {
        return {
            from:'tixonshare',
            to:'',
            amount:'',
            info:'',
            userName:'',
            show:false,
            loading:false
        }
    },
    methods: {
        onSubmit(values) {
            const {from,to,amount} = this
            const money = amount*1000000
            const THIS = this

            const parmas={
                method:'transactionBuilder',
                params:{
                    from,
                    to,
                    amount:money
                }
                
            }
            THIS.loading = true


            axios.post(this.$store.state.ip, parmas).then(function (response) {
                console.log(THIS);
                THIS.loading = false

                const {content} = response.data
                if(dataType (content) === 'String'){
                    Toast(content);
                }else{
                    THIS.info = JSON.stringify(content,null,2)
                    Toast.success('转账成功');
                    THIS.show =true
                }

                console.log(response);
            }).catch(function (error) {
                THIS.loading = false
                console.log(error);
            });

        },
    },
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