const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const multer = require('multer');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const secretObj = require('./config/jwt');
const fs = require('fs'); //파일 접근 라이브러리
const path = require('path')


const app = express();

//에러가 발생한 경우 처리
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message)
});

//데이터베이스 연결을 위한 함수를 생성 
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
var db;
function connect() {
    db = mysql.createConnection({
        host: conf.host,
        user: conf.user,
        password: conf.password,
        database: conf.database
    })
    db.connect((err) => {
        if (err) {
            console.log('mysql 연결 오류!');
            console.log(err);
            throw err;
        } else {
            console.log('mysql 연결 성공!')
        }
    })
}
//데이터베이스 연결 해제 함수를 생성
function close() {
    console.log('mysql 연결 해제!');
    db.end();
}

app.set('port', process.env.PORT || conf.port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser());

//정적 파일(프로필, 이미지등)이 저장될 디렉토리 설정
app.use(express.static('public'));
if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
}

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
        destination(req, file, done) {
            //업로드할 디렉토리를 설정
            if (!fs.existsSync('public/images/users')) {
                fs.mkdirSync('public/images/users')
            }
            done(null, 'public/images/users/');
        },
        filename(req, file, done) {
            //파일 이름을 결정
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    //파일의 최대 크기를 설정
    limits: { fileSize: 10 * 500 * 500 },
});

const uploadBoard = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            //업로드할 디렉토리를 설정
            if (!fs.existsSync('public/images/board')) {
                fs.mkdirSync('public/images/board')
            }
            done(null, 'public/images/board/');
        },
        filename(req, file, done) {
            //파일 이름을 결정
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    //파일의 최대 크기를 설정
    limits: { fileSize: 10 * 1024 * 1024 },
});
//현재시간을 문자열로 리턴하는 함수
function currentDay() {
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

app.post('/api/register/idcheck', (req, res) => {
    const id = req.body.id;
    connect();
    const iDDuplicateCheck = 'select * from user where id = ?';
    db.query(iDDuplicateCheck, [id], (err, result) => {
        if (err) {
            throw err
        }
        //중복되지 않은 경우 
        if (result[0] === undefined) {
            res.json({
                idCheck: true
            })
        } else {
            res.json({
                idCheck: false
            })
        }

    })
    close();
})


//닉네임 중복체크
app.post('/api/register/nicknamecheck', (req, res) => {
    const nickname = req.body.nickname;
    connect();
    const NicknameDuplicateCheck = 'select * from user where nickname = ?';
    db.query(NicknameDuplicateCheck, [nickname], (err, result) => {
        if (err) {
            throw err
        }
        //중복되지 않은 경우 
        if (result[0] === undefined) {
            res.json({
                nicknameCheck: true
            })
        } else {
            res.json({
                nicknameCheck: false
            })
        }
    })
    close();
})

//회원가입을 위한 서버
app.post('/api/user/register', uploadprofile.single('profile'), (req, res) => {
    //넘어온 값들을 변수로 받는다.
    const id = req.body.id
    const name = req.body.name
    const password = req.body.password
    const nickname = req.body.nickname
    let profileurl;
    if (req.file) {
        profileurl = req.file.filename;
    } else {
        profileurl = 'default.png';
    }
    //salt로 사용할 값을 만들기위해 현재날짜와 랜덤값으로 무작위변수 생성 
    const salt = Math.round(new Date().valueOf() * Math.random()) + "";
    //알고리즘음 sha512 사용 password를 salt와 합쳐서 해쉬패스워드 생성
    const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');
    connect()
    //salt 값을 저장해서 로그인할 때 그 솔트값을 이용
    const registerSQL = 'insert into user(id, name, pw, nickname, profile, salt) values(?,?,?,?,?,?)';
    db.query(registerSQL, [id, name, hashPassword, nickname, profileurl, salt], (err, results, field) => {
        if (err) {
            throw err;
        }
        if (results.affectedRows === 1) {
            res.json({ Success: true })
            console.log('회원가입 완료')
        } else {
            res.json({ Success: false })
            console.log('회원가입 실패')
        }
        close();
    });
});

//로그인을 위한 서버
app.post('/api/user/login', (req, res) => {
    const id = req.body.id
    const password = req.body.password

    connect();

    const findUser = 'select * from user where id = ?'
    db.query(findUser, [id], (err, results) => {
        if (err) {
            throw err
        } else {
            if (results[0] == undefined) {
                res.json({
                    idCheck: false
                })
            } else {
                const dbPassword = results[0].pw
                //이메일을 가진 멤머의 salt 값을 가져와서 
                const salt = results[0].salt
                //입력된 비밀번호를 같은 salt로 해쉬비밀번호를 만들어서 
                const hashPassword = crypto.createHash("sha512").update(password + salt).digest('hex');
                if (hashPassword === dbPassword) {
                    //토큰을 생성
                    const token = jwt.sign({
                        id: id
                    }, secretObj.secretKey, { //토큰만들때 사용할 비밀키 
                        expiresIn: '60m' //토큰 유효시간 60분
                    })
                    //생성한 토큰을 넣어준다.
                    const updateToken = 'update user set token = ? where id = ?'
                    db.query(updateToken, [token, id], (err) => {
                        if (err) {
                            throw err
                        }
                    })

                    var date = new Date();
                    var minutes = 60;
                    date.setTime(date.getTime() + minutes * 60 * 1000)
                    res.cookie("user_token", token,
                        {
                            //쿠키의 시간 설정(밀리초단위)
                            expires: date,
                            httpOnly: true
                        })
                    var profile = results[0].profile;
                    if (results[0].profile !== 'default.png') {
                        const bitMap = fs.readFileSync(`./public/images/users/${results[0].profile}`)
                        profile = new Buffer.from(bitMap, "base64");
                    }
                    res.json({
                        loginSuccess: true,
                        nickname: results[0].nickname,
                        profile: profile,
                        id: id
                    })
                    console.log('접속완료')
                } else {
                    res.json({
                        passwordCheck: false
                    })
                }
            }
        }
        close();
    })
})

app.get('/api/user/logout', (req, res) => {

    //유저 브라우저에 쿠키로 저장했던 토큰 가져오기 
    let token = req.cookies.user_token
    //console.log(req.cookies);
    //토큰 값 복호화
    const decode = jwt.verify(token, secretObj.secretKey);
    connect();
    //id 값과 token의 값이 있으면 
    const findTokenSQL = 'select * from user where id = ? and token = ?';
    db.query(findTokenSQL, [decode.id, token], (err, results) => {
        if (err) {
            throw err;
        }
        if (!results) {
            res.json({
                loginSuccess: false,
                error: true
            })
        } else {
            const logoutSQL = 'update user set token = ? where id = ?'
            db.query(logoutSQL, ['', decode.id], (err, result) => {
                if (err) {
                    throw err
                }
                console.log('로그아웃 성공')
                res.clearCookie('user_token')
                res.json({
                    loginSuccess: false
                })

            })
        }


        close();
    })
})

//페이지 이동마다 사용자의 권한값을 가져오는 미들웨어
app.get('/api/user/auth', (req, res) => {
    //유저 브라우저에 쿠키로 저장했던 토큰 가져오기 
    //쿠키에 토큰이 없는경우 로그인 안한 false를 준다.
    let token = req.cookies.user_token

    if (token === undefined) {
        res.json({
            loginSuccess: false
        })
        //토큰이 있는경우
    } else {
        const decode = jwt.verify(token, secretObj.secretKey);
        connect();
        //id 값과 token의 값이 있으면 
        const findToken = 'select * from user where id = ? and token = ?';
        db.query(findToken, [decode.id, token], (err, results) => {
            if (err) {
                throw err;
            }
            if (!results) {
                return res.json({
                    loginSuccess: false,
                    error: true
                })
            } else {
                res.json({
                    loginSuccess: true
                })
            }
        })
    }
})

app.get('/api/community/all', (req, res, next) => {
    connect();

    var list;

    const communityAll = 'select * from community order by regdate desc'
    db.query(communityAll, (err, results) => {
        if (err) {
            throw err
        }
        list = results;
        res.json({
            list: list
        })
    })
    close();

})

app.get('/api/home/all', (req, res, next) => {
    connect();

    var list;

    const homeAll = 'select * from home'
    db.query(homeAll, (err, results, fields) => {
        if (err) {
            throw err
        }
        list = results;
        res.json({
            list: list
        })
    })
    close();

})



app.post('/api/home/detail', (req, res) => {
    connect();

    const home_id = req.body.home_id;

    const homedetail = 'select * from home where home_id = ?'
    db.query(homedetail, [home_id], (err, results, field) => {
        if (err) {
            throw err
        }

        res.json({
            list: results[0]
        })
        close();
    })
})


app.post('/api/home/getcomment', (req, res) => {
    const home_id = req.body.home_id
    let list;

    connect();
    const findComments = 'select A.homecomment_id, A.home_id, A.user_nickname, A.title, A.content, B.profile ' +
        'from home_comment A inner join user B on home_id = ? and A.user_nickname = B.nickname ;';
    db.query(findComments, [home_id], (err, results) => {
        if (err) {
            throw err
        }
        list = results

        for (i = 0; i < list.length; i = i + 1) {
            if (list[i].profile !== 'default.png') {
                var bitMap = fs.readFileSync(`./public/images/users/${list[i].profile}`)
                var profilebuffer = new Buffer.from(bitMap, "base64");
                list[i].profile = profilebuffer
            }
        }
        res.json({
            list: list
        })

    })
    close();
})

app.post('/api/home/uploadcomment', (req, res) => {
    const home_id = Number(req.body.home_id)
    const user_nickname = req.body.nickname
    const title = req.body.title
    const content = req.body.content
    currentDay();
    const regdate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

    connect();
    const insertReview = 'insert into home_comment (home_id, user_nickname, title, content, regdate) values(?,?,?,?,?)'
    db.query(insertReview, [home_id, user_nickname, title, content, regdate], (err, result, field) => {
        if (err) {
            throw err
        }
        close();
        res.json({
            Success: true
        })


    })



})


app.post('/api/community/upload', uploadBoard.single('image'), (req, res) => {
    //console.log(req.body)
    //넘어온 값들을 변수로 받는다.
    const title = req.body.title
    const writer = req.body.writer
    const description = req.body.text

    currentDay();
    const regdate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

    let image;
    if (req.file) {
        image = req.file.filename;
    } else {
        image = '';
    }

    connect()
    const insertBoard = 'insert into community(title, writer, description, regdate, image)'
        + 'values(?,?,?,?,?)';
    db.query(insertBoard, [title, writer, description, regdate, image], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.affectedRows === 1) {
            res.json({ Success: true })
            console.log('업로드 완료')
        } else {
            res.json({ Success: false })
            console.log('업로드 실패')
        }
        close();
    })


})

app.post('/api/community/detail', (req, res) => {
    const board_id = req.body.board_id
    let list;
    connect();
    //글 자세한 정보 가져오기
    const findBoard = 'select board_id, title, writer, description ,image , A.regdate , likecnt, profile ' +
        'from community A join user B on board_id = ? and A.writer = B.nickname;';
    db.query(findBoard, [board_id], (err, results) => {
        if (err) {
            throw err
        }

        let bitMapimage;
        let imageBuffer;
        list = results
        //게시물에 image가 있는 경우
        if (list[0].image !== '') {
            bitMapimage = fs.readFileSync(`./public/images/board/${list[0].image}`);
            imageBuffer = new Buffer.from(bitMapimage, "base64");
            list[0].image = imageBuffer;
        }

        if (list[0].profile !== 'default.png') {
            const bitMapProfile = fs.readFileSync(`./public/images/users/${list[0].profile}`);
            const profileBuffer = new Buffer.from(bitMapProfile, "base64");
            list[0].profile = profileBuffer;
        }
    })

    //가져온 글의 댓글 가져오기
    const findComments = 'select comment_id , board_id, A.nickname, comment, profile ' +
        'from community_comment A join user B on board_id = ? and A.nickname = B.nickname ';
    db.query(findComments, [board_id], (err, results) => {
        if (err) {
            throw err
        }
        commentList = results

        for (i = 0; i < commentList.length; i = i + 1) {
            if (commentList[i].profile === 'default.png') {
                continue;
            }
            var bitMap = fs.readFileSync(`./public/images/users/${commentList[i].profile}`)
            var profilebuffer = new Buffer.from(bitMap, "base64");
            commentList[i].profile = profilebuffer
        }
        res.json({
            list: list,
            commentList: commentList
        })
    })
    close();
})

app.post('/api/community/uploadcomment', (req, res) => {
    const board_id = Number(req.body.board_id);
    const comment = req.body.comment;
    const nickname = req.body.nickname;

    connect();
    const insertComment = 'insert into community_comment(board_id, nickname, comment) values(?,?,?)'
    db.query(insertComment, [board_id, nickname, comment], (err, results) => {
        if (err) {
            throw err
        }
        res.json({
            Success: true
        })
    })
})

app.post('/api/community/update', uploadBoard.single('image'), (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const board_id = Number(req.body.board_id);

    //파일이 변경된 경우
    if (req.file) {
        connect();
        //원래 서버에 저장된 파일을 찾기
        const findImage = 'select image from community where board_id = ? '
        db.query(findImage, [board_id], (err, result) => {
            if (err) {
                throw err
            }
            //원래 저장되어있던 파일
            const originalImage = result[0].image
            //새로저장할 파일 파일이름
            const newImage = req.file.filename;

            const updateCommunity = 'update community set title = ?, description = ?, image = ?' +
                'where board_id = ?';
            db.query(updateCommunity, [title, description, newImage, board_id], (err, result) => {
                if (err) {
                    throw err
                }
                if (result.affectedRows === 1) {
                    //원래 파일이 있었던 경우
                    if (originalImage !== '') {
                        //원래 파일 삭제
                        fs.unlink(`public/images/board/${originalImage}`, (err) => {
                            if (err) {
                                throw (err)
                            }
                        })
                    }
                    res.json({ Success: true })
                    console.log('게시글 수정 완료')

                } else {
                    res.json({ Success: false })
                    console.log('게시글 수정 실패')
                }
                close();
            })
        })

        //이미지를 변경하지 않은경우
    } else {
        connect();
        const updateCommunity = 'update community set title =? , description = ? ' +
            'where board_id = ?'
        db.query(updateCommunity, [title, description, board_id], (err, result) => {
            if (err) {
                throw err
            }

            if (result.affectedRows === 1) {
                res.json({ Success: true })

                console.log('게시글 수정 완료')
            } else {
                res.json({ Success: false })
                console.log('게시글 수정 실패')
            }
            close();
        })
    }
})

app.post('/api/community/delete', (req, res) => {
    const board_id = req.body.board_id
    connect();

    const findImage = 'select image from Community where board_id = ?'
    db.query(findImage, [board_id], (err, result) => {
        if (err) {
            throw err
        }
        const originalImage = result[0].image

        const deleteCommunity = 'delete from community where board_id = ?'
        db.query(deleteCommunity, [board_id], (err, result) => {
            if (err) {
                throw err
            }
            if (result.affectedRows === 1) {
                //원래 파일 삭제
                if (originalImage !== '') {
                    fs.unlink(`public/images/board/${originalImage}`, (err) => {
                        if (err) {
                            throw (err)
                        }
                    })
                }
                res.json({ Success: true })
                console.log('게시글 수정 완료')

            } else {
                res.json({ Success: false })
                console.log('게시글 수정 실패')
            }
            close();
        })
    })
})

app.post('/api/community/like', (req, res) => {
    const board_id = req.body.board_id;
    connect();
    //해당 게시글을 좋아요누른 정보들을 가져오기
    const getLike = 'select board_id , user_nickname, profile ' +
        ' from community_like A join user B on A.user_nickname = B.nickname and board_id = ?;'
    db.query(getLike, [board_id], (err, results) => {
        if (err) {
            throw err
        }
        const list = results;
        //좋아요를 누른 사람이 4보다 클경우 프로필 최대 4개만 가져오기
        if (list.length >= 4) {
            for (i = 0; i < 4; i = i + 1) {
                if (list[i].profile === 'default.png') {
                    continue;
                }
                var bitMap = fs.readFileSync(`./public/images/users/${list[i].profile}`)
                var profilebuffer = new Buffer.from(bitMap, "base64");
                list[i].profile = profilebuffer
            }
            //좋아요 4미만일 경우 
        } else {
            for (i = 0; i < list.length; i = i + 1) {
                if (list[i].profile === 'default.png') {
                    continue;
                }
                var bitMap = fs.readFileSync(`./public/images/users/${list[i].profile}`)
                var profilebuffer = new Buffer.from(bitMap, "base64");
                list[i].profile = profilebuffer
            }
        }
        res.json({
            list: list
        })
    })
    close();
})

app.post('/api/community/likeupdate', (req, res) => {
    console.log(req.body);
    const likeCheck = req.body.likeCheck
    const user_nickname = req.body.nickname;
    const board_id = req.body.board_id
    //좋아요를 취소한 경우
    if (likeCheck === true) {
        connect();
        const unlike = 'delete from community_like where board_id = ? and user_nickname = ?';
        db.query(unlike, [board_id, user_nickname], (err) => {
            if (err) {
                throw err
            }
        })
        const findLike = 'select likecnt from community where board_id = ?'
        db.query(findLike, [board_id], (err, result) => {
            if (err) {
                throw err
            }
            const currentLikecnt = result[0].likecnt - 1;

            const decreaseLike = 'update community set likecnt = ? where board_id = ?'
            db.query(decreaseLike, [currentLikecnt, board_id], (err) => {
                if (err) {
                    throw err;
                }
            })
            close();
        })
        console.log('좋아요 취소')
        //좋아요를 누른 경우
    } else {
        connect()
        const like = 'insert into community_like (board_id, user_nickname) ' +
            'values(?,?)';
        db.query(like, [board_id, user_nickname], (err) => {
            if (err) {
                throw err
            }
        })

        const findLike = 'select likecnt from community where board_id = ?'
        db.query(findLike, [board_id], (err, result) => {
            if (err) {
                throw err
            }
            const currentLikecnt = result[0].likecnt + 1;
            const decreaseLike = 'update community set likecnt = ? where board_id = ?'
            db.query(decreaseLike, [currentLikecnt, board_id], (err) => {
                if (err) {
                    throw err;
                }
            })
            close();
        })
        console.log('좋아요 누름')
    }
})

app.post('/api/community/search', (req, res) => {
    const searchword = '%' + req.body.searchword + '%';
    let list;

    connect();
    const searchtitle = 'select * from community where title like ? order by regdate desc'
    db.query(searchtitle, [searchword], (err, results) => {
        if (err) {
            throw err
        }
        list = results
        res.json({
            list: list
        })
        close();
    })
})

app.get('/', (req, res) => {
    res.send('연결완료');
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 연결중 ');
})