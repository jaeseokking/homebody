const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const multer = require('multer');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const secretObj = require('./config/jwt');
const fs = require('fs');
const path = require('path')
//파일 다운로드를 위한 설정
var util = require('util')
var mime = require('mime');

const gm = require('gm')



const app = express();
app.set('port', process.env.PORT || 5000);

//에러가 발생한 경우 처리
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send(err.message)
});

//데이터베이스 연결을 위한 함수를 생성 
var db;
function connect(){
    db = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: 'qhdvh15911!',
        database: 'nb'
    })
    db.connect((err) => {
        if (err) {
            console.log('mysql 연결 오류!');
            console.log(err);
            throw err;
        }else{
            console.log('mysql 연결 성공!')
        }
    })
} 
//데이터베이스 연결 해제 함수를 생성
function close(){
    console.log('myslq 연결 해제!');
    db.end();
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser());

//정적 파일(프로필, 이미지등)이 저장될 디렉토리 설정
app.use(express.static('public'));

//회원 프로필파일 업로드를 위한 리덱토리 설정
try {
	fs.readdirSync('public/images');
} catch (error) {
	console.error('images 폴더가 없으므로 images 폴더를 생성합니다.');
	fs.mkdirSync('public/images');
}


//multer 옵션 설정 
const uploadprofile = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            //업로드할 디렉토리를 설정
            done(null, 'public/images/users/');
        },
        filename(req, file, done){
            //파일 이름을 결정
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    //파일의 최대 크기를 설정
    limits: {fileSize: 10*1024*1024},
});

const uploadBoard = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            //업로드할 디렉토리를 설정
            done(null, 'public/images/board/');
        },
        filename(req, file, done){
            //파일 이름을 결정
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    //파일의 최대 크기를 설정
    limits: {fileSize: 10*1024*1024},
});

//현재시간을 문자열로 리턴하는 함수
function currentDay(){
	var date = new Date();
	year = date.getFullYear();
	
	//월을 가져오고 월이 10보다 작으면 앞에 0을 추가 
	month = date.getMonth() + 1;
	month = month > 10 ? month : '0' + month;
	
	//일을 가져오고 월이 10보다 작으면 앞에 0을 추가 
	day = date.getDate();
	day = day > 10 ? day : '0' + day;
	
	hour = date.getHours();
	hour = hour > 10 ? hour : '0' + hour
			
	minute = date.getMinutes();
	minute = minute > 10 ? minute : '0' + minute
			
	second = date.getSeconds();
	second = second > 10 ? second : '0' + second
			
			
}


//회원가입을 위한 서버
app.post('/api/member/register', uploadprofile.single('profile'), (req, res) => {
    //넘어온 값들을 변수로 받는다.
    const id = req.body.id
    const name = req.body.name
    const password = req.body.password
    const nickname = req.body.nickname
    let profileurl;
    if(req.file){
        profileurl = req.file.filename;
    }else{
        profileurl = 'default.png'
    }
    //salt로 사용할 값을 만들기위해 현재날짜와 랜덤값으로 무작위변수 생성 
    const salt = Math.round(new Date().valueOf() * Math.random()) + "";
    //알고리즘음 sha512 사용 password를 salt와 합쳐서 해쉬패스워드 생성
    const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');

     connect()
     //salt 값을 저장해서 로그인할 때 그 솔트값을 이용
     const registerSQL = 'insert into member(id, name, pw, nickname, profile, salt) values(?,?,?,?,?,?)';
     db.query(registerSQL, [id, name, hashPassword, nickname, profileurl, salt], (err, results, field) => {
        if(err){
             throw err;
         }
         if(results.affectedRows === 1){
             res.json({ registerSuccess : true})
             console.log('회원가입 완료')
         }else{
             res.json({ registerSuccess : false})
             console.log('회원가입 실패')
         }
         close();
     });
});

//로그인을 위한 서버
app.post('/api/member/login', (req, res) => {
    const id = req.body.id
    //console.log(id);
    const password = req.body.password

    connect();

    const emailCheckSQL = 'select * from member where id = ?'
    db.query(emailCheckSQL, [id], (err, results, fields) => {
        if(err){
            throw err
        }else{
            if(results[0] == undefined){
                res.json({
                    idCheck : false
                })
            }else{
                const dbPassword = results[0].pw
                //console.log(dbPassword)
                //이메일을 가진 멤머의 salt 값을 가져와서 
                const salt = results[0].salt
                //console.log(salt)
                //입력된 비밀번호를 같은 salt로 해쉬비밀번호를 만들어서 
                const hashPassword = crypto.createHash("sha512").update(password + salt).digest('hex');
                if(hashPassword === dbPassword){
                    //토큰을 생성
                    const token = jwt.sign({
                        id : id
                    },secretObj.secretKey,{ //토큰만들때 사용할 비밀키 
                        expiresIn: '60m' //토큰 유효시간 5분
                    })
                    //생성한 토큰을 넣어준다.
                    const updateToken = 'update member set token = ? where id = ?'
                    db.query(updateToken, [token, id], (err, results, field) => {
                        if(err){
                            throw err
                        } 
                    })
                    
                    var date = new Date();
                    var minutes = 60;
                    date.setTime(date.getTime() + minutes * 60 * 1000)

                    res.cookie( "user_token", token,
                    {
                        //쿠키의 시간 설정(밀리초단위)
                        expires : date,
                        //httpOnly : true
                    })
                    const bitMap = fs.readFileSync(`./public/images/users/${results[0].profile}`)
                    const profile = new Buffer.from(bitMap, "base64");

                    res.json({  
                        loginSuccess : true,
                        nickname : results[0].nickname,
                        profile : profile,
                        id : id
                    })

                    
                
                    
              
                console.log('접속완료')    
            }else{
                res.json({
                    passwordCheck : false
                })
            }
        }
        
        }
        close();
    })


})

app.get('/api/member/logout', (req, res)=> {
    
    //유저 브라우저에 쿠키로 저장했던 토큰 가져오기 
    let token = req.cookies.user_token
    //console.log(req.cookies);
    //토큰 값 복호화
    const decode = jwt.verify(token, secretObj.secretKey);
    connect();
    //id 값과 token의 값이 있으면 
    const findTokenSQL = 'select * from member where id = ? and token = ?';
    db.query(findTokenSQL, [decode.id, token], (err, results) => {
        if(err){
            throw err;
        }
        if(!results){
            res.json({
                loginSuccess : false,
                error : true
            })
        }else{
            const logoutSQL = 'update member set token = ? where id = ?'
            db.query(logoutSQL, ['', decode.id], (err, result) => {
                if(err){
                    throw err
                }
                console.log('로그아웃 성공')
                res.clearCookie('user_token')
                res.json({
                    loginSuccess : false
                })
                
            })
        }
        

        close();
    })
})

//페이지 이동마다 사용자의 권한값을 가져오는 미들웨어
app.get('/api/member/auth', (req, res) => {
    //유저 브라우저에 쿠키로 저장했던 토큰 가져오기 
    
    //쿠키에 토큰이 없는경우 로그인 안한 false를 준다.
    let token = req.cookies.user_token
    if(token === undefined){
        res.json({
            loginSuccess : false
        })
    //토큰이 있는경우
    }else{
        const decode = jwt.verify(token, secretObj.secretKey);
        connect();
        //id 값과 token의 값이 있으면 
        const findTokenSQL = 'select * from member where id = ? and token = ?';
        db.query(findTokenSQL, [decode.id, token], (err, results) => {
            if(err){
                throw err;
            }
            if(!results){
                return res.json({
                    loginSuccess : false,
                    error : true
                })
            }
            else{
                res.json({
                     id : results.id,
                     name : results.name,
                     nickname : results.nickname,
                     loginSuccess : true,
                     profile : results.profile
                })
             }

        })

    }    
    
   
})

app.get('/api/post/all', (req, res, next) => {
    connect();

    var list;

    const postlistSQL = 'select * from post'
    db.query(postlistSQL, (err, results, fields) => {
        if(err){
            throw err
        }
        list = results;
        res.json({
            list : list
        })
        close();
    })
})


app.get('/api/post/homepost', (req, res) => {
    connect();
    var list;
    
    const homepostSQL = 'select * from homepost'
    db.query(homepostSQL, (err, results, fields) => {
        if(err){
            throw err
        }
        list = results;
        res.json({
            list : list
        })
        close();
    })
}) 

app.post('/api/post/homedetail', (req, res) => {
    connect();

    const postid = req.body.postid;

    const homedetail = 'select * from homepost where id = ?'
    db.query(homedetail, [postid], (err, results, field) => {
        if(err){
            throw err
        }
        
        res.json({
            list : results[0]
        })
        close();
    } )
})


app.post('/api/home/reviews', (req, res) => {
    const postid = req.body.postid
    let list;

    connect();
    const findReviews = 'select * from homereviews where postid = ?';
    db.query(findReviews, [postid], (err, results, field) => {
        if(err){
            throw err
        }
        list = results
        
        for(i= 0 ; i < list.length ; i = i + 1){
            var bitMap = fs.readFileSync(`./public/images/users/${list[i].profile}`)
            var profilebuffer = new Buffer.from(bitMap, "base64");
            list[i].profile = profilebuffer    
        }
        //console.log(list)
        res.json({
            list : list
        })
                
    })
    close();
})

app.post('/api/home/comment', (req, res) => {
    const postid = Number(req.body.postid)
    const nickname = req.body.nickname
    const title = req.body.title
    const content = req.body.content


    connect();
    const findProfile = 'select profile from member where nickname = ?'
    const result = db.query(findProfile, [nickname], (err, result, field) => {
        if(err){
            throw err
        }
        const profile = result[0].profile
        const insertReview = 'insert into homereviews (postid, nickname, profile, title, content) values(?,?,?,?,?)'
        db.query(insertReview, [postid, nickname, profile, title,content], (err, result, field) => {
            if(err){
                throw err
            }

            close();
            res.json({
                Success : true
            })
        })

    })


   
})


app.post('/api/community/upload',  uploadBoard.single('image'), (req, res) => {
    //넘어온 값들을 변수로 받는다.
    const title = req.body.title
    const writer = req.body.writer
    const description = req.body.text

    currentDay();
    const reportingdate = year+'-'+month+'-'+day;

    let imageurl;
    if(req.file){
        imageurl = req.file.filename;
    }else{
        imageurl = ''
    }
    
    connect()
    //회원 프로필 이미지 가져오기
    const getProfile = 'select profile from member where nickname = ?'
    db.query(getProfile, [writer], (err, result, field) => {
        if(err){
            throw err
        }
        const profile = result[0].profile;

        const insertBoard = 'insert into post(title, writer, description, reportingdate, profile, img)'
         + 'values(?,?,?,?,?,?)';
        db.query(insertBoard, [title, writer, description, reportingdate, profile, imageurl], (err, results)=> {
            if(err){
                throw err;
            }
            if(results.affectedRows === 1){
                res.json({ uploadSuccess : true})
                console.log('업로드 완료')
            }else{
                res.json({ registerSuccess : false})
                console.log('업로드 실패')
            }
            close();
        })
    }) 
    
})

app.post('/api/community/detail', (req, res) => {
    console.log(req.body)
    const postid = req.body.postid
    let list;
    connect()

    //글 자세한 정보 가져오기
    const findBoard = 'select * from post where postid = ?';
    db.query(findBoard, [postid], (err, results) => {
        if(err){
            throw err
        }

        list = results
        const bitMapProfile = fs.readFileSync(`./public/images/users/${list[0].profile}`);
        const bitMapImg = fs.readFileSync(`./public/images/board/${list[0].img}`);
        const profileBuffer = new Buffer.from(bitMapProfile, "base64");
        const imgBuffer = new Buffer.from(bitMapImg, "base64");

        list[0].profile = profileBuffer;
        list[0].img = imgBuffer;

        //가져온 글의 댓글 가져오기
        const findComments = 'select * from comments where postid = ?'
        db.query(findComments, [postid], (err, results) => {
            if(err){
                throw err
            }   
            commentList = results
            
            for(i= 0 ; i < commentList.length ; i = i + 1){
                 var bitMap = fs.readFileSync(`./public/images/users/${commentList[i].profile}`)
                 var profilebuffer = new Buffer.from(bitMap, "base64");
                 commentList[i].profile = profilebuffer    
            }


            console.log(commentList);

            res.json({
                list : list,
                commentList : commentList
            })
        
        })

       
      close();  
    })
})

app.post('/api/community/uploadcomment', (req, res) => {
    const postid = req.body.postid;
    const comment = req.body.comment;
    const nickname = req.body.nickname;

    const findProfile = 'select profile from member where nickname = ?';
    connect();
    db.query(findProfile, [nickname], (err, result) => {
        if(err){
            throw err
        }
        const profile = result[0].profile;
        const insertComment = 'insert into comments(postid, nickname, comment, profile) '+
        'values(?,?,?,?)'
        db.query(insertComment, [postid, nickname, comment, profile], (err, results) => {
            if(err){
                throw err
            }

            res.json({
                uploadSuccess : true
            })
        })
    })
    
})


app.get('/', (req, res) => {
    res.send('연결완료');
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번 포트에서 연결중 ');
})