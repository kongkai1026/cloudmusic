import { createStore } from 'vuex'
import api from '@/api/index.js'

export default createStore({
  state: {
    // 播放列表
    playlist:[{
      name: '雅俗共赏', 
      id: 411214279,
      al:{
        id: 34749138,
        name: "青年晚报",
        pic: 3431575794705764,
        picUrl: "http://p4.music.126.net/Wcs2dbukFx3TUWkRuxVCpw==/3431575794705764.jpg"
      }
    }],
    // 当前播放索引
    playCurrentIndex:0,
    // 歌词部分，未完全实现
    lyric:'',
    currentTime:0,
    intervalId:0,
    // 用户数据
    user:{
      isLogin:false,
      account:{},
      userDetail:{}
    },
    //判断播放状态
    paused:true,
    // 各类列表，测试下
    // officialList: [],
    // recommendList: [],
    // internationalList: [],
    // moreList: [],
  },
  getters:{
    lyricList(state){
      let arr = state.lyric.split(/\n/igs).map((item,i)=>{
        let min = parseInt(item.slice(1,3));
        let sec = parseInt(item.slice(4,6));
        let mill = parseInt(item.slice(7,10));
        return{
          min,sec,mill,
          lyric:item.slice(11,item.length),
          content:item,
          time:mill+sec*1000+min*60*1000
        }
      })
      arr.forEach((item,i)=>{
        if(i==0){
          item.pre = 0
        }else{
          item.pre = arr[i-1].time
        }
      })
      return arr
    }
  },

  mutations: {
    setPlaylist:function(state,value){
      state.playlist = value
    },
    pushPlaylist:function(state,value){
      state.playlist.push(value)
    },
    setPlayIndex(state,value){
      state.playCurrentIndex = value
    },
    setLyric(state,value){
      state.lyric = value
    },
    setCurrentTime(state,value){
      state.currentTime = value
    },
    setUser(state,value){
      state.user = value
    },
    //改变播放状态
    setPaused(state,value){
      state.paused = value
    },
    //改变各个列表
    // setTopList(state,value){
    //   state.officialList = value.slice(0, 4);
    //   state.recommendList = value.slice(4, 10);
    //   state.internationalList = value.slice(10, 16);
    //   state.moreList = value.slice(16);
    // },
  },
  actions: {
    async reqLyric(content,payload){
      let result = await api.getLyric(payload.id)
      content.commit('setLyric',result.data.lrc.lyric)
    },
    async phoneLogin(content,payload){
      let result = await api.phoneLogin(payload.phone,payload.password)
      if(result.data.code==200){
        content.state.user.isLogin = true
        content.state.user.account = result.data.account

        content.state.user.account = result.data.account
        let userDetail = await api.userDetail(result.data.account.id)
        content.state.user.userDetail = userDetail.data

        localStorage.userData = JSON.stringify(content.state.user)

        content.commit('setUser',content.state.user)
      }
      return result
    },
  },
  modules: {
  }
})
