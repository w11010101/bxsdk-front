import axios from 'axios';
import { IsPC } from '@/common/js/common';
/**
 * [_axios 接口请求方式]
 * @param  {[type]} option [接口参数Object类型，包括的字段：url、data、loading、type、file]
 * @return {[type]} Promise [返回为Promise对象]
 */
export var _axios = function(option) {
    let toast,
        _this = this,
        _default = {
            loading:true
        };
    
    for(let key in option){
        _default[key] = option[key];
    }
    // this.$toast.setDefaultOptions({ duration: 0 });
    if(_default.loading){
        toast = this.$toast.loading({
            message: option.loading ? option.loading.msg : '加载中',
            className: 'loading-toast ' + (option.loading ? option.loading.className : ''),
            overlay: true,
            duration: 0
        }); 
    }
    
    // console.log('process = ', process.env.NODE_ENV)
    
    setBaseUrlFn();
    // 取消请求
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    // axios.prototype.source = source
    // this.source = source;
    // console.log(this)
    // 添加请求拦截器
    axios.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        let token = localStorage.getItem("token");
        // 添加拦截条件
        // console.log('config = ',config)
        // if (config.url.includes('getImg')) {
        //     console.log('拦截器将请求取消！');
        //     source.cancel('拦截器将请求取消！');
        // }
        if (token) {
            config.headers.token = token; //将token放到请求头发送给服务器
            return config;
        } else {
            _this.$toast('token为空')
        }

    }, function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function(response) {
        // 对响应数据做点什么

        return response;
    }, function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
    

    return new Promise((resolve, reject) => {
        
        // if(typeof _this.source ==='function'){
        //     _this.source('取消请求')
        // }
        
        axios({
            url: option.url,
            data: option.data,
            method: option.type || 'post',
            headers: { 'content-type': option.file ? 'application/x-www-form-urlencoded' : 'application/json' },
            timeout: option.timeout || 30000,
            // cancelToken: source.token,
            // cancelToken: new axios.CancelToken(function executor(c) {
            //     _this.source = c;
            // })
        }).then(res => {

            console.log(999, res)
            if (res.status == 200) {
                let data = res.data;
                if (data.status) {
                    let response = data.data;
                    resolve(data);

                    if(_default.loading) toast.clear();

                } else {
                    if(_default.loading) toast.clear();
                    if (option.isTips !== false) {
                        reject(data);
                    }
                }
            } else {
                if(_default.loading) toast.clear();
                reject(res);
            }
        }).catch(err => {
            console.log('err = ', err);
            reject(err);
            // if (axios.isCancel(err)) {
            //     console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
            // } else {
            //     //handle error
            //     console.log(err);
            // }
            if(_default.loading) toast.clear();
            if (option.isTips !== false) {
                setTimeout(() => {
                    _this.$toast(err.errMsg || '请求失败');
                }, 300)
            }
        });
    });
}
function setBaseUrlFn(){
    switch (process.env.NODE_ENV) {
        case 'development' :
            axios.defaults.baseURL = '/api';
        break;
        case 'production' :
            axios.defaults.baseURL = '/production';
        break;
        case 'produce' :
            axios.defaults.baseURL = '/produce';
        break;
    }
}