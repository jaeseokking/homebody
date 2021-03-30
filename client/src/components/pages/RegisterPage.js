import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../actions/user_action';
import { withRouter } from 'react-router-dom';

export function RegisterPage(props){
//dispatch는 Reducer에 action을 알리기 위한 함수
const dispatch = useDispatch()
const [id, setID] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState('');
const [nickname, setNickName] = useState('');
const [profile, setProfile] = useState();



const onIDHandler = (event) => {
    setID(event.target.value);
}

const onPasswordHandler = (event) => {
    setPassword(event.target.value);
}

const onNameHandler = (event) => {
    setName(event.target.value);
}

const onNickNameHandler = (event) => {
    setNickName(event.target.value);
}

const onProfileHandler = (event) => {
    console.log(event.target.files[0])
    if(event.target.files[0]  !== undefined){
        setProfile(event.target.files[0])
    }
    
}


const onSubmitHandler = (event) => {
    event.preventDefault(); //refresh 방지 (다음 일을 수행하기 위해서)

    //파일이 있는 경우 formData로 넘겨야함
    //action으로 넘겨줄 데이터
    const formData = new FormData(); 
    formData.append('id' , id);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('nickname', nickname);
    formData.append('profile', profile)
 
    //action을 사용할 함수
    dispatch(userRegister(formData)).then(response => {
        if(response.payload.registerSuccess){
            alert('회원가입 성공')
            props.history.push('/login');
        }else{
            alert('회원가입 실패')
        }
    })
}

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <form style={{display:'flex', flexDirection:'column'}} encType="multipart/form-data" onSubmit={onSubmitHandler}>
                <label>ID</label>  
                <input type="text" placeholder={'아이디 입력'} onChange={onIDHandler} />
                <label>Password</label>
                <input type="password" placeholder={'비밀번호 입력'} onChange={onPasswordHandler} />
                <label>Name</label>  
                <input type="text" placeholder={'이름 입력'} onChange={onNameHandler} />
                <label>NickName</label>  
                <input type="text" placeholder={'닉네임 입력'} onChange={onNickNameHandler} />
                <label>Profile</label>  
                <input type="file" accept="image/*" onChange={onProfileHandler}/>
                <button onClick={onSubmitHandler}>회원가입</button>
            </form> 
        </div>
        </div>
    )
}

export default withRouter(RegisterPage);