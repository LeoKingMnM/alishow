const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');

//显示admin/other/slides.html
router.get('/admin/other/slides',(req,res)=>{
    res.render(path.join(rootPath, 'view', '/admin/other/slides.html'));
})

router.get('/admin/other/settings',(req,res)=>{
    res.render(path.join(rootPath, 'view', '/admin/other/settings.html'));
})
module.exports = router;