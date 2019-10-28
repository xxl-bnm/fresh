var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId =require('mongodb').ObjectId;
var jwt =require('jsonwebtoken');
var db_url = "mongodb://localhost:27017/userdb";
var upload=require('./upload')//同路径
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});
//注册
router.post('/register', (req, res) => {
	//console.log(req.body)
	mongodb.connect(db_url, (err, db) => {
		db.collection("student", (err, coll) => {
			//注册是在数据库中插入信息
			coll.find({username: req.body.username}).toArray((err,data) => {
					//data是查找的数据
					if(data.length > 0) {
							res.json({msg: '用户名已存在'});
							db.close();
					}else {
						coll.insert(req.body, () => {
							res.json({msg: 'success'})
							db.close();
						})
					}
				})
		})
	})
})
//登录
router.post('/login',(req,res)=>{
	mongodb.connect(db_url,(err,db)=>{
		db.collection("student",(err,coll)=>{
			coll.find(req.body).toArray((err,data)=>{
				if(data.length >0){//查询到记录，请求体的username保存到session中
					//token
					let content ={name:req.body.username};
					let miyao ='jwt';
					//给前端的token值
					let token =jwt.sign(content,miyao,{expiresIn:10*1*1});

					req.session.username=req.body.username//data[0].username
					//json格式的数据返回前端
					res.json({msg:'success',token:token});
					db.close();
				}else{
					res.json({msg:'用户名或密码错误'})
					db.close();
				}
			})
		})
	})
})
//发布---->渲染index.js---->放到数据库
router.post('/boke',(req,res)=>{
	mongodb.connect(db_url,(err,db)=>{//洗的集合
		db.collection('boke',(err,coll)=>{//插入前端传过来的数据标题和内容
			coll.insert(req.body,()=>{
				res.json({msg:'success'});//插入全部对象到数据库
				db.close();
			})
		})
	})
})
//查找
router.post('/find',(req,res)=>{
	let title =req.body.title;
	mongodb.connect(db_url,(err,db)=>{
		db.collection('boke',(err,coll)=>{
			coll.find({title:title}).toArray((err,data)=>{
				console.log(data);
				req.json({msg:data});
				db.close();
			})
		})
	})
})
//删除
router.post('/del',(req,res)=>{
	let id =ObjectId(req.body.id);
	mongodb.connect(db_url,(err,db)=>{
		db.collection('boke',(err,coll)=>{
			coll.deleteOne({_id:id},()=>{
				res.json({msg:'success'});
				db.close();
			});
		})
	})
})
//修改----参数操作后台
router.post('/update',(req,res)=>{
	let id =ObjectId(req.body.id);
	let title=req.body.title;
	let con =req.body.con;
	mongodb.connect(db_url,(err,db)=>{
		db.collection('boke',(err,coll)=>{
			coll.updateOne({_id:id},{$set:{title:title,con:con}},()=>{
				res.json({msg:'ok'});
				db.close();
			})
		})
	})
})

//富文本图片上传
router.post('/uploadImg',(req,res)=>{
	upload(req,res);
})
//富文本视频上传
router.post('/upload.html',(req,res)=>{
	upload(rea,res);
})

module.exports = router;