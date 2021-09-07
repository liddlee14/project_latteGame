var http=require("http");
var express = require("express");
var app=express();
var cookie = require('cookie');


// let router = express.Router();
let jwt = require("jsonwebtoken");
let secretObj = require("./lib/jwt/config.js");

//익스프레스 미들웨어 제발하자!!
app.use(express.urlencoded({extended:true}));//포스트방식 처리

//스테틱 기본값 설정
var static=require("serve-static");
app.use(static(__dirname+"/static"));
var mymodule=require("./lib/mymodule.js");

//mysql 모듈, 세팅값
var mysql=require("mysql");
const conStr={
    host:"my5701.gabiadb.com",
    user:"rooter",
    password:"dbdgkq1020!",
    database:"ngmdate"
}
//로그인 세션설정

var expressSession=require("express-session"); //서버측의 세션을 관리하는 모듈
//세션 설정   -> use : 미들웨어
app.use(expressSession({
    secret:"key secret",
    resave:true,
    saveUninitialized:true
}));

// 파일 ejs 리딩 세팅
var ejs=require("ejs");
app.set("view engine","ejs");

//메인페이지
app.get("",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    response.render("main",{
        loginInfo:request.session.user
    })
});

//랭킹
app.get("/about",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    response.render("about",{
        loginInfo:request.session.user
    })
});

//게임켜기
app.get("/cafedefence",function(request, response){
    let rankquery="select @cd_rank := @cd_rank+1 as cd_rank, a.user_num ,a.score_cd, b.nickname from latte_rank a,latte_user b,(select @cd_rank := 0) tmp where a.user_num=b.user_num order by score_cd desc limit 7";
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    var con =mysql.createConnection(conStr);
    con.query(rankquery,function (err,result,feld){
        if (err){
            console.log(err);
        }else{
            response.render("SukGame/Sukmain",{
                loginInfo:request.session.user,
                rankindex:result
            })
        }
        con.end();
    });

});
app.get("/coffeetail",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    response.render("HwanGame/intro",{
        loginInfo:request.session.user,
    })
});
app.get("/coffeetail/game",function(request, response){
    let rankquery="select @ct_rank := @ct_rank+1 as ct_rank, a.user_num ,a.score_ct, b.nickname from latte_rank a,latte_user b,(select @ct_rank := 0) tmp where a.user_num=b.user_num order by score_sc desc limit 7";
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    var con =mysql.createConnection(conStr);
    con.query(rankquery,function (err,result,feld){
        if (err){
            console.log(err);
        }else{
            console.log(result);
            response.render("HwanGame/coffeeTail",{
                loginInfo:request.session.user,
                rankindex1:result
            })
        }
        con.end();
    });
});
app.get("/dodgeit",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    response.render("EstherGame/dgIntro",{
        loginInfo:request.session.user,
    })
});
app.get("/dodgeit/dgMain",function(request, response){
    let rankquery="select @dg_rank := @dg_rank+1 as dg_rank, a.user_num ,a.score_dg, b.nickname from latte_rank a,latte_user b,(select @dg_rank := 0) tmp where a.user_num=b.user_num order by score_sc desc limit 7";
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    var con =mysql.createConnection(conStr);
    con.query(rankquery,function (err,result,feld){
        if (err){
            console.log(err);
        }else{
            response.render("EstherGame/dgMain",{
                loginInfo:request.session.user,
                rankindex:result
            })
        }
        con.end();
    });
});

app.get("/skycoffee",function(request, response){

    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    response.render("JohnGame/intro",{
        loginInfo:request.session.user
    })
});
app.get("/skycoffee/game",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    response.render("JohnGame/game",{
        loginInfo:request.session.user
    })
});

//랭킹
app.get("/ranking",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    let rankquery=[
        //커피디팬스
        "select @cd_rank := @cd_rank+1 as cd_rank, a.user_num ,a.score_cd, b.nickname from latte_rank a,latte_user b,(select @cd_rank := 0) tmp where a.user_num=b.user_num order by score_cd desc limit 5",
        //커피테일
        "select @ct_rank := @ct_rank+1 as ct_rank, a.user_num ,a.score_ct, b.nickname from latte_rank a,latte_user b,(select @ct_rank := 0) tmp where a.user_num=b.user_num order by score_ct desc limit 5",
        //더지잇
        "select @dg_rank := @dg_rank+1 as dg_rank, a.user_num ,a.score_dg, b.nickname from latte_rank a,latte_user b,(select @dg_rank := 0) tmp where a.user_num=b.user_num order by score_dg desc limit 5",
        //스카이커피
        "select @sc_rank := @sc_rank+1 as sc_rank, a.user_num ,a.score_sc, b.nickname from latte_rank a,latte_user b,(select @sc_rank := 0) tmp where a.user_num=b.user_num order by score_sc desc limit 5"
    ];
    let totalsql="select a.user_num, a.cd_rank, a.score_cd, b.sc_rank, b.score_sc, c.dg_rank,c.score_dg,d.ct_rank,d.score_ct, e.nickname, sum(a.cd_rank+b.sc_rank+c.dg_rank+d.ct_rank) as totalrank , @tt_rank := @tt_rank+1 as tt_rank from (select @cd_rank := @cd_rank+1 as cd_rank, a.user_num ,a.score_cd from latte_rank a,(select @cd_rank := 0) tmp order by score_cd desc) a, (select @sc_rank := @sc_rank+1 as sc_rank, a.user_num ,a.score_sc from latte_rank a,(select @sc_rank := 0) tmp order by score_sc desc) b, (select @dg_rank := @dg_rank+1 as dg_rank, a.user_num ,a.score_dg from latte_rank a,(select @dg_rank := 0) tmp order by score_sc desc) c, (select @ct_rank := @ct_rank+1 as ct_rank, a.user_num ,a.score_ct from latte_rank a,(select @ct_rank := 0) tmp order by score_sc desc) d, latte_user e, (select @tt_rank := 0) tmp where a.user_num=b.user_num and b.user_num=c.user_num and c.user_num=d.user_num and d.user_num=e.user_num group by a.user_num order by totalrank asc limit 3";
    var con =mysql.createConnection(conStr);

    var rankRes=[];
    var sql=rankquery[0];
    con.query(sql,function(err,result1,fields){//커피디팬스
        if(err){
            console.log(err)
            con.end()
        }else{
            rankRes.push(result1);
            sql=rankquery[1];
            con.query(sql,function(err,result2,fields){//커피테일
                if(err){
                    console.log(err)
                    con.end()
                }else{
                    rankRes.push(result2);
                    sql=rankquery[2];
                    con.query(sql,function(err,result3,fields){//더지잇
                        if(err){
                            console.log(err)
                            con.end()
                        }else{
                            rankRes.push(result3);
                            sql=rankquery[3];
                            con.query(sql,function(err,result4,fields){//스카이커피
                                if(err){
                                    console.log(err)
                                    con.end()
                                }else{
                                    rankRes.push(result4);
                                    con.query(totalsql,function(err,result5,fields) {
                                        if(err){
                                            console.log(err)
                                            con.end()
                                        }else{
                                            response.render("ranking",{
                                                loginInfo:request.session.user,
                                                rankArr:rankRes,
                                                totalrank:result5
                                            })
                                            con.end()
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});




//랭킹 업데이트
app.post("/updaterank",function (request,response){
    var con =mysql.createConnection(conStr);
    //"score="+score+"&game=cd"
    var gamename="score_"+request.body.game;
    var score=request.body.score;
    var dbScore=0;
    var sql="select "+gamename+" from latte_rank where user_num="+request.session.user.user_num;

    con.query(sql,function (err,result,fields) {
        if (err){
            console.log(err);
        }else{
            if (result[0].score_cd!=undefined){
                dbScore=result[0].score_cd;
            }else if(result[0].score_sc!=undefined){
                dbScore=result[0].score_sc;
            }else if(result[0].score_dg!=undefined){
                dbScore=result[0].score_dg;
            }else if(result[0].score_ct!=undefined){
                dbScore=result[0].score_ct;
            }
            if(score<=dbScore){
                response.end("notReach");
            }else{
                var updateSql="update latte_rank set "+gamename+"="+score+" WHERE user_num="+request.session.user.user_num;
                con.query(updateSql, function (err,fields){
                    if(err){
                        console.log("업데이트 에러",err)
                    }else{
                        console.log(2222);
                        response.end("reach");
                    }
                });
            }
        }
        con.end();
    })
});


//자유게시판
app.get("/freeboard",function(request, response){
    //클라이언트가 전송한 파라미터 받기!!!
    var currentPage = request.query.currentPage; //클라이언트가 보기를 원하는 페이지수

    //게시판의 최초 접속이라면, currentPage정보가 없기 때문에 1페이지로 간주함
    if(currentPage==undefined){
        currentPage=1;
    }
    if(request.session.user==undefined) {
        request.session.user = {
            user_num: 1,
            user_id: 1,
            user_name: 1
        };
    }
    let con=mysql.createConnection(conStr);

    let sql="select * from latte_board a, latte_user b where a.user_num=b.user_num order by a. board_id desc"
    con.query(sql, function (err,result,fields){
        if (err){
            console.log("글 조회 에러"+err);
        }else{
            result.splice(result.length-6,6);
            response.render("freeBoard",{
                loginInfo:request.session.user,
                boardContent:result,
                currentPage:currentPage
            });
        }
        con.end();
    });
});

//글쓰기
app.get("/writeboard",function(request, response){
    if(request.session.user==undefined) {
        request.session.user = {
            user_num: 1,
            user_id: 1,
            user_name: 1
        };
    }
    if(request.session.user.user_num==1){
        response.render("main",{
            loginInfo:request.session.user
        })
    }else{
        response.render("writeboard",{
            loginInfo:request.session.user
        })
    }
});

//글쓰기
app.post("/writescript",function (req, res) {
    let title=req.body.title;
    let content=req.body.content;
    let user_num=req.session.user.user_num;
    var con =mysql.createConnection(conStr);
    let sql="insert into latte_board(user_num, title, board_content) values(?,?,?)"
    con.query(sql,[user_num,title,content],function(err,fields){
        if (err){
            console.log("글 등록 실패",err)
        }else{
            res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
            res.end();
        }
        con.end();
    });
});

//글보기
app.get("/seecontent",function(request, response){
    if(request.session.user==undefined) {
        request.session.user = {
            user_num: 1,
            user_id: 1,
            user_name: 1
        };
    }
    var board_id=request.query.board_id;

    let resultArr=[];
    let sql="select * from latte_board a, latte_user b where a.board_id="+board_id
    sql+=" and a.user_num=b.user_num"
    let con=mysql.createConnection(conStr);
    con.query(sql,function (err,result,fields){
        if (err){
            console.log("개시글 조회 실패",err)
        }else{
            resultArr.push(result);
            let comsql="select * from latte_comments a,latte_user b where a.board_id="+board_id+" and a.user_num=b.user_num order by a.comment_id desc limit 10"
            con.query(comsql,function (err,result2,fields) {
                if (err) {
                    console.log("코맨트 조회 시래", err)
                } else {
                    console.log(result2);
                    resultArr.push(result2);

                    response.render("seecontent", {
                        loginInfo: request.session.user,
                        result: resultArr[0],
                        result2: resultArr[1]
                    })
                }
            });
        }
        con.end();
    });
});

//스크린샷
app.get("/screenshot",function(request, response){
    if(request.session.user==undefined) {
        request.session.user = {
            user_num: 1,
            user_id: 1,
            user_name: 1
        };
    }
    response.render("screenshot",{
        loginInfo:request.session.user
    })
});

//스크린샷 글쓰기
app.get("/writeboardscreen",function(request, response){
    if(request.session.user==undefined) {
        request.session.user = {
            user_num: 1,
            user_id: 1,
            user_name: 1
        };
    }
    response.render("writeboardscreen",{
        loginInfo:request.session.user
    })
});

//끝말잇기
app.get("/wordchain",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    var con =mysql.createConnection(conStr);

    var sql="(select a.comment_id, a.user_num, a.comment_content, a.regdate, b.nickname";
    sql+=" from latte_comments a, latte_user b";
    sql+=" where a.user_num=b.user_num";
    sql+=" and a.board_id=2";
    sql+=" order by comment_id desc limit 11) order by comment_id";
    con.query(sql,function(err,result,fields){
        if(err){
            console.log(err)
        }else{
            response.render("wordChain", {
                result : result,
                loginInfo:request.session.user
            });
        }
        con.end();
    });
});
app.get("/gamereview",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    response.render("gamereview",{
        loginInfo:request.session.user
    })
});

//채팅 화면(문의)
app.get("/chat",function(request, response){
    if (request.session.user==undefined){
        response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        response.end(mymodule.getMsgUrl("비 정상적인 접근입니다.","http://49.247.128.53/"));
    }else {
        if (request.session.user.user_num == 1) {
            response.render("chat", {
                loginInfo: request.session.user
            });
        } else {
            var cookies = {};
            if (request.headers.cookie !== undefined) {
                cookies = cookie.parse(request.headers.cookie);
            }
            let token = cookies.user;
            let decoded = jwt.verify(token, secretObj.secret);
            if (decoded) {
                response.render("chat", {
                    loginInfo: request.session.user
                });
            } else {
                if (cookies == request.session.user.jwtToken) {
                    let token = jwt.sign({
                            user: user_id
                        },
                        secretObj.secret,    // 비밀 키
                        {
                            expiresIn: '30m'    // 유효 시간은 30분
                        }, function (err, token) {
                            response.cookie("user", token);
                            response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
                            response.render("chat", {
                                loginInfo: request.session.user
                            });
                        });
                } else {
                    request.session.user = {
                        user_num: 1,
                        user_id: 1,
                        user_name: 1,
                    };
                    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
                    response.render("chat", {
                        loginInfo: request.session.user
                    });
                }
            }
        }
    }
});



//코맨트리스트 불러오기
app.get("/comments/list", function(request,response){
    var con =mysql.createConnection(conStr);
    var board_id=request.query.board_id;
    var sql="(select a.comment_id, a.user_num, a.comment_content, a.regdate, b.nickname";
    sql+=" from latte_comments a, latte_user b";
    sql+=" where a.user_num=b.user_num";
    sql+=" and a.board_id="+board_id;
    sql+=" order by comment_id desc limit 24) order by comment_id";
    con.query(sql,function(err,result,fields){
        if(err){
            console.log(err)
        }else{
            response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
            response.end(JSON.stringify(result));
        }
        con.end();
    });
});

//코맨트 등록하기
app.post("/comments/regist", function(request, response){
    var con =mysql.createConnection(conStr);
    //파라미터 받기 
    var board_id=request.body.board_id;
    var user_num=request.body.user_num;
    var msg=request.body.msg;
    var sql="insert into latte_comments(board_id, user_num, comment_content) values(?,?,?)";
    con.query(sql, [board_id, user_num, msg] , function(error, fields){
        if(error){
            console.log(error);
            var str="";
            str+="{";
            str+="\"result\":0";
            str+="}";
            response.end(str)
        }else{
            response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
            var str="";
            str+="{";
            str+="\"result\":1";
            str+="}";
            response.end(str);
        }
        con.end(); //mysql 접속 해제
    });
});

//로그인폼
app.get("/loginform",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    if(request.headers.referer=="http://49.247.128.53/regist"){
        request.headers.referer= "http://49.247.128.53/"
    }
    response.render("login",{
        latteUrl:request.headers.referer,
        loginInfo: request.session.user
    });
});
//회원가입 페이지
app.get("/regist",function(request, response){
    if(request.session.user==undefined){
        request.session.user={
            user_num: 1,
            user_id:1,
            user_name:1
        };
    }
    response.render("member",{
        loginInfo: request.session.user
    });
});

app.post("/regist/user",function (req,res){
    var user_id = req.body.user_id;
    var user_pass = req.body.user_pass;
    var user_name = req.body.user_name;
    var nickname = req.body.nickname;
    var user_num;
    console.log(user_id,user_pass,user_name,nickname);

    var sql="insert into latte_user(user_id, user_pass, user_name, nickname) values(?,?,?,?)";
    var con=mysql.createConnection(conStr);
    // 아이디 저장
    con.query(sql,[user_id,user_pass,user_name,nickname],function (err,fields){
        if(err){
            console.log("아이디 저장 실패",err)
            con.end();
        }else{
            var selectsql="select user_num from latte_user where user_id=? and user_pass=? and user_name=? order by user_num desc";
            con.query(selectsql,[user_id,user_pass,user_name],function (err,result,fields){
                if(err){
                    console.log("아이디 조회 실패",err)
                    con.end();
                }else{
                    user_num=result[0].user_num
                    var ranksql="insert into latte_rank(user_num, score_sc,score_dg,score_ct,score_cd) values(?,0,0,0,0)";
                    con.query(ranksql,[user_num],function (err,fields){
                        if(err){
                            console.log("랭킹 저장 실패",err)
                            con.end();
                        }else{
                            res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
                            res.end();
                            con.end();
                        }
                    });
                }
            });
        }
    });
});


app.get("/logout",function(request, response){
    request.session.destroy();
    response.redirect("http://49.247.128.53/")
});

//로그인 요청 처리
app.post("/login", function(request, response){
    var user_id=request.body.user_id;
    var user_pass=request.body.user_pass;
    var latteUrl=request.body.latteUrl;


    // default : HMAC SHA256
    let token = jwt.sign({
            user:user_id
        },
        secretObj.secret ,    // 비밀 키
        {
            expiresIn: '30m'    // 유효 시간은 30분
        },function (err,token){
            var sql="select * from latte_user where user_id=? and user_pass=?";
            var con=mysql.createConnection(conStr);
            con.query(sql, [user_id, user_pass] , function(err,  result , fields){
                if(err){
                    console.log("조회 실패", err);
                }else{
                    if(result.length <1){
                        console.log("로그인 실패");
                        //이전 화면으로 강제로 되돌리기  history.back()
                        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                        response.end(mymodule.getMsgBack("로그인 정보가 올바르지 않습니다"));
                    }else{
                        request.session.user={
                            user_num: result[0].user_num,
                            user_id:result[0].user_id,
                            jwtToken:token,
                            user_name:result[0].nickname
                        };
                        response.cookie("user", token);
                        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                        response.end(mymodule.getMsgUrl("로그인성공",latteUrl));
                    }
                }
                con.end();
            });
    });
});



var server = http.createServer(app);
server.listen(80,function(){
    console.log("Cute John is running at 80 port...");
});