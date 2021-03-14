$(function() {
    let form = layui.form;
    userinfo()

    function userinfo() {
        axios.get("/my/userinfo").then(function(res) {
            //    console.log(res);
            form.val("formTest", res.data.data);
        })
    }


    form.verify({
        len: function(value, item) {
            if (value.length > 6) {
                return '昵称只能在1～6位之间哦！';
            }
        }
    })

    $("#form").on("submit", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        axios.post("/my/userinfo", data).then(function(res) {
            if (res.data.status !== 0) {
                // return alert("失败")
                return layer.msg(res.data.message);
            }
            layer.msg(res.data.message);
            window.parent.identity();
        })
    })

    $("#btnReset").on("click", function(e) {
        e.preventDefault();
        userinfo()
    })
})