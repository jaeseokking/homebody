import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Resizer from 'react-image-file-resizer';
import {Container, Col, Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from 'reactstrap';
import styled from 'styled-components';
import { IDValid, PWValid, NameValid } from './Validation';
import axios from 'axios';

export function RegisterPage(props){
    //dispatch는 Reducer에 action을 알리기 위한 함수
    const dispatch = useDispatch()
    const [id, setID] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [name, setName] = useState();
    const [nickname, setNickName] = useState();
    const [profile, setProfile] = useState(null);
    const [preview, setPreview] = useState();

    

  

    const onIDHandler = (event) => {
        setID(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onPasswordCheckHandler = (event) => {
        setPasswordCheck(event.target.value);
    }

    const onNameHandler = (event) => {
        setName(event.target.value);
    }

    const onNickNameHandler = (event) => {
        setNickName(event.target.value);
    }


    var [idValid , setIDValid] = useState(false);
    var [passwordValid, setPasswordValid] = useState(false);
    var [passwordCheckValid, setPasswordCheckValid] = useState(false);    
    var [nameValid, setNameValid] = useState(false);
    var [nicknameValid, setNicknameValid] = useState(false);

    const [idMessege , setIDMessage] = useState("ㅤ");
    const [nameMessage , setNameMessage] = useState("ㅤ");
    const [passwordMessage, setPasswordMessage] = useState("ㅤ");
    const [nicknameMessage, setNicknameMessage] = useState("ㅤ");

    //아이디 유효성 검사
    useEffect(() => {
        //id를 적은 경우
        if(id !== ''){
            if(IDValid(id)){
                setIDValid('');
                //중복검사 하기전 메시지 없음
                setIDMessage('ㅤ')
            }else if (!IDValid(id)){
                setIDValid(false)
                setIDMessage('사용불가')
            }
        //아이디를 입력하지 않은 경우 
        }else{
            setIDValid(false)
            setIDMessage('아이디는 필수입력입니다.')
        }
    },[id])
    
    //포커스아웃 되면 자동적으로 실행될 함수 
    const onIDDuplicateCheck = (event) => {
        event.preventDefault(); //refresh 방지 (다음 일을 수행하기 위해서)
        
        //유효성 검사를 통과한 경우
        if(idValid !== false && id !== undefined){
            const body = {
                id : id 
            }
            Axios.post('/api/register/idcheck', body ).then(response=> {
                
                //유효성검사와 중복검사 모두 통과할 경우 
                if(response.data.idCheck === true){
                    setIDValid(true);
                    setIDMessage('사용가능한 아이디');
                }else{
                    setIDMessage('아이디가 중복됩니다.');
                }
            
               
            })
        }
        
        
    }

    //비밀번호 유효성 검사
    useEffect(() => {
        //password를 적은 경우
        console.log(password);
        if(password !== ''){
            if(PWValid(password)){
                setPasswordValid(true)
                setPasswordMessage('ㅤ')
                if(password === passwordCheck){
                    setPasswordCheckValid(true)
                    setPasswordMessage('비밀번호 확인완료')
                }else if(password !== passwordCheck && passwordCheck !== ''){
                    setPasswordValid(false)
                    setPasswordMessage('비밀번호가 일치하지 않습니다.')
                }

            }else if(!PWValid(password) && password !== undefined){
                setPasswordValid(false)
                setPasswordMessage('영문 숫자 조합 4~15 글자가능')
            }
        
        }else if(password === ''){
            setPasswordValid(false)
            setPasswordMessage('비밀번호는 필수입력입니다.')
        }

    },[password, passwordCheck])
    
    //이름 유효성 검사
    useEffect(() => {
         //이름을 적은 경우
         if(name !== '' && name !== undefined){
            if(NameValid(name)){
                setNameValid(true);
                setNameMessage('사용가능한 이름')
            }else if (!NameValid(name)){
                setNameValid(false)
                setNameMessage('한글과 영문 대 소문자를 사용가능.(특수기호, 공백 사용불가)')
            }
        //아이디를 입력하지 않은 경우 
        }else if(name !== undefined){
            setNameValid(false)
            setNameMessage('이름은 필수입력입니다.')
        }
        
    },[name])

    const resizeFile = (file) => new Promise(resolve => {
        //maxWidh 700 maxHeight 700 file jpeg quaulity 70%, format file
        Resizer.imageFileResizer(file, 300, 300, 'jpeg', 100, 0,
        uri => {
        resolve(uri);
        },
        'file'
        );
    });

    
    const onProfileHandler = async (event) => {
        let reader = new FileReader();

        reader.onloadend = () => {
        //읽기가 완료되면 아래코드가 실행됩니다.
        const base64 = reader.result;
        if (base64) {
            //미리보기를 위한 이미지
            setPreview(base64.toString()); // 파일 base64 상태 업데이트
        }   
        }
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]); // 파일을 읽어 버퍼에 저장
            const image = await resizeFile(event.target.files[0]);
            setProfile(image); // 파일 상태 업데이트 
        console.log(image);     
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //refresh 방지 (다음 일을 수행하기 위해서)
        
        console.log(profile)
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
             if(response.payload.Success){
               alert('회원가입 성공')
                 props.history.push('/login');
             }else{
                 alert('회원가입 실패')
             }
         })
    }

    return(
        <div className="registerform">
        <RegisterDesign>
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
            <div className="card register-card">
                <div className="row no-gutters">
                <div className="col-md-5">
                    <img src="./registerimage.jpg" alt="register" className="register-card-img"/>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                    <Form className="form">  
                        <Col>
                        <div className="logo-wrapper">
                            <img src="/logo.png" width="150px" alt="logo" className="logo"/>
                        </div>
                        <p className="register-card-description">Sign up</p>
                        <FormGroup>
                            <Label htmlFor="ID" className="sr-only">ID</Label>
                            <Input type="text" name="ID" id="ID" 
                            onChange={onIDHandler} onBlur={onIDDuplicateCheck} placeholder="*ID" defaultValue={id}/>
                            <FormText className="idmessage mb-3 mt-0 ml-1">{idMessege}</FormText>

                            <Label htmlFor="password" className="sr-only">Password</Label>
                            <Input type="password" name="password" id="password" className="mb-1"
                            onChange={onPasswordHandler} placeholder="*Password" defaultValue={password}/>
                            <Input type="password" name="passwordcheck" id="passwordcheck" className="form-control" 
                            onChange={onPasswordCheckHandler} placeholder="*PasswordCheck"/>
                            <FormText className="mb-3 mt-0 ml-1">{passwordMessage}</FormText>

                            <Label htmlFor="name" className="sr-only">*Name</Label>
                            <Input type="text" name="name" id="name"  
                            onChange={onNameHandler} placeholder="*Name" defaultValue={name}/>
                            <FormText className="mb-3 mt-0 ml-1">{nameMessage}</FormText>


                            <Label htmlFor="nickaname" className="sr-only">Password</Label>
                            <Input type="text" name="name" id="name"  
                            onChange={onNickNameHandler} placeholder="*Nickname" defaultValue={nickname}/>
                            <FormText className="mb-3 mt-0 ml-1">{"ㅤ"}</FormText>

                            <Label>Profile</Label><br/>
                            <img className="preview-img img-fluid rounded-circle"  src={preview} alt="preview" />
                            <Label htmlFor="profile">
                            <i className="fa fa-upload" aria-hidden="true"></i>
                            </Label> 
                            <Input type="file" name="profile" id="profile" accept="image/*" onChange={onProfileHandler}/> 
                            
                            <Button name="register" id="register" className="btn btn-block register-btn mb-4 mt-4" 
                            onClick={onSubmitHandler}>Register</Button>
                        </FormGroup>
                        </Col>    
                        
                    </Form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </main>
        </RegisterDesign>
    </div>
       
    )
}

const RegisterDesign = styled.header`
    .fa-upload {
        color: var(--FontGrey)
    }
    input[type="file"] {
        display : none;
    }

    .preview-img {
        width : 100px;
        height : 100px;
    }

    .registerform {
        background : var(--BGGrey);
    }

    .logo-wrapper {
        margin-bottom: 19px; 
    }
    
 
  
    .register-card {
        border: 0;
        border-radius: 10px;
        box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
        overflow: hidden; 
    }

   .register-card-img {
      border-radius: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover; 
    }

    .register-card .card-body {
      padding: 85px 60px 60px; 
    }
    
    @media (max-width: 422px) {
        .register-card .card-body {
          padding: 35px 24px; } }
    .register-card-description {
      font-size: 25px;
      color: #000;
      font-weight: normal;
      margin-bottom: 23px; }

    .register-card form {
      max-width: 326px; }

    .register-card .form-control {
      border: 1px solid #d5dae2;
      padding: 15px 25px;
      min-height: 45px;
      font-size: 15px;
      line-height: 15;
      font-weight: normal; 
    }
    margin-bottom: 20px;



    .register-card .register-btn  {
      padding: 13px 20px 12px;
      background-color: var(--BGGrey);
      border-radius: 4px;
      border-color : var(--BGGrey);
      font-size: 17px;
      font-weight: bold;
      line-height: 20px;
      color: #fff;
      margin-bottom: 24px; 
    }

    
    .register-card .Link .Button {
        text-decoration: none
    }


    .register-card .register-btn:hover {
        border: 1px solid var(--FontGrey);
        background-color: transparent;
        color: var(--FontGrey); }


    .register-card .forgot-password-link {
      font-size: 14px;
      color: #919aa3;
      margin-bottom: 12px; }
    .register-card-footer-text {
      font-size: 16px;
      color: #0d2366;
      margin-bottom: 60px; }
      @media (max-width: 767px) {
        .register-card-footer-text {
          margin-bottom: 24px; } }
    .register-card-footer-nav a {
      font-size: 14px;
      color: #919aa3; }
`

export default withRouter(RegisterPage);

