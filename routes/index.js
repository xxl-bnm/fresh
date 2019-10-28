var express = require('express');
var async = require('async');
var router = express.Router();
var jwt =require('jsonwebtoken');
var mongodb = require('mongodb').MongoClient;
var ObjectId =require('mongodb').ObjectId;
var db_url = "mongodb://localhost:27017/userdb";

//var jwt=require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {//以变量传值，渲染页面index,
  res.render('index', {username:req.session.username });
});
//登录
router.get('/login',(req,res)=>{
	res.render('login',{})
})
//注册
router.get('/register',(req,res)=>{
	res.render('register',{})
})
//退出
router.get('/relogin',(req,res)=>{
	req.session.destroy((err)=>{//销毁用户名
		if(err) throw err;
		res.redirect('/login');//退出后重定向到登录页面
	})
})
//留言
router.get('/liuyan',(req,res)=>{
	res.render('liuyan',{})
})
//同源不跨域测试接口
router.get('/test',(req,res)=>{
	res.send('我是测试数据')
})
//后端校验token
router.post('/jiaoyan',(req,res)=>{
	let token =req.headers.token;//前端传过来的token
	let miyao ="jwt";
	//给出验证信息，
	jwt.verify(token,miyao,(err,data)=>{
		if(err){//有错，不抛异常，给一个提示信息
			res.json({msg:'登录过期'});
		}else{
			res.json({msg:'success'});
		}
	})
})
//列表,
//从数据库（需要引进来）取到数据以变量存储，在boke页面取到变量进行遍历展示
router.get('/boke',(req,res)=>{
	mongodb.connect(db_url,(err,db)=>{
		db.collection('boke',(err,coll)=>{
			//前端传页码数
			var pageNo =req.query.pageNo;
			pageNo=pageNo?pageNo:1;
			//总数据
			var count =0;
			//每页展示条数，自己定义
			var size =2;
			//总页数
			var page =0;
			async.series([
				function (callback) { 
					coll.find().toArray((err,result)=>{
						count=result.length;
						page =Math.ceil(count/size);

						pageNo=pageNo<=1?1:pageNo;
						pageNo=pageNo>=page?page:pageNo;

						callback(null,'');
						db.close();
					})
			},
			function (callback) { 
				coll.find().sort({_id:-1}).limit(size).skip((pageNo-1)*size).toArray((err,info)=>{
					callback(null,info);
					db.close();
				})
			 }
			],(err,data)=>{
					//data=['',info]
					res.render('boke',{data:data[1],pageNo:pageNo,page:page})
			})
			
		})
	})
})
//详情,接受参数，查找对应的id的文章内容get传参取值query，post以req.body
router.get('/detail',(req,res)=>{
	//console.log(req.query)//对象形式，在控制台查看，
	let id =ObjectId(req.query.id);//onjectId是一个对象，符合格式
	//let title=req.query.title;
	mongodb.connect(db_url,(err,db)=>{
		db.collection('boke',(err,coll)=>{
			coll.find({_id:id}).toArray((err,data)=>{
				//console.log(data);
				res.render('detail',{detail:data[0]});
				db.close();
			})
		})
	})
})
//修改---路径传参数给前端
router.get('/update',(req,res)=>{
	let id =ObjectId(req.query.id);
	mongodb.connect(db_url,(err,db)=>{
		db.collection('boke',(err,coll)=>{
			coll.find({_id:id}).toArray((err,data)=>{
				//console.log(data);
				res.render('update',{x_detail:data[0]});
				db.close();
			})
		})
	})
})
module.exports = router;
