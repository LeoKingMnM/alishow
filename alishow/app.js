const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log('Alishow-Server is running...');
})
//app.js中使用 __dirname 路径就会指向到 alishow 目录
//将app.js文件指向的 alishow 目录挂载到global对象上
//被app.js加载的模块就都能使用了
global.rootPath = __dirname;

//加载express-art-template并配置模板引擎
app.engine('html', require('express-art-template'));

//托管静态资源 --- 将assets目录整体托管
app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
app.use('/upload', express.static('./upload'));

//加载body-parser模块并注册为中间件
const bp = require('body-parser');
app.use(bp.urlencoded({extended:false}));

//加载express-session模块并注册为中间件
const session = require('express-session')
app.use(session({
    secret:'asdasd123ddasd',
    resave:false,
    saveUninitialized:false
}))

//注册检测session的中间件
app.use(checkSession)

//加载路由模块并注册为中间件
//加载栏目管理的路由模块
const router_cate = require('./router/router_cate.js');
app.use(router_cate);

//加载前台使用的路由模块
const router_front = require('./router/router_front.js');
app.use(router_front);

//加载管理员管理的路由模块
const router_user = require('./router/router_user.js');
app.use(router_user);

//加载文章模块
const router_post = require('./router/router_post.js');
app.use(router_post);

const router_other = require('./router/router_other.js');
app.use(router_other);

//api.js中间件
const api = require('./api.js')
app.use(api)



//定义检测session中间件
function checkSession(req,res,next) {
    const allow_url = ['/admin/login','/api/login/checkLogin','/index','/list','/detail']
    if (allow_url.includes(req.url)) {
        return next()
    }
    if (req.session.isLogin != true) {
        return res.redirect('/admin/login')
    }else{
        next()
    }
}





