import http from './http.js'

// import axios from 'axios'
// const http = axios.create({
//     baseURL: "http://localhost:3000",
// 	timeout: 10000,
// })

//获取轮播图的api,type:资源类型，对应以下类型，默认为零，即PC
//1: android;2: iphone;3: ipad
export function getBanner(type=0){
    return http.get(`/banner?type=${type}`)
}

//获取推荐歌单
export function getMusicList(limit = 10){
    return http.get(`/personalized?limit=${limit}`)
}

//获取歌单详情
export function getPlaylistDetail(id){
    return http.get(`playlist/detail?id=${id}`)
}

//获取歌词
export function getLyric(id){
    return http.get(`/lyric?id=${id}`)
}

//搜索歌曲
export function searchMusic(keyword){
    return http.get(`/search?keywords=${keyword}`)
}

//手机号登录
export function phoneLogin(phone,password){
    return http.get(`/login/cellphone?phone=${phone}&password=${password}`)
}

//获取用户详情
export function userDetail(uid){
    return http.get(`/user/detail?uid=${uid}`)
}

//获取最新音乐
export function getNewMusic(){
    return http.get(`/personalized/newsong`)
}

//获取所用榜单
export function getTopList(){
    return http.get(`/toplist/detail`)
}

export default {
    getBanner,getMusicList,getPlaylistDetail,getLyric,searchMusic,phoneLogin,userDetail,getNewMusic,getTopList
}