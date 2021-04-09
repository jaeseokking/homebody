//정규식을 사용할 컴포넌트 
export function IDValid(Value) {
    // ^문자열이 시작하는 부분/ 적어도 하나의 문자가 있는지/ 
    //영어와 숫자 조합만가능/ 5~15글자 가능/ $문자가 끝났음을 의미 
    var regExp = /^[a-zA-Z0-9]{5,15}$/;
    return regExp.test(Value); // 형식에 맞는 경우 true 리턴
}

export function PWValid(Value) {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,15}$/; //  4 ~ 15자 영문, 숫자 조합
    return regExp.test(Value);
}


export function NameValid(Value) {
    var regExp =  /^[a-zA-Z가-힣]{2,10}$/
    return regExp.test(Value);
}

export function NickNameValid(Value) {
    var regExp =  /^[a-zA-Z가-힣0-9]{2,10}$/
    return regExp.test(Value);
}