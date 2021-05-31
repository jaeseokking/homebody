import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { userAuth } from '../_actions/user_action';
import { useCookies } from 'react-cookie';

//첫번째 인자 : Component(들어가는 컴포넌트), 두번째 인자 : Component의 option                                                   //기본값이 null 이라는 표시
export default function (SpecificComponent, option){

    //option은 3개로 나눔
    //null : 아무나 출입이 가능한 페이지
    //true : 로그인한 유저만 가능한 페이지
    //false : 로그인한 유저는 출입 불가능한 페이지 
    function AuthenticationCheck(props){
        const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
        const user = useSelector(state => state.user ?? {});
        const login = user.login ?? {}
        const loginSuccess = login.loginSuccess ?? '';
        if(loginSuccess == false){
            removeCookie(['user_token']);
            console.log('로그인안함')
        }

        const dispatch = useDispatch();
        
        useEffect(() => {
            
            dispatch(userAuth()).then(response => {
                //로그인 하지 않은 상태 isAuth false
                if(!response.payload.loginSuccess){
                    if(option === true){//로그인한 사용자만 가능한 페이지 접근시
                        props.history.push('/login');
                    }

                //로그인한 상태 
                }else{ 
                //로그인한 유저가 출입불가능한페이지를 들어갈 때
                if(option === false){
                    props.history.push('/');    
                    }
                }
            })           
        }, [])
        //조건문에 해당하지 않으면 해당컴포넌트를 렌더링해줌
        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck;
}