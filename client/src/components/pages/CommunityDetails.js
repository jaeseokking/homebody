import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { uploadComment } from '../../actions/comment_action';
import { communityDetail } from '../../actions/post_action';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function CommunityDetails () {
    let { postid } = useParams();
    
    const body = {
      postid : postid
    }

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(communityDetail(body))
    }, [])

    
    const post =  useSelector(state => state.post);
    const user =  useSelector(state => state.user);

    const communitydetail = post.communitydetail ?? {};
    const list = communitydetail.list ?? [];

    const commentList = communitydetail.commentList ?? [];

    const login = user.login ?? {};
    const loginUserProfile = login.profile ?? {} ;
    const nickname = login.nickname ?? {};

    const [comment, setComment] = useState();

    const onCommentHandler = (event) => {
      setComment(event.target.value);
    }

    const onSubmitHandler = () => {
      const body = {
        postid : postid,
        comment : comment,
        nickname : nickname
      }


      dispatch(uploadComment(body)).then(response => {
        console.log(response.payload)
        if(response.payload.uploadSuccess){
          alert('댓글 업로드 성공');
          window.location.reload(false); 
        }else{
          alert('댓글 업로드 실패');
        }
      })
    }
    

    if(list.length === 1){
      const base64Profile = btoa(String.fromCharCode(...new Uint8Array(list[0].profile.data))) ;
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(list[0].img.data))) ;
      const writer = list[0].writer
      const UserProfile = btoa(String.fromCharCode(...new Uint8Array(loginUserProfile.data))) ;

      
        return (
          <CDDesing>

          <div className="cardbox shadow-lg col-md-10 ml-auto mr-auto mb-3 ">
                
                <div className="cardbox-heading">
                    <div className="media">
                        <div className="d-flex ">
                            <a href=""><img className="writer-img img-fluid rounded-circle" src={`data:image/png;base64,${base64Profile}`} alt="User"/></a>
                        </div>
                        <div className="media-body">
                            <p className="m-0">{writer}</p>
                            <small><span><i className="icon ion-md-time"></i>작성시간</span></small>
                        </div>
                    </div>
                </div>
                
                <div className="cardbox-item">
                    <img className="img-fluid" src={`data:image/png;base64,${base64Image}`}  alt="Image"/>
                </div>
                <div className="cardbox-base">
                    <ul className="float-right">
                    <li><a><i className="fa fa-comments mr-2"></i></a></li>
                    <li><a><em className="mr-2">12</em></a></li>
                    </ul>
                    <ul>
                    <li><a><i className="fa fa-thumbs-up mr-3"></i></a></li>
                    <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/3.jpeg" className="img-fluid rounded-circle" alt="User"/></a></li>
                    <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/1.jpg" className="img-fluid rounded-circle" alt="User"/></a></li>
                    <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/5.jpg" className="img-fluid rounded-circle" alt="User"/></a></li>
                    <li><a href="#"><img src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/2.jpg" className="img-fluid rounded-circle" alt="User"/></a></li>
                    <li><a><span>242 Likes</span></a></li>
                    </ul>			   
                </div>
            </div>
          
          <div className="cardbox shadow-lg col-md-10 ml-auto mr-auto mb-3">
            <div className="cardbox-comment">
            <table className="comment-box mx-auto" border='2'>
            <tbody className="tbody">
            
              {commentList.map((val) => {
                const profile = btoa(String.fromCharCode(...new Uint8Array(val.profile.data))) ;
                return <tr  > <td rowspan='2' align='center'> 
                <img className="user-img img-fluid" src={`data:image/png;base64,${profile}`}  alt="Image"/><br/>
                {val.nickname}
              </td> 
              <td rowspan='2' align='center'>
                {val.comment}
              </td>
              </tr>
              })}
             </tbody>
            </table>
  
            <div className="cardbox-comments mt-2">
                  <span className="comment-avatar">
                  <a href=""><img className="rounded-circle" src={`data:image/png;base64,${UserProfile}`} alt="..."/></a>                            
                  </span>
                  <div className="search">
                      <input className="comment-text" placeholder="Write a comment" type="text" onChange={onCommentHandler}/>
                      <button onClick={onSubmitHandler}><i className="fa fa-arrow-up mr-1 mt-2"></i></button>
                  </div>
              </div>		
            </div>

            </div>

  
      </CDDesing>
      )
      
       
    }else{
        return (
            <div className="loading">
                Data loading...
            </div>
        )
    }  
   
    
}

export default CommunityDetails;

const CDDesing = styled.body`
  .body {
    background : var(--BGGrey)
  }

  .cardbox {
   max-width : 720px;
   background : var(--white);
   border-radius: 10px;
   margin: 0;
  }

  .cardbox .cardbox-heading {
    padding: 16px;
    margin: 0;
  }

  .user-img {
    max-width : 50px;
    max-height : 50px;
  }
  .writer-img {
    max-width : 50px;
    max-height : 50px;
  }
  

  .cardbox .float-right a:hover{
    background: var(--white) 
  }
 
  .cardbox-comment {
    padding : 16px;
  }

  
  .media-body p{
    font-weight: 500 !important;
    font-size: 14px;
  }
  
  .media-body small span{
    font-size: 12px;
    color: #aaa;
    margin-right: 10px;
  }
  
  
  .cardbox .cardbox-item {
      position: relative;
  }

  .cardbox .cardbox-item img{
    
  }

  .comment{
    max-width : 720px; 
  }


  .cardbox-base ul{
   margin: 10px 0px 10px -20px!important; 
   font-size: 0px;	
    display: inline-block;
  }

  .cardbox-base li {
    list-style: none;
    margin: 0px 0px 0px -8px ;
    padding: 0px 0px 0px 0px ;
    display: inline-block;
  }
  
  
  .cardbox-base li a i{
   position: relative;
   top: 4px; 
   font-size: 16px;
   color: #8d8d8d;
  }

  .cardbox-base li a span{
   font-size: 14px;
   color: #8d8d8d;
   margin-left: 20px;
   position: relative;
   top: 5px; 
  }
  .cardbox-base li a em{
   font-size: 14px;
   color: #8d8d8d;
   position: relative;
   top: 3px; 
  }
  .cardbox-base li a img{
    width: 25px;
    height: 25px;
    border: 2px solid #fff;
  }
  
  
  .cardbox-comments{
    padding: 10px 40px 20px 40px !important;
    font-size: 0px;	
    text-align: left;
    margin-right: 10px
  }

  .cardbox-comments .comment-avatar img{
    margin-top: 2px;
    margin-left : -30px;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
  }

  
  .cardbox-comments .comment-body {
    
    overflow: auto;
  }

  .search {
   position: relative;
   right: -40px;
   top: -40px;
   margin-bottom: -40px;
   margin-right: 10px;
   border: 2px solid #f4f4f4;	
   width: 100%;
   overflow: hidden;
   display: inline-block;

  }

  .search input[type="text"] {
   background-color: #fff;
   line-height: 10px;
   padding: 15px 0px 20px 20px;
   border: none;
   border-radius: 4px;
   font-size: 14px;
   color: var(--FontGrey);
   font-weight: 700;
   display: inline-block;
   width : 100%;
  }



  .search button {
   position: absolute;
   right: 0;
   top: 0px;
   border: none;
   background-color: transparent;
   color: #bbbbbb;
   padding: 15px 25px;
   cursor: pointer;
  
  .d-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  }
  
  .search button i {
   font-size: 20px;
   line-height: 5px;
   display: block;
  }
  
  

  .author a{
   font-size: 16px;
   color: #00C4CF;
  }
  .author p{
   font-size: 16px;
   color: #8d8d8d;
  }
`