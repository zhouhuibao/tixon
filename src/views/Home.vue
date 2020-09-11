<template>
  <div class="home">
    <p class="bufa">补发TSH</p>
    <addressGetUser />
    <getMoney />
    <getUserInfo />
    <transfer />

  </div>
</template>

<script>
// @ is an alias to /src

import getMoney from '@/components/getMoney'
import addressGetUser from '@/components/addressGetUser'
import getUserInfo from '@/components/getUserInfo'
import transfer from '@/components/transfer'

export default {
  name: 'Home',
  data () {
    return {
      sms:''
    }
  },
  mounted(){
    const isLogin = window.sessionStorage.getItem('reissueLogin')
      if(!isLogin){
        this.$router.push('/login')
      }
  },
  components: {
    addressGetUser,
    getMoney,
    getUserInfo,
    transfer
  }
}
</script>

<style lang="less" scoped>
  .home {
    .title{
      text-align: left;
      padding-left: 16px;
      margin: 0;
    }
    .bufa{
      text-align: center;
    }
  }
</style>
