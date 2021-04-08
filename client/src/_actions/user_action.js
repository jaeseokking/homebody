import Axios from 'axios';
export function userLogin(submitData){
    //url주소에 매개변수로 받은 submitData 보내서 서버에서 받은 결과값을 변수에 저장 
    const result = Axios.post('/api/user/login', submitData)
    
    //전해받고 처리할 내용
    .then(response => response.data)

    //reducer에 갈 action 데이터
    return {
        type : 'USER_LOGIN',
        payload : result
    }

}

export function userRegister(registerInfo){

    const result = Axios.post('/api/user/register', registerInfo)
    .then(response => response.data)   

    return{
        type : 'USER_REGISTER',
        payload : result
    } 
}

export function userLogout(){

    const result = Axios.get('/api/user/logout')
    .then(response => response.data)

    return {
        type : 'USER_LOGIN',
        payload : result
    }

}

export function userAuth(){

    const result = Axios.get('/api/user/auth')
    .then(response => response.data)

    return {
        type : 'USER_AUTH',
        payload : result
    }
}

export function userProfile(profile){

    const result = Axios.post('/api/user/profile', profile)
    .then(response => response.data)

    return {
        type : 'USER_PROFILE',
        payload : result
    }
}