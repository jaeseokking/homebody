import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { uploadComment } from '../../../_actions/comment_action';
import { communityDetail } from '../../../_actions/board_action';
import { useParams } from 'react-router-dom';
import Comments from './Comments'
import Pagination from './Pagination';
import Dropdown from './Dropdown';
import CommunityLike from './CommunityLike';
import styled from 'styled-components';

function CommunityDetails () {
    let { board_id } = useParams();
    
    const body = {
      board_id : board_id
    }

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(communityDetail(body))
    }, [])

    
    const board =  useSelector(state => state.board);
    const user =  useSelector(state => state.user);

    const detail = board.detail ?? {};

    //게시글
    const list = detail.list ?? [];

    //댓글 리스트
    const commentList = detail.commentList ?? [];

    const login = user.login ?? {};
    const loginUserProfile = login.profile ?? {} ;
    const nickname = login.nickname ?? {};

    const [comment, setComment] = useState();

    const onCommentHandler = (event) => {
      setComment(event.target.value);
    }

    const onSubmitHandler = () => {
      const body = {
        board_id : board_id,
        comment : comment,
        nickname : nickname
      }


      dispatch(uploadComment(body)).then(response => {
        //console.log(response.payload)
        if(response.payload.Success){
          alert('댓글 업로드 성공');
          window.location.reload(false); 
        }else{
          alert('댓글 업로드 실패');
        }
      })
    }


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    function currentPosts(list) {
      let currentPosts = 0;
      //slice 첫번째인자부터 마지막인자-1 까지 복사본을 새롭게 생성
      currentPosts = list.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    }

    
    if(list.length === 1){
      const writer = list[0].writer

      function Image(){
        //이미지가 없는 경우 
        if(list[0].base64Image === ''){
          return <div></div> ;

          //이미지가 있는 경우 
        }else{
          const base64Image = btoa(String.fromCharCode(...new Uint8Array(list[0].image.data))) ;
          return  <div className="cardbox-ite d-flex my-auto">
          <img className="img-fluid ml-auto mx-auto" src={`data:image/png;base64,${base64Image}`}  alt="Image"/>
          </div>
        }
      }
      const base64Profile = btoa(String.fromCharCode(...new Uint8Array(list[0].profile.data))) ;
      const UserProfile = btoa(String.fromCharCode(...new Uint8Array(loginUserProfile.data))) ;
      
      
      
      return (
          <CDDesing>
          <div className="cardform mx-auto">
          <div className="row my-5">
          <div className="cardbox shadow-lg col-md-10  ml-auto mr-auto mb-3">  
                <div className="cardbox-heading">
                   <Dropdown postNickName={writer}></Dropdown>
                     <div className="media">
                        <div className="d-flex">
                            <a href=""><img className="writer-img img-fluid rounded-circle mx-1" src={`data:image/png;base64,${base64Profile}`} alt="User"/></a>
                        </div>
                        <div className="media-body">
                            <p className="m-0">{writer}</p>
                            <small><span><i className="icon ion-md-time"></i>작성시간</span></small>
                        </div>
                    </div>
                </div>
                <h4 align="center">{list[0].title}</h4>
                <Image/>
                <p>{list[0].description}</p>
                <div className="cardbox-base">
                    <ul className="float-right">
                      <li><a><i className="fa fa-comments mr-2"></i></a></li>
                      <li><a><em className="mr-2 ml-1">{commentList.length}</em></a></li>
                    </ul>
                    <CommunityLike board_id={list[0].board_id} likecnt={list[0].likecnt}/>   
                </div>
            </div>
          
          <div className="cardbox shadow-lg col-md-10 ml-auto mr-auto mb-3">
            <div className="cardbox-comment">
            <table className="comment-box">
            <tbody> 
          
            <Comments className="comments" list={currentPosts(commentList)} ></Comments>
             </tbody>
            </table>
            <div className="pagenumber">
            <Pagination postsPerPage={postsPerPage} totalPosts={commentList.length} paginate={setCurrentPage}></Pagination>
            </div>
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

const CDDesing = styled.header`
  .cardform {
    max-width : 1600px;
  }

  .fa-heart{
    
  }

  .fa-heart:hover {
    color : rgb(255,100,0);
    cursor: pointer;
  }

  .fa-comments: hover {
    color : rgb(0,100, 255);
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
    width : 40px;
    height : 40px;
  }
  .writer-img {
    width : 50px;
    height : 50px;
  }
  

  .cardbox .float-right a:hover{
    background: var(--white) 
  }
 
  .cardbox-comment {
    padding : 16px;
    margin-top : 2em;
    margin-bottom : 2em;
  }
  
  .cardbox .cardbox-item {
      position: relative;
     
  }

  .cardbox .cardbox-item img{
    
  }

  .cardbox-base ul{
   margin: 10px 0px 10px -20px!important; 
   display: inline-block;
  }

  .cardbox-base li {
    list-style: none;
    margin: 0px 0px 0px -8px ;
    padding: 0px 0px 0px 0px ;
    display: inline-block;
  }
  
  
  .cardbox-base li {
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
  }

  .cardbox-base li a em{
   font-size: 14px;
   color: #8d8d8d;
   position: relative;
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
  
  table {
    width : 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
  }

 


  td {
    vertical-align:top;

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
  }
  
  
  .d-flex{
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


  @media(max-width: 1500px)  {
   
  }
`