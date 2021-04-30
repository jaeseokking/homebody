import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeCommentUplaod } from '../../../_actions/comment_action';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

function Comment(props) {
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const detail = state.board.detail ?? {}
    const list = detail.list ?? []
    const home_id = list.home_id ?? {};
    const login = state.user.login ?? {};
    const nickname = login.nickname ?? {}; 


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');



    const onTitleHandler = (event) => {
        setTitle(event.target.value);
    }

    const onContentHandler = (event) => {
        setContent(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
           nickname : nickname,
           home_id : home_id,
           title : title,
           content : content
        }

        setTitle('');
        setContent('');

        dispatch(homeCommentUplaod(body)).then(response => {
            console.log(response.payload)
           if(!response.payload.Success){
                alert('댓글 실패')
           }else{
               alert('댓글 성공')
               //같은 페이지에 다른 토글에 저장되어 있는 것이므로 새로고침을 해서 다시 state를 받도록함
               window.location.reload(false); 
           }
        })
        
    }


    return (
        <CommentDesign>
        <div className="container my-4" role="main">
         <h2>Comment</h2>
         <form name="form" id="form" role="form" method="post" 
         action="">
            <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" 
                name="title" id="title" value={title} placeholder="제목을 입력해 주세요"
                onChange={onTitleHandler}/>
            </div>     
            <div className="mb-3">
                <label htmlFor="content">Contents</label>
                <textarea className="form-control" rows="5" 
                name="content" id="content" value={content} placeholder="내용을 입력해 주세요"
                onChange={onContentHandler}/>
            </div>
        </form>
        <button onClick={onSubmitHandler} type="button" className="btn btn-outline-secondary text-uppercese" id="btnSave">Save</button>
        </div>
        </CommentDesign>
    )
}

const CommentDesign = styled.header`
    .form-control {
        border: 1px solid #d5dae2;
        padding: 15px 25px;
        margin-bottom: 20px;
        min-height: 45px;
        font-size: 13px;
        font-weight: normal; 
    }
`

export default withRouter(Comment);