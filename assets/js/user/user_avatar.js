$(function() {
    let layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')

    // 1.2 配置选项
    let options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").click(function() {
        $("#file").click();
    })
    $("#file").change(function() {
        let file = this.files[0];
        if (!file) {
            layer.msg("一起来换更好看的头像吧");
            return
        }
        let newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $("#btnCreateAvatar").click(function() {
        // 剪裁得到一张图片（canvas图片）
        let base64Str = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        });
        // 把图片转成base64格式
        let dataURL = base64Str.toDataURL(); // 把canvas图片转成base64格式
        axios.post("/my/update/avatar", "avatar=" + encodeURIComponent(dataURL)).then(function(res) {
            if (res.data.status != 0) {
                return layer.msg(res.data.message);
            } else {
                layer.msg(res.data.message);
                window.parent.identity()
            }
        })
    })
})