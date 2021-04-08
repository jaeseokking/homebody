import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { communityLikeGet, communityLikeUpdate} from '../../../_actions/like_action'
import styled from 'styled-components';

function CommunityLike({board_id}) {
    const dispatch = useDispatch();

    const body = {
        board_id : board_id
    }

    const login = useSelector(state => state.user.login ?? {} );

    const loginUserNickname = login.nickname;
    useEffect(() => {
        console.log(loginUserNickname);
        dispatch(communityLikeGet(body)).then(response => {
            console.log(response.payload.list)
            response.payload.list.map((val) => {
                if(val.user_nickname === loginUserNickname){
                    setLikeCheck(true)
                    setStyle(LikeStyled1);
                    console.log('좋아요 누른 상태')
                }
            })
        })      
    }, [])

    const detail = useSelector(state => state.like.detail ?? {});

    const list = detail.list ?? [];
    const board_detail = useSelector(state => state.board.detail ?? {});
    const board_list = board_detail.list[0] ?? [];
    const likecnt = board_list.likecnt;
  

    const [likeCount, setLikeCount] = useState(likecnt);
    const [likeCheck, setLikeCheck] = useState(false);
    const [Style, setStyle] = useState(LikeStyled2);


    const onLikeHandler = async () => {
        if(likeCheck){
            setLikeCheck(false)
            setLikeCount(likeCount -1);
            setStyle(LikeStyled2)
        }else{
            setLikeCheck(true)
            setLikeCount(likeCount + 1);
            setStyle(LikeStyled1)
        }

        console.log(likeCheck)
        const body = {
            likeCheck : likeCheck,
            nickname : loginUserNickname,
            board_id : board_id            
        }

        dispatch(communityLikeUpdate(body))

    }
    
    return (
        <div> 
            <ul className="row">
               <Style><li><a><i className="fa fa-heart mr-3" onClick={onLikeHandler}></i></a></li>
                {list.slice(0, 4).map((val) => {
                    const profile = btoa(String.fromCharCode(...new Uint8Array(val.profile.data))) ;
                    return <li key={val.id}>
                        <a href="#"><img src={`data:image/png;base64,${profile}`} className="img-fluid rounded-circle" alt="User"/></a>
                        </li>
                    
                })}
                <li><a><span>{likeCount} Like</span></a></li>
                </Style>
            </ul>
        </div>
    )
}


export default CommunityLike;

const LikeStyled1 = styled.header`
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
    .fa-heart:hover {
        color : rgb(255, 100, 0);
        cursor: pointer;
    }

`