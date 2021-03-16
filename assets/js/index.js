function identity() {
    axios.get("/my/userinfo").then(function(res) {
        // console.log(res);
        let data = res.data.data;
        let name = data.nickname || data.username;
        $("#welcome").text("欢迎  " + name);

        if (data.user_pic) {
            // 有图片文件时 显示图片
            $(".layui-nav-img").attr("src", data.user_pic).show();
            $(".text-avatar-box").hide();
        } else {
            // 如果没有图片显示 文字头像
            $(".text-avatar-box").show().children().text(name[0].toUpperCase());
            $(".layui-nav-img").hide()
        }

    })
}
identity()
let layer = layui.layer;
$("#btnLogout").click(function() {
    layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
        //do something
        layer.close(index);
        localStorage.removeItem("token");
        location.href = "/login.html"
    });
})