$(function() {
    // ==================== 点击去注册按钮
    $("#showReg").click(function() {
            // 显示注册页面
            $(".reg-form").show();
            // 隐藏登陆界面
            $(".login-form").hide();
        })
        // ================== 点击去登陆按钮
    $("#showLogin").click(function() {
            // 显示登陆界面
            $(".login-form").show();
            // 隐藏注册界面
            $(".reg-form").hide();
        })
        // ================= 自定义密码校验
    let form = layui.form;
    form.verify({
        checkout_pass: function(value) { //value：表单的值、item：表单的DOM对象
            let import_pws = $("#import_pws").val();
            if (import_pws != value) {
                return '二次密码不一致，请重新输入'
            }
        },
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
    });
    // ================== 注册界面
    let layer = layui.layer;
    $(".reg-form").on("submit", function(e) {
            e.preventDefault();
            let data = $(this).serialize();
            axios.post("http://ajax.frontend.itheima.net/api/reguser", data).then(function(res) {
                if (res.data.status != 0) {
                    // return alert(res.data.message)
                    return layer.msg(res.data.message);
                    // return layer.alert(res.data.message);
                } else {
                    layer.msg(res.data.message);
                    $("#showLogin").click();
                }
            })
        })
        // ================ 登陆按钮界面
    $(".login-form").on("submit", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        axios.post("http://ajax.frontend.itheima.net/api/login", data).then(function(res) {
            if (res.data.status != 0) {
                return layer.msg(res.data.message);
            } // else {
            //     layer.msg(res.data.message);
            //     location.href = "./index.html"
            // }
            localStorage.setItem("token", res.data.token)
            layer.msg(res.data.message, {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function() {
                //do something
                location.href = "./index.html"
            });
        })
    })
})