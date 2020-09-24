var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(3000, function(){
 console.log("Express server has started on port 3000")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));


var router = require('./router/main')(app, fs);


/**2단계: 동적인 출력 REST API 만들어보기 (구구단 화면및 파일출력) */

//express 프레임워크 불러오기
// const express = require('express');
// const app = express();
 
// app.get('/', (req, res) => {
//     var num = req.param('num');
//     let resultString = "";
 
//     if(num.match(/[1-9]/g)){
//         //1)요청받은 수의 구구단 json파일로 응답하기
//         for(var j = 1;j<10;j++){
//             resultString = resultString+num+ "*" + j + "=" + num * j+"\\n";
//         }
//         res.setHeader('Content-Type','application/json');
//         res.send(JSON.stringify({result:resultString}));

//         //2)text.txt라는 파일에 구구단 출력하기
//         var fs = require('fs');
//         var writeString = "";
        
//         //구구단 출력문 만들기
//         for(var i=1;i<10;i++){
//             for(var j=2;j<10;j++) {
//                 writeString = writeString +j + "*" + i + "=" + i * j + "\t";
//             }
//             writeString = writeString + "\n";
//         }
        
//         //파일로 내보내기
//         fs.writeFile('./text.txt',writeString,function(err,data)
//         {
//             console.log('file writed');
//         })

//     }
//     else{
//         res.setHeader('Content-Type','application/json');
//         res.send(JSON.stringify({result:'400 error'}));
//     }
// });
 
// app.listen(3000, () => {
//     console.log('Example app listening on port 3000!');
// });


/**1단계: 가장 기초적인 출력 REST API 만들어보기 */

////express 프레임워크 불러오기
// var express = require('express'); 
// var app = express(); 

////json 파일 불러오기
// var package_file = require('./package.json') 


////servers 라는 url 요청받으면 테스트/베타서버 json파일 send하기
// app.get('/servers', function(req, res) {
//     res.send([{name:'test-server'},{name:'beta-server'}]);
// });

////servers 라는 url 요청받으면 패키지정보 json파일 send하기
// app.get('/status', function(req,res) {
//     res.send(package_file);
// });

////포트번호 지정
// app.listen(process.env.PORT);

////서버가동시 콘솔 출력문
// console.log("Server run at " + process.env.PORT);

