# 기본구조
* 클라이언트 : Reactjs

* 서버 : nodejs with express

* 데이터베이스 : MySQL

## client 설정
* 기본 노드모듈 설치

    - npm install

* 구동

    - npm run start

## server 설정

* 기본 노드모듈 설치

    - npm install

* 구동

    - nodemon index.js

### 토큰에 저장할 secretkey 생성

1. server 디렉토리에 config 디렉토리 생성

2. config 디렉토리에 jwt.js 생성

3. jwt.js에 사용할 secretkey 생성

ex)

    let jwtObj = {}

    jwtObj.secretKey = '시크릿 키가 사용될 부분';

    module.exports = jwtObj;


### 데이터베이스 정보

1. server 디렉토리에 데이터 베이스를 연결할 정보를 저장할 database.json 생성

2. database.json 파일에  JSON 형태의 database 정보 기입

ex)

    {

    "host"    : "호스트",

    "user"    : "사용자",

    "password": "비밀번호",

    "database": "데이터베이스이름",

    "port"    : "포트번호"

    }

