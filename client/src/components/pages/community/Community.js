import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { communityAll } from '../../../_actions/board_action';
import checkdate from '../../../hoc/checkdate';
import Pagination from './Pagination';
import PostBoard from './PostBoard';
import styled from 'styled-components';


function Community () {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(communityAll());
        }, [])

        //초기 랜더링시 값이 없으므로 오류를 처리해줌
        const community = useSelector(state => state.board.community) ?? {} ;
        const list = community.list ?? [] ;

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
          
        return (
             <HeaderDetails>
                    <div className="header container-fluid align-items-center">
                        <h1 className="display-1 font-weight-bold">Community</h1>     
                    </div>                   
                    <div className="container mt-5">
                        <ul className="nav nav-tabs">
                           <li className="nav-item">
                               {/* 부트스트랩에서는 Link to 작용하지 않음 */}
                                <a className="nav-link active" href="#board" 
                                role="tab" data-toggle="tab">Board</a>  
                            </li> 
                           <li className="nav-item">
                                <a className="nav-link" href="#postboard" 
                                role="tab" data-toggle="tab">Post a board</a>  
                            </li> 
                        </ul>

                        <div className="tab-content mb-5">
                            <div className="tab-pane in active text-center mt-1" 
                                role="tabpanel"
                                id="board">
                                 <table className="table table-striped my-5 mx-right">
                                    <thead>   
                                        <tr>
                                        <th width='30' scope="col">ID</th>
                                        <th scope="col">Title</th>
                                        <th width='40' scope="col">Writer</th>
                                        <th width='200'scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPosts(list).map((val) => {
                                        console.log();
                                        return <tr key={val.board_id}>
                                            <td >{val.board_id}</td>
                                            <td><Link to={`/community/details/${val.board_id}`}>{val.title}</Link></td>
                                            <td >{val.writer}</td>
                                            <td >{checkdate(val.regdate) ? val.regdate.substr(10) : val.regdate.substr(0,10) }</td>
                                        </tr>
                                        })}
                                    </tbody>   
                                    </table>
                                    <div className="pagenumber mt-3">
                                            <Pagination postsPerPage={postsPerPage} 
                                            totalPosts={list.length} 
                                            paginate={setCurrentPage}
                                            currentNumber={currentPage}></Pagination>
                                    </div>
                                    
                                </div>
                                
                              <div className="tab-pane " id="postboard" role="tabpanel">
                                  <PostBoard/>
                            </div>
                        </div>
                    </div>                       
                </HeaderDetails> 
    )
    

}

const HeaderDetails = styled.header`  
    font-family: Noto Sans CJK KR;

        
    table {
        width : 100%;
    }

    .nav-link {
        color: var(--FontGrey);
    }

    .nav-link: focus {
        color: var(--FontDarkGrey);
    }

    tbody a {
        color : var(--FontDarkGrey);
        text-decoration: none;
    }


    .header {
        text-transform: uppercase;
    }

    text-align: center;
    
    .header {
        background-image: 
        url("/communityheader.jpeg");
    }

    h1 {
        padding: 70px;
        color: var(--FontDarkGrey);
    }

    h4 {
        color: var(--FontDarkGrey);
    }

    p {
        padding-left : 50%;
        padding-right: 50%;
        color: var(--mainDark);
    }

    i {
        font-size: 1.875rem;
        color: var(--mainDark);
    }

    i: hover {
        color: var(--Blue);
        cursor: pointer;
    }

    @media(max-width: 760px) {
        h1, h4 {
            color: var(--white);
            font-size : 10vw;
        }
        h1 {
            padding: 7vw;
        }

        .header{
            background-size : 200vw;
        }

    }
  
`;



export default Community;
