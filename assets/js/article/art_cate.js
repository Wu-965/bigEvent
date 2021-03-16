$(function() {
    let layer = layui.layer;
    let form = layui.form;
    // 创建的
    let index;
    // 编辑的
    let eaitIndex;
    books();

    function books() {
        $(".layui-table").empty();
        axios.get("/my/article/cates").then(function(res) {
            //  console.log(res);
            if (res.data.status != 0) {
                return layer.msg(res.data.data.message);
            } else {
                layer.msg(res.data.message);
                // console.log(res.data.data);
                res.data.data.forEach((item) => {
                    $(".layui-table").append(
                        $(` <tr>
                        <th>分类名称</th>
                        <th>分类别名</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.alias}</td>
                        <td>
                          <button data-id="${item.Id}" type="button" class="layui-btn layui-btn-xs btn_edit">编辑</button>
                          <button data-id="${item.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger btn_delete">删除</button>
                        </td>
                      </tr>`)
                    );
                });
            }
        });
    }
    let addFormStr = `<form class="layui-form" id="establish-form" action="" style="margin-top: 15px; margin-right: 50px;">
            <!-- 第一行 分类名称 -->
            <div class="layui-form-item">
                <label class="layui-form-label">分类名称</label>
                <div class="layui-input-block">
                  <input type="text" name="name" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
    </div>
    </div>
            <!-- 第二行 分类别名  -->
            <div class="layui-form-item">
                <label class="layui-form-label">分类别名</label>
                <div class="layui-input-block">
                  <input type="text" name="alias" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
    </div>
    </div>
            <!-- 第三行 按钮 -->
            <div class="layui-form-item">
                <div class="layui-input-block">
                  <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
                  <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>
    </div>
</form>`;
    let amend = `<form class="layui-form" id="newly-form" lay-filter="formTest" action="" style="margin-top: 15px; margin-right: 50px;">
            <!-- 第一行 分类名称 -->
            <div class="layui-form-item">
                <label class="layui-form-label">分类名称</label>
                <div class="layui-input-block">
                  <input type="text" name="name" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
    </div>
    </div>
            <!-- 第二行 分类别名  -->
            <div class="layui-form-item">
                <label class="layui-form-label">分类别名</label>
                <div class="layui-input-block">
                  <input type="text" name="alias" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
    </div>
    </div>
    <!-- ID -->
    <div class="layui-form-item layui-hide">
        <label class="layui-form-label">分类名称</label>
        <div class="layui-input-block">
          <input type="text" name="Id" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
</div>
</div>
            <!-- 第三行 按钮 -->
            <div class="layui-form-item">
                <div class="layui-input-block">
                  <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
    </div>
    </div>
</form>`;
    $("#btnAddCate").on("click", function() {
        index = layer.open({
            type: 1,
            title: "添加文章",
            content: addFormStr,
            area: ["500px", "250px"],
        });
    });
    $("body").on("submit", "#establish-form", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        axios.post("/my/article/addcates", data).then(function(res) {
            if (res.data.status != 0) {
                return layer.msg(res.data.message);
            } else {
                layer.msg(res.data.message);
                books();
                layer.close(index);
            }
        });
    });
    $("table").on("click", ".btn_delete", function() {
        let id = $(this).attr("data-id");
        // console.log(id);
        axios.get("/my/article/deletecate/" + id).then(function(res) {
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            } else {
                layer.msg(res.data.message);
                books();
            }
        });
    });
    $("table").on("click", ".btn_edit", function() {
        let id = $(this).attr("data-id");
        eaitIndex = layer.open({
            type: 1,
            title: "修改文章",
            content: amend,
            area: ["500px", "250px"],
        });
        axios.get("/my/article/cates/" + id).then(function(res) {
            //  console.log(res);
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            } else {
                form.val("formTest", res.data.data);
            }
        });
    });
    $("body").on("submit", "#newly-form", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        axios.post("/my/article/updatecate", data).then(function(res) {
            //console.log(res);
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            } else {
                layer.msg(res.data.message);
                books();
                layer.close(eaitIndex);
            }
        });
    });
});