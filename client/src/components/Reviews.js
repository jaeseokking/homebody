import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeReviews } from '../actions/comment_action';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Reviews() {
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    //const postdetail = state.post.homepostdetail.list ?? []
    //const postid = postdetail.id ?? {};
    let { postid } = useParams();    

    const body = {
        postid : postid
    }

    const homereviews = state.comment.homereviews ?? {}
    const list = homereviews.list ?? [];

    useEffect(() => {
        dispatch(homeReviews(body))
    }, [])

    return (
        <ReviewDesign>
        <div className="row my-3">
            {list.map((val) => {
                const base64String = btoa(String.fromCharCode(...new Uint8Array(val.profile.data))) ;
                return <div key={val.id}className="reviewform mx-4 my-3 row" style={{ width: '70rem'}}> 
                        <div className="userInfo my-3">
                            <img src ={`data:image/png;base64,${base64String}`}  art='useProfile' className="mr-3"  style={{width: '35px', height: '35px'}}/><br/>
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
    p {
        word-break:break-all;
    }
`


export default Reviews;