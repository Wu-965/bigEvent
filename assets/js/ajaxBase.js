// 全局的axios url根路径配置
axios.defaults.baseURL = "http://ajax.frontend.itheima.net";

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    if (config.url.indexOf("/my") == 0) {
        config.headers.Authorization = localStorage.getItem("token")
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    if (response.data.status == 1 && response.data.message == "身份认证失败！") {
        layer.alert('信息有误,请重新登陆', { icon: 2 }, function(index) {
            //do something
            layer.close(index);
            localStorage.removeItem("token");
            location.href = "/login.html"
        });
    }
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});