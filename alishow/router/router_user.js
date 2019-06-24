//目标: 管理员的增删改查操作

const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js')

//显示管理员列表页 --- admin/user/users.html
router.get('/admin/user/users', (req, res) => {
    res.render(path.join(rootPath, 'view', 'admin/user/users.html'));
})

router.get('/admin/user/getUsers', (req, res) => {
    //1. 接收数据
    //2. 编写SQL语句
    const sql = 'select * from ali_admin';
    //3. 执行SQl语句
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.send({code:201, message:"查询管理员信息失败"});
        }

        res.send({code:200, message:"查询管理员信息成功", list: result});
    })
})

//创建admin/user/adduser显示页面
router.get('/admin/user/adduser',(req,res)=>{
    res.render(path.join(rootPath,'view','admin/user/adduser.html'))
})
//显示edituser.html页面
router.get('/admin/user/edituser', (req, res) => {
    //1. 接收数据
    const admin_id = req.query.id;
    console.log(admin_id)
    
    //2. 编写SQL语句
    const sql = 'select * from ali_admin where admin_id=?';
    //3. 执行SQl语句
    db.query(sql, admin_id , (err, result) => {
        console.log(result)
        res.render(path.join(rootPath,'view','admin/user/edituser.html'),result[0]);
    })
})

//显示个人中心页面 ----- admin/center/profile.html
router.get('/admin/center/profile',(req,res)=>{
    const userinfo = req.session.userInfo;
    res.render(path.join(rootPath,'view','admin/center/profile.html'),userinfo);
})
//显示修改密码页
router.get('/admin/center/passwd',(req,res)=>{
    res.render(path.join(rootPath,'view','/admin/center/passwd.html'));
})

//导出路由模块
module.exports = router;