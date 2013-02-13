exports.edit=function(req,res){
	res.render('edit',{title:'Edit profile', dispUser: req.session.user});
}