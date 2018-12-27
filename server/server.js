/** Modules */
var express = require('express');
var app = express();
var path = require('path');
var debug = require('debug')('apartment-social-network:server');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var _ = require('lodash');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

/** Routers */
var user = require('./routes/user');
var route = require('./routes/route');
var post = require('./routes/post')
var apartment = require('./routes/apartment');
var chat = require('./routes/chat')
var report = require('./routes/report')
var trade = require('./routes/trade')

/** Variables */
let onlineUsers = [];
var chats = require('./models/Chat.jsx');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../public'));
app.set('socketio', io);
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));


/** Connect Mongodb */
mongoose.connect('mongodb://1453039:chautinhtri123@ds145083.mlab.com:45083/apartment_social_network', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/apartment-social-network', { useNewUrlParser: true });

app.use(session({
  secret: 'MySuperSecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  rolling: true
}));

// Setting Router
app.use('/', route);
app.use('/user', user);
app.use('/post', post)
app.use('/apartment', apartment);
app.use('/chat', chat);
app.use('/report', report);
app.use('/trade', trade);

/** SOCKET!!! */
app.get('/connected/:socketId', function (req, res, next) {
  if (req.session.user) {
    let onlineUser = {}
    onlineUser.socketId = req.params.socketId
    onlineUser.user = req.session.user
    onlineUsers.push(onlineUser)
    io.sockets.emit('OnlineUserChange', onlineUsers);
    res.json({
      message: 'connect',
    })
  } else {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
})


app.get('/getOnlineUsers', function (req, res) {
  var results = onlineUsers.filter(item => item.user.apartment == req.query.apartmentId && item.user._id != req.query.userId)
  res.json(results);
})

io.on('connection', function (socket) {
  console.log(socket.id, "online user connected!!");

  socket.on('disconnect', function () {
    onlineUsers = onlineUsers.filter(item => item.socketId !== socket.id)
    console.log(socket.id, "disconnected!");
    io.sockets.emit('OnlineUserChange', onlineUsers);
  });

  socket.on('chat', function (data) {
    var chat = new chats()
    var now = new Date()
    chat.from = data.from
    chat.to = data.to
    chat.detail = data.detail
    chat.linkImg = data.linkImg
    chat.time = now
    chat.save(function (err) {
    if (err)
      res.json(err);
    });
    data = chat
    io.sockets.emit('updateMessage', data);
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}