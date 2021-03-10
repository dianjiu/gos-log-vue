import request from '@/utils/request'
import qs from 'qs'

export default{
    get(url,params){
        return request({
            method:'get',
            url,
            params,
            headers:{
                'X-Requested-With':'XMLHttpRequest',
                'withCredentials':true,
            }
        })
    },
    post(url,data){
        return request({
            method:'post',
            url,
            data:qs.stringify(data),
            headers:{
                'X-Requested-With':'XMLHttpRequest',
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
            }
        })
    },
    postJson(url,data){
        return request({
            method:'post',
            url,
            data
        })
    },
    postFile(url,data){
        return request({
            method:'post',
            url,
            data,
            responseType: 'blob' //设置返回类型
        })
    }
}