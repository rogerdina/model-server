/*
*    author(s): Guedalia Dina-Lenda
*    version: 0.0.1
*    last modified: Thursday, October 24, 2019 22:05 UTC+0100
*    description:
*
*/

/* required modules */
var bodyParser = require('body-parser');
var express = require('express');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var WhichBrowser = require('which-browser');
/* main application instance  */

var app = express();

/* main application settings  */

var config = {
    PORT: process.env.PORT || 8008,
    DIRECTORY: [
        './',           /* 0 */
        './css',        /* 1 */
        './js',         /* 2 */
        './media/model',    /* 3 */
    ]
};

var deviceType = 'unknown';
let dir = config.DIRECTORY;

var io = require('socket.io').listen(app.listen(config.PORT, function(){
    console.log('connecting \n . \n .. \n ... \n .... \n ..... \n ------------------------------------------');
    console.log('    HOUSE OF VENUS, BENEFIT CORPORATION \n MODEL SERVER \n VANTAGE v 0.0.1 ');
    console.log('------------------------------------------');
    console.log(`[0] listening on port ${config.PORT}`);
    console.log('------------------------------------------');

}));

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('/'));

app.get("/", function(req, res){
  var result = new WhichBrowser(req.headers);
  console.log(result.toString());

  if(result.isType('desktop')){
      console.log('This is a desktop computer.');
      deviceType = 'desktop';
  }
  else{
      console.log('This is a mobile device.');
      deviceType = 'mobile';
  }
  console.log(result.toString());
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("--------- HOUSE OF VENUS ---------");
  console.log("-- TreeHouse Distributed Ledger --");
  console.log("--         version 0.4.0        --");
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("-- loading...                   --");
  console.log("-- connected to TreeHouse       --");
  console.log("-- hand visualizer enabled      --");
  console.log("-- opening Lyoko Exchange...    --");
  console.log("-- .....                        --");
  console.log("-- ....                         --");
  console.log("-- ...                          --");
  console.log("-- ..                           --");
  console.log("-- .                            --");
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("-- Ready!                       --");
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("----------------------------------");

  res.render("index.html", {root: dir[0]});
});


app.get('/css/:stylesheet_id', function(req, res){
    let stylesheet_id = req.params.stylesheet_id;
    res.sendFile(stylesheet_id, {root: dir[1]});
});

app.get('/js/:script_id', function(req, res){
    var script_id = req.params.script_id;
    res.sendFile(script_id, {root: dir[2]});
});

app.get('/media/model/:model_id', function(req, res){
    var model_id = req.params.model_id;
    res.sendFile(model_id, {root: dir[8]});
});

io.sockets.on('connection', function(socket){
    console.log(`client connected at ${socket.id}`);
    socket.on('disconnect', function(){
        console.log(`socket ${socket.id} disconnected.`);
    });
});
