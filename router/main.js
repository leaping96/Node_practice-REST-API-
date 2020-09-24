//url 유형에 따라 어떤 페이지를 띄울지 결정하는 모듈
module.exports = function(app, fs)
{
    //루트표시만 받을경우 index.js 파일을 띄우기
    app.get('/',function(req,res){
        var sess = req.session;


        res.render('index', {
            title: "Welcome Cocktail!",
            length: 5,
            name: sess.name,
            username: sess.username
        })
    });

    //1.전체출력 API [GET방식]
    //list url이 덧붙여 올경우 data 폴더안의 json파일을 콘솔및 페이지에 출력
    app.get('/list', function (req, res) {
       fs.readFile( __dirname + "/../data/cocktail.json", 'utf8', function (err, data) {
           //console.log( data );
           res.end( data );
       });
    });

    //2.선택출력API [GET방식]
    //getUser url이 덧붙여 올경우 username에 해당하는 부분의 데이터만 페이지에 출력
    app.get('/getCocktail/:name', function(req, res){
       fs.readFile( __dirname + "/../data/cocktail.json", 'utf8', function (err, data) {
            var users = JSON.parse(data);
            res.json(users[req.params.name]);
       });
    });

    //3.삽입API [POST방식]
    //addUser url이 덧붙여 올경우 username에 해당하는 passoword,name값을 json파일에 추가
    app.post('/addCocktail/:name', function(req, res){

        var result = {  };
        var name = req.params.name;

        //1)요청값 제대로 입력되었는지 검사
        if(!req.body["category"] || !req.body["alchol-level"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        //2)데이터 로드하고 중복검사후 저장
        fs.readFile( __dirname + "/../data/cocktail.json", 'utf8',  function(err, data){
            var cocktails = JSON.parse(data);
            if(cocktails[name]){
                //중복될경우 에러문 출력 (이미 해당 칵테일 이름 존재한다면)
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            //칵테일 데이터 추가
            cocktails[name] = req.body;

            //추가한 데이터로 업치기
            fs.writeFile(__dirname + "/../data/cocktail.json",
                         JSON.stringify(cocktails, null, '\t'), "utf8", function(err, data){
                result = {"success": 1};
                res.json(result);
            })
        })
    });

    //4.수정API [PUT방식]
    //updateUser url이 덧붙여 올경우 username에 해당하는 passoword,name값으로 json파일에 수정
    app.put('/updateCocktail/:name', function(req, res){

        var result = {  };
        var name = req.params.name;

        //1)요청값 제대로 입력되었는지 검사
        if(!req.body["category"] || !req.body["alchol-level"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        //2)데이터 로드해서 수정후 저장
        fs.readFile( __dirname + "/../data/cocktail.json", 'utf8',  function(err, data){
            var cocktails = JSON.parse(data);
            //칵테일 데이터 수정
            cocktails[name] = req.body;

            //수정한 데이터로 업치기
            fs.writeFile(__dirname + "/../data/cocktail.json",
                         JSON.stringify(cocktails, null, '\t'), "utf8", function(err, data){
                result = {"success": 1};
                res.json(result);
            })
        })
    });

    //5.삭제API [DELETE방식]
    //deleteUser url이 덧붙여 올경우 username에 해당하는 데이터를 json파일에서 삭제
    app.delete('/deleteCocktail/:name', function(req, res){
        var result = { };
        //1)데이터 로드해서 삭제후 저장
        fs.readFile(__dirname + "/../data/cocktail.json", "utf8", function(err, data){
            var cocktails = JSON.parse(data);

            //발견안될경우 에러문 출력
            if(!cocktails[req.params.name]){
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            //데이터에서 삭제
            delete cocktails[req.params.name];

            //삭제된 데이터로 업치기
            fs.writeFile(__dirname + "/../data/cocktail.json",
                         JSON.stringify(cocktails, null, '\t'), "utf8", function(err, data){
                result["success"] = 1;
                res.json(result);
                return;
            })
        })

    })



}