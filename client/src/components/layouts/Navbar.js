import React from 'react'
import { Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../_actions/user_action'
import { useCookies } from 'react-cookie';


function Navbar(props) {
  const dispatch = useDispatch();
  
  const onLogoutHandler = () => {
    sessionStorage.clear();
   dispatch(userLogout())
   .then(response => {
     console.log(response.payload)
        if(response.payload.loginSuccess === false){
          props.history.push('/login'); //withRouter를 감싸줘야 사용 가능
        }else{
            alert('로그아웃 실패');
        }
    })
  }
  
  const user = useSelector(state => state.user ?? {});
  const login = user.login ?? {}
  const loginSuccess = login.loginSuccess ?? [];

  const profile = login.profile ?? [];  
  const nickname = login.nickname 
  let profileimg;

  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  //로그인 확인되었을 경우 
  const LoginCheck = () => {

    if(loginSuccess == true && cookies != {}){
      profileimg = btoa(String.fromCharCode(...new Uint8Array(profile.data))) ;
      return  <><li>
          <Link className="nav-link ml-5 my-2" to='/userInfo'>
          <img className="profile-img img-fluid rounded-circle" 
          src={profileimg ? `data:image/png;base64,${profileimg}` : '/default.png'} alt="profile">
          </img>{nickname}</Link>
        </li>
        <li>        
        <Link className="nav-link ml-5 my-2 " to="/login" onClick={onLogoutHandler}>Logout</Link>
      </li>  
      </> 
    }else{
      return<>
         <li>
              <Link className="nav-link ml-5" to ="/login">Login</Link>
            </li>
            <li>
              <Link className="nav-link ml-5" to ="/register">Register</Link>
        </li>
      </>
    }
  }
  //console.log(nickname);
  //console.log(loginSuccess.length)
  //쿠기의 유무와 session에 저장된 name값 유무로 로그인 판단

    return (
      <NavContainer>
      <nav className="navbar navbar-expand-lg navbar-light">
          <div className="logo my-2">
          <Link className="navbar-brand ml-5" to="/">
            <img src="/logo.png" width="120px" alt="Logo"></img>
          </Link>
          </div>
      
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span>
              {/*페이지 줄일때 바 색조정*/}
            <i className="fas fa-bars"/>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            <li className="nav-item active">
              <Link className="nav-link text-uppercase ml-5" to="/">Home&nbsp;<i className="fas fa-home"></i> <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase ml-5" to="/community">community</Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link text-uppercase ml-5" to="/about">about</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <LoginCheck/>
          </ul>
        </div>
      </nav>
      </NavContainer>
    )
}

export default withRouter(Navbar);

const NavContainer = styled.footer`
    font-family: Noto Sans CJK KR;

    .navbar {
      position: relative;
        background-color: var(--white);
        color: var(--FontGrey);
    }

    .profile-img {
      width : 35px;
      height: 35px;
    }

    .nav-link.text-uppercase.ml-5 {
      color: var(--FontDarkGrey);
    }

    

    .fas {
      color: var(--FontGrey)
    }   

    ul li a {
        color: var(--white);
    }

    ul li a :hover {
        color : var(--FontGrey);
    }
`;
