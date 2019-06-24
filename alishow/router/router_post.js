//显示前台的三个页面
const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');

router.get('/admin/post/addpost',(req,res)=>{
    res.render(path.join(rootPath, 'view', '/admin/post/addpost.html'));
})

router.get('/admin/post/posts',(req,res)=>{
    res.render(path.join(rootPath, 'view', '/admin/post/posts.html'));
})

module.exports = router;