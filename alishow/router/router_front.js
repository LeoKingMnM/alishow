//显示前台的三个页面
const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js')
//显示前台首页  --- index.html
router.get('/index', (req, res) => {
    const sql = `select * from ali_cate;
    select * from ali_article order by rand() limit 0,5;
    select * from ali_article where article_focus=1 order by article_addtime desc limit 0,5;
    select ali_article.*, ali_cate.cate_name, ali_admin.admin_nickname from ali_article
       join ali_cate on ali_article.article_cateid = ali_cate.cate_id
       join ali_admin on ali_article.article_adminid = ali_admin.admin_id
       order by article_addtime asc
       limit 0,3;
       select * from ali_pic`;
    db.query(sql,(err,result)=>{
        const obj = {
            cate: result[0],
            rand: result[1],
            focus: result[2],
            news: result[3],
            pic: result[4],
        }
        res.render(path.join(rootPath, 'view', 'index.html'), obj);
    })
})

router.get('/list', (req, res) => {
    res.render(path.join(rootPath, 'view', 'list.html'), {});
})

router.get('/detail', (req, res) => {
    res.render(path.join(rootPath, 'view', 'detail.html'), {});
})


module.exports = router;