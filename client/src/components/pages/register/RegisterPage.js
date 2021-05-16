import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { Col, Form, FormGroup, Label, Input, Button, FormText} from 'reactstrap';
import styled from 'styled-components';
import { IDValid, PWValid, NameValid, NickNameValid } from './Validation';

export function RegisterPage(props){
    //dispatch는 Reducer에 action을 알리기 위한 함수
    const dispatch = useDispatch()
    const refID = useRef();
    const refPW = useRef();
    const refPWCK = useRef();
    const refName = useRef();
    const refNick = useRef();
    
    const [id, setID] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [name, setName] = useState();
    const [nickname, setNickName] = useState();
    const [profile, setProfile] = useState(null);
    const [preview, setPreview] = useState("/default.png");

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


    const [idValid , setIDValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordCheckValid, setPasswordCheckValid] = useState(false);    
    const [nameValid, setNameValid] = useState(false);
    const [nicknameValid, setNicknameValid] = useState(false);

    const [idMessege , setIDMessage] = useState("ㅤ");
    const [nameMessage , setNameMessage] = useState("ㅤ");
    const [passwordMessage, setPasswordMessage] = useState("ㅤ");
    const [nicknameMessage, setNicknameMessage] = useState("ㅤ");

    //아이디 유효성 검사
    useEffect(() => {
        //id를 적은 경우
        if(id !== ''){
            if(IDValid(id)){
                setIDValid(null);
                //중복검사 하기전 메시지 없음
                setIDMessage('ㅤ')
            }else if (!IDValid(id)){
                setIDValid(false)
                setIDMessage('영어 숫자 조합 5~12 글자 가능')
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
        if(idValid === null && id !== undefined && id !== ''){
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
        if(password !== ''){
            if(PWValid(password)){
                setPasswordValid(true)
                setPasswordMessage('ㅤ')
                if(password === passwordCheck){
                    setPasswordCheckValid(true)
                    setPasswordMessage('비밀번호 확인완료')
                }else if(password !== passwordCheck && passwordCheck !== ''){
                    setPasswordCheckValid(false)
                    setPasswordMessage('비밀번호가 일치하지 않습니다.')
                }

            }else if(!PWValid(password) && password !== undefined){
                setPasswordValid(false)
                setPasswordMessage('영문 숫자 특수문자 조합 8~15 글자가능')
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
                setNameMessage('한글 영문 2~10 글자가능')
            }
        //이름을 입력하지 않은 경우 
        }else if(name !== undefined){
            setNameValid(false)
            setNameMessage('이름은 필수입력입니다.')
        }
        
    },[name])


    //닉네임 유효성 검사
    useEffect(() => {
        //nickname을 적은 경우
        if(nickname !== ''){
            if(NickNameValid(nickname) && nickname){
                setNicknameValid('');
                //중복검사 하기전 메시지 없음
                setNicknameMessage('중복검사를 해주세요')
            }else if (!NickNameValid(nickname)){
                setNicknameValid(false)
                setNicknameMessage('한글 영문 숫자 2~10 글자가능')
            }
        //아이디를 입력하지 않은 경우 
        }else{
            setNicknameValid(false)
            setNicknameMessage('닉네임은 필수입력입니다.')
        }
    },[nickname])
    
    //닉네임은 마지막 입력란 이므로 포커스아웃 하지않고 유효성버튼 클릭시 중복확인
    const onNicknameDuplicateCheck = (event) => {
        event.preventDefault(); //refresh 방지 (다음 일을 수행하기 위해서)

        //유효성 검사를 통과한 경우하고 값이 있을 경우
        if(nicknameValid !== false && nickname !== undefined){
            const body = {
                nickname : nickname 
            }
            Axios.post('/api/register/nicknamecheck', body ).then(response=> {
                //유효성검사와 중복검사 모두 통과할 경우 
                if(response.data.nicknameCheck === true){
                    setNicknameValid(true);
                    setNicknameMessage('사용가능한 닉네임');
                }else{
                    setNicknameMessage('닉네임이 중복됩니다.');
                }
            
                
            })
        }    
    }

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
        //읽기가 완료되면 아래코드가 실행
        reader.onloadend = () => {
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
        }
    }

    
const onSubmitHandler = (event) => {
    event.preventDefault(); //refresh 방지 (다음 일을 수행하기 위해서)

    if(!idValid){
        alert("아이디를 확인해주세요")
        refID.current.focus();
        return;
    }else if(!passwordValid){
        alert("패스워드를 확인해주세요")
        refPW.current.focus();
        return;
    }else if(!passwordCheckValid){
        alert("패스워드확인을 확인해주세요")
        refPWCK.current.focus();
        return;
    }else if(!nameValid){
        alert("이름을 확인해주세요")
        refName.current.focus();
        return;
    }else if(!nicknameValid){
        alert("닉네임을 확인해주세요")
        refNick.current.focus();
        return;
    }else{
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
}

    return(
        <div className="registerform">
        <Styled>
        <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
            <div className="card register-card">
                <div className="row">
                <div className="col-md-5 align">
                    <img src="./registerimage.jpg" alt="register" className="register-card-img"/>
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                    <Form className="form">  
                        <Col>
                        <div className="logo-wrapper">
                            <img src="/logo.png" width="150px" alt="logo" className="logo"/>
                        </div>
                        <p className="register-card-description">Register</p>
                        <FormGroup>
                        <FormGroup className="profile-img mx-5">
                        <Label className="profile mx-5 px-4">Profile</Label><br/>
                            <img className="preview-img img-fluid rounded-circle mx-5"  src={preview} alt="preview" />
                            <Label htmlFor="profile">
                            <i className="fa fa-camera mb-4"></i>
                            </Label> 
                            <Input type="file" name="profile" id="profile" accept="image/*"   onChange={onProfileHandler}/>
                        </FormGroup>

                            <Label htmlFor="ID" className="sr-only">ID</Label>
                            <Input type="text" name="ID" id="ID" innerRef={refID}
                            onChange={onIDHandler} onBlur={onIDDuplicateCheck} placeholder="*ID" defaultValue={id}/>
                            <FormText className="idmessage mb-3 mt-0 ml-1">{idMessege}</FormText>

                            <Label htmlFor="password" className="sr-only">Password</Label>
                            <Input type="password" name="password" id="password" innerRef={refPW} className="mb-1"
                            onChange={onPasswordHandler} placeholder="*Password" defaultValue={password}/>
                            <Input type="password" name="passwordcheck" id="passwordcheck" innerRef={refPWCK} className="form-control" 
                            onChange={onPasswordCheckHandler} placeholder="*PasswordCheck"/>
                            <FormText className="mb-3 mt-0 ml-1">{passwordMessage}</FormText>

                            <Label htmlFor="name" className="sr-only">*Name</Label>
                            <Input type="text" name="name" id="name" innerRef={refName}  
                            onChange={onNameHandler} placeholder="*Name" defaultValue={name}/>
                            <FormText className="mb-3 mt-0 ml-1">{nameMessage}</FormText>

                            <div className="valid-form" >
                                <Label htmlFor="nickaname" className="sr-only">Nickname</Label>
                                <Input type="text" name="nickname" id="nickname"  innerRef={refNick}
                                onChange={onNickNameHandler} placeholder="*Nickname" defaultValue={nickname}/>
                                <Button onClick={onNicknameDuplicateCheck} className="btn confirm-btn" >
                                    Confirm <br/>
                                    Duplication
                                </Button>
                                <FormText className="mb-3 mt-0 ml-1">{nicknameMessage}</FormText>
                            </div> 
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
        </Styled>
    </div>
       
    )
}


const Styled = styled.header`
    font-family: Noto Sans CJK KR;

    .profile {
        color : var(--FontGrey);
    }

    .profile-img{
        position: relative;
    }

    .fa-camera {
        position: absolute;
        color: var(--FontGrey);
        top : 108px;
        left : 117px;
        background-color: var(--white);
        padding:5px;
        border-radius: 50%;
    }


    .fa-camera: hover{
        cursor: pointer;
    }

    .valid-form {
        position: relative;
    }

    .valid-form button {
        font-weight: bold;
        line-height: 13px;
        font-size: 14px;
        position: absolute;
        top: 3px;
        right : 0px;
        border: none;
        background-color: transparent;
        color: #bbbbbb;
        cursor: pointer;
    }

    .btn:focus {
        outline: none;
        box-shadow: none;
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

