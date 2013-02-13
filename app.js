
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , profile= require('./routes/profile')
  , http = require('http')
  , path = require('path')
  , mongoose= require('mongoose')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(process.env.SECRET || 'your secret here'));
  app.use(express.session());
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(Facebook.middleware({ appId: '336311496486249', secret: '192d37e15ac5749a734bce7da9291c81' }));

  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/login',Facebook.loginRequired(),user.login);
app.post('/logout',user.logout);
app.get('/logout',routes.index);
app.get('/edit', profile.edit);
app.post('/edit/save',user.saveProfile);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
