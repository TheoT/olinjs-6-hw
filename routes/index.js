
/*
 * GET home page.
 */

exports.index = function(req, res){
	if (req.session.user==undefined){
  		res.redirect('/login');
  	}
  	else{
  		req.facebook.api('/me/photos',function(err,photoData){

			res.render('profile',{photos:photoData.data, dispUser: req.session.user, title:'Profile'});
  		})
  	}
};