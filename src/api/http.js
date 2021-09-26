import axios from 'axios'
import { Toast } from 'vant';

const http = axios.create({
    baseURL: "http://localhost:3000",
	timeout: 10000,
})


http.interceptors.request.use(function(config){
    // console.log("有调用到哦")
	Toast.loading({
        message:'加载中...',
        forbidClick:true,
        overlay:true,
        loadingType:"spanner",
        duration:0
    });
    // console.log("没用到Toast")
	return config;
},function(error){
	return Promise.reject(error);
});

http.interceptors.response.use(function(response){
	Toast.clear()
	return response;
},function(error){
	return Promise.reject(error);
});

export default http