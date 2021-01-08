import axios from 'axios';
export var _axios = function(option) {
    let toast;
    console.log('option = ', option)
    // if (option.loading) {
    toast = this.$toast.loading({
        message: option.loading ? option.loading.msg : '',
        className: 'loading-toast ' + (option.loading ? option.loading.className : '')
    });
    // }
    axios.defaults.baseURL = '/api';

    var CancelToken = axios.CancelToken;
    var source = CancelToken.source();

    // 添加请求拦截器
    axios.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        // alert('请求拦截器 request config = '+ Jconfig.data);
        let token = window.localStorage.getItem("token");
        console.log(token)
        if (token) {
            config.headers.token = token; //将token放到请求头发送给服务器

            return config;
        } else {
            this.$toast.show('123')
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
            // timeout: option.timeout || 10000,
            cancelToken: source.token,
        }).then(res => {
            if (res.status == 200) {
                let data = res.data;
                setTimeout(() => {

                    if (!data.errCode) {
                        let response = data.data;
                        resolve(response);

                        if (option.loading) toast.clear();
                    } else {
                        if (option.loading) toasust.clear();
                        if (option.isTips !== false) {
                            reject(data);
                        }
                    }
                }, 200);
            } else {
                // if (option.isTips !== false) this.$toast(res.errMsg);
            }
        }).catch(err => {
            console.log('err = ', err);
            if (option.loading) toast.clear();
            if (option.isTips !== false) {
                setTimeout(() => {
                    this.$toast(err.errMsg || '数据请求失败');
                }, 300)
            }
        });
    });


}