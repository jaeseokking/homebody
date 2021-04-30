import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeCommentGet } from '../../../_actions/comment_action';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function HomeCommentsGet() {
    const dispatch = useDispatch();
    //const postdetail = state.post.homepostdetail.list ?? []
    //const postid = postdetail.id ?? {};
    let { home_id } = useParams();    
    
    const body = {
        home_id : home_id
    }

    const comment = useSelector(state => state.comment)
    const comments = comment.comments ?? {}
    const list = comments.list ?? [];

    useEffect(() => {
        dispatch(homeCommentGet(body))
    }, [])

    return (
        <ReviewDesign>
        <div className="row my-3">
            {list.map((val) => {
                const base64String = btoa(String.fromCharCode(...new Uint8Array(val.profile.data))) ;
                return <div key={val.id}className="reviewform mx-4 my-3 row" style={{ width: '70rem'}}> 
                        <div className="userInfo my-3">
                            <img src ={`data:image/png;base64,${base64String}`}  art='useProfile' className="mr-3 rounded-circle "  style={{width: '35px', height: '35px'}}/><br/>
                            <a>{val.nickname}</a>
                        </div>
                        <div className="comment-body col mx-5" >
                            <h5 className="mt-2">{val.title}</h5>
                            <p>{val.content}</p>
                        </div>
                     </div>
            })}           
        </div>
        </ReviewDesign>
    )
}

const ReviewDesign = styled.header`
    font-family: Noto Sans CJK KR;

    p {
        word-break:break-all;
    }
`


export default HomeCommentsGet;