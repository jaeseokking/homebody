import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { communityLikeUpdate} from '../../../_actions/like_action'
import styled from 'styled-components';


function CommunityLike({likeList, likecnt}) {

    const dispatch = useDispatch();

    const login = useSelector(state => state.user.login ?? {} );
    const detail = useSelector(state => state.board.detail ?? {});
    const list = detail.list[0];

    const loginUserNickname = login.nickname;

    const [likeCount, setLikeCount] = useState(likecnt);
    const [likeCheck, setLikeCheck] = useState(false);
    const [Style, setStyle] = useState(LikeStyled2);

    useEffect(() => {
        if(likeList.length > 0){
            console.log(likeList[0].board_id, list.board_id)
            if(likeList[0].board_id == list.board_id){
                likeList.map((val) =>{
                    if(val.user_nickname === loginUserNickname){
                        setLikeCheck(true)
                        setStyle(LikeStyled1);
                        console.log('좋아요 누른 상태')
                    } 
                })
            }else{
                setLikeCheck(false)
                setStyle(LikeStyled2)
                console.log('좋아요 누르지 않은 상태');
            }
        }else{
            setLikeCheck(false)
            setStyle(LikeStyled2)
            console.log('좋아요 누르지 않은 상태');
        }
    },[likeList])

   useEffect(() => {
     setLikeCount(likecnt)
   },[likecnt])  

    const onLikeHandler = () => {
        let body
        if(likeCheck  == true){
            setLikeCheck(false)
            setLikeCount(likeCount -1);
            setStyle(LikeStyled2)
            body = {
                likeCheck : likeCheck,
                nickname : loginUserNickname,
                board_id : list.board_id
            }
        }else{
            setLikeCheck(true)
            setLikeCount(likeCount + 1);
            setStyle(LikeStyled1)
            body = {
                likeCheck : likeCheck,
                nickname : loginUserNickname,
                board_id : list.board_id
            }
        }

        dispatch(communityLikeUpdate(body))

    }

  
    if(likeList.length > 0 ){
        return (
            <div> 
                <ul className="row">
                    <Style><li><a><i className="fa fa-heart mr-3" onClick={onLikeHandler}></i></a></li>
                    {likeList.slice(0, 4).map((val) => {
                        const profile = btoa(String.fromCharCode(...new Uint8Array(val.profile.data))) ;
                        return <li key={val.id}>
                            <a href="#"><img src={profile ? `data:image/png;base64,${profile}` : '/default.png'} className="img-fluid rounded-circle" alt="User"/></a>
                            </li>
                        
                    })}
                    <li><a><span>{likeCount} Like</span></a></li>
                    </Style>
                </ul>
            </div>
        )
    }else{
        return (
            <ul className="row">
                    <Style><li><a><i className="fa fa-heart mr-3" onClick={onLikeHandler}></i></a></li>
                    <li><a><span>{likeCount} Like</span></a></li>
                    </Style>
             </ul>
        )
    }
  
    
}


export default CommunityLike;

const LikeStyled1 = styled.header`
    font-family: Noto Sans CJK KR;

    .fa-heart {
        color : rgb(255,100,0);
        cursor: pointer;
    }

    .fa-heart:hover {
        color : rgb(140,140,140);
        cursor: pointer;
    }

`

const LikeStyled2 = styled.header`
    font-family: Noto Sans CJK KR;

    .fa-heart:hover {
        color : rgb(255, 100, 0);
        cursor: pointer;
    }

`