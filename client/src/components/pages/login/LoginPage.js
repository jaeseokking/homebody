import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function LoginPage(props){
    //dispatch는 Reducer에 action을 알리기 위한 함수
    const dispatch = useDispatch()
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');

    const onIDHandler = (event) => {
        setID(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //refresh 방지 (다음 일을 수행하기 위해서)
        //action으로 넘겨줄 데이터
        let body = {
            id : id,
            password : password
        }
        //action을 사용할 함수
        dispatch(userLogin(body)).then(response => {
            //console.log(response.payload)
            if(response.payload.loginSuccess){
                alert('로그인 성공');
                props.history.push('/')
        
            }else if(response.payload.idCheck === false){
                alert('아이디를 다시 확인해주세요.')
            }else if(response.payload.passwordCheck === false){
                alert('비밀번호를 다시 확인해주세요.')
            }else{
                alert('로그인 실패')
            }
        })
    }

    return(
        <div className="loginform">
            <LoginDesign>
            <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
            <div className="container">
                <div className="card login-card">
                    <div className="row no-gutters">
                    <div className="col-md-5">
                        <img src="/loginimage.jpg" alt="login" className="login-card-img"/>
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                        <div className="brand-wrapper">
                            <img src="/logo.png" width="150px" alt="logo" className="logo"/>
                        </div>
                        <p className="login-card-description">Sign up</p>
                        <form action="#!">
                            <div className="form-group">
                                <label htmlFor="ID" className="sr-only">ID</label>
                                <input type="text" name="ID" id="ID" className="form-control" 
                                onChange={onIDHandler} placeholder="ID" defaultValue={id}/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input type="password" name="password" id="password" className="form-control" 
                                onChange={onPasswordHandler} placeholder="***********" defaultValue={password}/>
                            </div>
                            <button name="login" id="login" className="btn btn-block login-btn mb-4" 
                            onClick={onSubmitHandler}>Login</button>
                            <Link to='/register' className="Link"><input name="register" id="register" 
                            className="btn btn-block register-btn mb-4" defaultValue="Register"/></Link>
                        </form>
                            {/* <a href="#!" className="forgot-password-link">Forgot password?</a>
                            <p className="login-card-footer-text">Don't have an account? <a href="#!" className="text-reset">Register here</a></p>
                            <nav className="login-card-footer-nav">
                            </nav> */}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </main>
            </LoginDesign>
        </div>
    )
}


const LoginDesign = styled.header`
    font-family: Noto Sans CJK KR;

    .loginform {
        background : var(--BGGrey);
    }

    .brand-wrapper {
        margin-bottom: 19px; 
    }
    
 
  
    .login-card {
        border: 0;
        border-radius: 10px;
        box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
        overflow: hidden; 
    }

   .login-card-img {
      border-radius: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover; 
    }

    .login-card .card-body {
      padding: 85px 60px 60px; 
    }
    
    @media (max-width: 422px) {
        .login-card .card-body {
          padding: 35px 24px; } }
    .login-card-description {
      font-size: 25px;
      color: #000;
      font-weight: normal;
      margin-bottom: 23px; }

    .login-card form {
      max-width: 326px; }

    .login-card .form-control {
      border: 1px solid #d5dae2;
      padding: 15px 25px;
      margin-bottom: 20px;
      min-height: 45px;
      font-size: 15px;
      line-height: 15;
      font-weight: normal; 
    }
      .login-card .form-control::-webkit-input-placeholder {
        color: #919aa3; 
    }
    
      .login-card .form-control::-moz-placeholder {
        color: #919aa3; }
      .login-card .form-control:-ms-input-placeholder {
        color: #919aa3; }
      .login-card .form-control::-ms-input-placeholder {
        color: #919aa3; }
      .login-card .form-control::placeholder {
        color: #919aa3; }

    .login-card .login-btn  {
      padding: 13px 20px 12px;
      background-color: var(--BGGrey);
      border-radius: 4px;
      font-size: 17px;
      font-weight: bold;
      line-height: 20px;
      color: #fff;
      margin-bottom: 24px; }

    .login-card .register-btn {
      padding: 13px 20px 12px;
      background-color: var(--BGGrey);
      border-radius: 4px;
      font-size: 17px;
      font-weight: bold;
      line-height: 20px;
      color: #fff;
      margin-bottom: 24px; 
    }
    
    .login-card .Link {
        text-decoration: none
    }

    .login-card .login-btn:hover {
        border: 1px solid var(--FontGrey);
        background-color: transparent;
        color: var(--FontGrey); }

    .login-card .register-btn:hover {
      border: 1px solid var(--FontGrey);
      background-color: transparent;
      color: var(--FontGrey); }

    .login-card .forgot-password-link {
      font-size: 14px;
      color: #919aa3;
      margin-bottom: 12px; }
    .login-card-footer-text {
      font-size: 16px;
      color: #0d2366;
      margin-bottom: 60px; }
      @media (max-width: 767px) {
        .login-card-footer-text {
          margin-bottom: 24px; } }
    .login-card-footer-nav a {
      font-size: 14px;
      color: #919aa3; }
`


export default withRouter(LoginPage)