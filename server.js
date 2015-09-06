var express =  require("express");

var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get("/",function(req,res){
    res.sendFile("../public/index.html");
});

var port = process.env.PORT || 8000;

var server = app.listen(port,function(){
    console.log("Listen on port:", port);
});