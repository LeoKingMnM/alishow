//目标: 显示前台首页 index.html
//      显示后台登录页  admin/login.html
//      显示后台首页   admin/index.html
//      显示栏目列表页  admin/cate/cate.html

const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');
const moment = require('moment');

//监听路由

//显示后台登录页  --- admin/login.html
router.get('/admin/login', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/login.html'), {});
})

//显示后台首页 --- admin/index.html
router.get('/admin/index', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/index.html'), {abc:"haha"});
})

//显示栏目列表页 --- admin/cate/cate.html
//监听路由 --- 如果浏览器地址栏输入的 /admin/cate/cate 就会进入该函数
//回调函数来进行处理
//因为要监听 /admin/cate/cate 显示 cate.html 页面
//但凡浏览器请求都能使用该方法来监听，任何url地址都行
//router: 路由对象，我们会经常调用router.get 和 router.post方法
//req: 请求对象，req.url   req.method  req.headers
//res: 响应对象，res.setHeader()  res.writeHeader()  res.write()
//     res.end()  res.send()  res.sendFile()  res.render()
router.get('/admin/cate/cate', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/cate/cate.html'));
})

//获取ali_cate表中所有的数据并返回给前端
router.get('/admin/cate/getCate', (req, res) => {
    //1. 编写SQL语句
    const sql = 'select * from ali_cate';

    //2. 执行SQL语句
    db.query(sql, (err, result) => {
        //3. 处理SQL执行结果 --- 返回结果给前端
        if (err) {
            console.log(err);
            return res.send({code:201, message:"查询栏目信息失败"});
        }

        res.send({code:200, message:"查询栏目信息成功", list:result});
    })
})

//显示 addcate.html ---> admin/cate/addcate.html
router.get('/admin/cate/addcate', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/cate/addcate.html'))
})

//添加新栏目处理
router.post('/admin/cate/addCateDeal', (req, res) => {
    //moment模块用来获取当前时间并指定成所需的时间格式
    // const t = moment().format('YYYY-MM-DD HH:mm:ss');
    // console.log(t);

    //① 接收表单数据,并构造成占位符所需的对象
    const formObj = {
        cate_name: req.body.name,
        cate_icon: req.body.icon,
        cate_addtime: moment().format('YYYY-MM-DD')
    }

    //② 拼接SQL语句 (insert into ali_cate set ?)
    const sql = 'insert into ali_cate set ?';

    //③ 执行SQL语句
    db.query(sql, formObj, (err, result) => {
        //④ 处理SQL执行结果 (返回添加成功/失败的信息给前端)
        if (err) {
            console.log(err);
            return res.send({code:201, message:"添加新栏目失败"});
        }

        res.send({code:200, message:"添加新栏目成功"});
    })

    
 
})

//删除栏目信息
router.get('/admin/cate/delCate', (req, res) => {
    //① 接收栏目id
    const cate_id = req.query.id;

    //② 编写SQL语句
    const sql = 'delete  from  ali_cate  where cate_id=?';

    //③ 执行SQL语句
    db.query(sql, cate_id, (err, result) => {
        // ④ 处理SQL执行结果 --- 将成功或失败的信息返回给前端
        if (err) {
            console.log(err);
            return res.send({code:201, message:"删除栏目失败"});
        }

        res.send({code:200, message:"删除栏目成功"});
    })
})

//显示栏目编辑表单页 --- > admin/cate/editcate.html
router.get('/admin/cate/editcate', (req, res) => {
    // 接收cate_id
    const cate_id = req.query.id;

    // 编写SQL语句 （根据cate_id查询对应的栏目信息)
    const sql = 'select * from ali_cate where cate_id=?';

    // 执行SQL语句
    db.query(sql, cate_id, (err, result) => {
        // 处理SQL执行结果 (调用模板引擎，将查询的结果显示在页面上)
        //result是数组，内部只有一个单元
        // result = [{cate_id:1, cate_name:"奇趣事",...}]
        res.render(path.join(rootPath, 'view', 'admin/cate/editcate.html'), result[0]);
    })
})

router.post('/admin/cate/modifyCate', (req, res) => {
    //接收表单数据, 并构造成对象
    const formObj = {
        cate_name: req.body.name,
        cate_icon: req.body.icon,
    }
    const cate_id = req.body.id;

    // 编写SQL语句： 
    const sql = 'update  ali_cate  set  ?  where cate_id=?';

    //执行SQL语句
    db.query(sql, [formObj, cate_id], (err, result) => {
        //处理SQL执行结果：将修改结果返回给前端 （editcate.html）
        if (err) {
            console.log(err);
            return res.send({code:201, message:"修改栏目信息失败"});
        }

        res.send({code:200, message:"栏目修改成功"});
    })

})

//导出路由对象
module.exports = router;