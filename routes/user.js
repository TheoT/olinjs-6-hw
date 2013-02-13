
/*
 * GET users listing.
 */
var Facebook = require('facebook-node-sdk')
 ,  models = require('../models');

User=models.User;


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login=function(req,res){

	req.facebook.api('/me',function(err,data){
		User.find({userID: data.id}).execFind(function(err,docs){
			if (docs.length>1){
				console.log('found user in DB ',docs[0]);
				req.session.user=docs[0];
				res.redirect('/');
			}
			else{
				console.log('creating new  users');
				req.facebook.api('/me/picture?redirect=false&type=large', function(err, picData) {
					user=new User();
					console.log('fetching pic');
					user.userID=data.id;
					user.name=data.name;
					user.picUrl=picData.data.url;
					user.style={backgroundCol:'#00FF00'}
					user.save(function(err){
						if (err)
							return console.log(err);
						console.log("saved user ",user);
						req.session.user=user;
						res.redirect('/')
					});
				});
			}
		});
	});
}

exports.logout=function(req,res){
	console.log(req.session.user.userID)
	User.update({userID:req.session.user.userID},{style: {backgroundCol:req.session.user.backgroundCol}}
		,{ multi: true },function(err,num){
			console.log(num)
			req.facebook.getLogoutUrl(function (err, url){
				res.redirect(url);
				req.session.auth = null;
	  		 	res.clearCookie('auth');
	   			req.session.destroy(function() {});
			});
		});
};

exports.loggedOut=function(req,res){
	res.render('index',{title:'Logged Out'});
};

exports.saveProfile=function(req,res){
	User.update({userID:req.session.user.userID},{style: {backgroundCol:req.body.backgroundCol}}
		,{ multi: true },function(err,num){
		req.session.user.style.backgroundCol=req.body.backgroundCol;
		res.redirect('/')
	});
};