//토큰을 생성하기 위한 secret키를 생성하기위해서 작성
//비밀키는 외부에 노출되면 안되므로 따로 저장해서 노출을 방지한다.
let jwtObj = {}
jwtObj.secretKey = 'secretjaeseokkey';
module.exports = jwtObj;