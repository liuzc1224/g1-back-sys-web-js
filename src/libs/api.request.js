import HttpRequest from '@/libs/axios'
import config from '@/config'
let baseUrl ;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'onlinetest') {
    baseUrl = config.baseUrl.online
}else if(process.env.NODE_ENV === 'production'){
    baseUrl = config.baseUrl.pro
}else{
    baseUrl = config.baseUrl.dev
}

const axios = new HttpRequest(baseUrl)
export default axios
