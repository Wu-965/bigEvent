$(function() {
    let layer = layui.layer;
    let laypage = layui.laypage;
    let form = layui.form;
    let query = {
        pagenum: 1, //	int	页码值
        pagesize: 2, //	int	每页显示多少条数据
        cate_id: "", //	string	文章分类的 Id
        state: "", //	string	文章的状态，可选值有：已发布、草稿
    }
    substance()

    function substance() {
        axios.get("/my/article/list", { params: query, }).then(function(res) {
            // console.log(res);
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            } else {
                $("#list").empty();
                res.data.data.forEach(item => {
                    $("#list").append($(`
                    <tr>
                            <td>${item.title}</td>
                            <td>${item.cate_name}</td>
                            <td>${item.pub_date}</td>
                            <td>${item.state}</td>
                            <td>
                                <button type="button" data-id="${item.Id}" class="layui-btn layui-btn-xs btn_edit">编辑</button>
                                <button type="button" data-id="${item.Id}" class="layui-btn layui-btn-danger layui-btn-xs btn_delete">删除</button>
                            </td>
                        </tr>
                    `))

                });
            }
            paging(res)
        })
    }

    function paging(res) {
        laypage.render({
            elem: 'page-box' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            count: res.data.total, //数据总数，从服务端得到
            limits: [1, 2, 3, 4, 5],
            limit: query.pagesize,
            curr: query.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                query.pagenum = obj.curr;
                query.pagesize = obj.limit;
                //substance()
                //首次不执行
                if (!first) {
                    substance()
                }
            }
        });
    }
    contents()

    function contents() {
        axios.get("/my/article/cates").then(function(res) {
            // console.log(res);
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            }
            res.data.data.forEach(item => {
                $(`<option value="${item.Id}">${item.name}</option>`).appendTo($("#cateSelect"))
            })
            form.render(); //更新全部
        })
    }
    $("#form").on("submit", function(e) {
        e.preventDefault();
        query.cate_id = $("#cateSelect").val();
        query.state = $("#stateSelect").val();
        query.pagenum = 1;

        substance()
    })

    $("tbody").on("click", ".btn_delete", function() {
        let id = $(this).attr("data-id");
        if ($(".btn_delete").length === 1) {
            if (query.pagenum === 1) {
                query.pagenum = 1;
            } else {
                query.pagenum = query.pagenum - 1;
            }
        }

        axios.get("/my/article/delete/" + id).then(function(res) {
            console.log(res);
            if (res.data.status != 0) {
                return layer.msg(res.data.message);
            }


            layer.msg(res.data.message);
            substance()

        })
    })
})