<template>
  <div class="about">
    <h1>登录</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>


<script>
import { Toast } from 'vant';
import {setToken} from '@/utils/index'
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  mounted(){
    console.log(setToken())
  },
  methods: {
    onSubmit(values) {
      const pwd = this.$store.state.userList
      const {username,password} = this
      let isUser = false
      let userIndex = -1
   
      for(let i=0;i<pwd.length;i+=1){
        if(pwd[i].key === username){
          isUser = true
          userIndex = i
        }
      }

      if(isUser){
        const userInfo = pwd[userIndex].content

        if(username === userInfo.name && password === userInfo.password){
          Toast('登录成功');
          window.sessionStorage.setItem('reissueLogin',true)
          this.$router.push('/')
        }else{
          Toast('用户名或密码错误');

        }

      }else{
        Toast('用户不存在');
      }

    },
  },
};
</script>

<style lang="less" scoped>
  .about {
    h1{
      font-size: 20px;
      text-align: center;
    }
  }
</style>