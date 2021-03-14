$(function() {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        oldpass: value => {
            if ($("[name=oldPwd]").val() === value) {
                return "新密码不可以和旧密码一致";
            }
        },
        newPass: value => {
            if ($("[name=newPwd]").val() !== value) {
                return "新密码输入有误"
            }
        }
    });
    $("#form").submit(function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        axios.post("/my/updatepwd", data).then(function(res) {
            if (res.data.status != 0) {
                return layer.msg(res.data.message);
            } else {
                layer.msg(res.data.message);
                $("form")[0].reset();
            }
        })
    })
})