import axios from 'axios';
import { IsPC } from '@/common/js/common';
/**
 * [_axios 接口请求方式]
 * @param  {[type]} option [接口参数Object类型，包括的字段：url、data、loading 、type、file]
 * @return {[type]} Promise [返回为Promise对象]
 */
export var _axios = function(option) {
    let toast,
        _this = this,
        _default = {};

    // this.$toast.setDefaultOptions({ duration: 0 });
    toast = this.$toast.loading({
        message: option.loading ? option.loading.msg : '加载中',
        className: 'loading-toast ' + (option.loading ? option.loading.className : ''),
        overlay: true,
        duration: 0
    });

    axios.defaults.baseURL = '/api';

    // 添加请求拦截器
    axios.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        let token = localStorage.getItem("token");

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
        axios({
            url: option.url,
            data: option.data,
            method: option.type || 'post',
            headers: { 'content-type': option.file ? 'application/x-www-form-urlencoded' : 'application/json' },
            // timeout: option.timeout || 10000,
        }).then(res => {

            console.log(999, res)
            if (res.status == 200) {
                let data = res.data;
                if (data.status) {
                    let response = data.data;
                    resolve(data);
                    toast.clear();

                } else {
                    toast.clear();
                    if (option.isTips !== false) {
                        reject(data);
                    }
                }
            } else {
                toast.clear();
                reject(res);
            }
        }).catch(err => {
            console.log('err = ', err);
            toast.clear();
            if (option.isTips !== false) {
                setTimeout(() => {
                    _this.$toast(err.errMsg || '数据请求失败');
                }, 300)
            }
        });
    });
}
