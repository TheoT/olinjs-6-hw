
/*
 * GET home page.
 */

exports.index = function(req, res){
	if (req.session.user==undefined){
  		res.redirect('/login');
  	}
  	else{
  		res.render('profile',{dispUser: req.session.user, title:'Profile'});
  	}
};