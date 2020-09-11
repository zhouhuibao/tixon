import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList:[
      {
        key:'zhouhuibao',
        content:{
          name:'zhouhuibao',
          password:'zhouhuibao1023'
        }
      },
      {
        key:'liuhui',
        content:{
          name:'liuhui',
          password:'liuhui123456'
        }
      }
    ],
    ip:'http://47.98.193.148/tsh/',
    isLogin:false
  },
  mutations: {
    LOGIN:(state,islogin)=>{
      console.log(islogin)
      state.islogin = islogin
    },
  },
  actions: {
  },
  modules: {
  }
})
