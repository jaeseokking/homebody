import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { communityAll, communitySearch } from '../../../_actions/board_action';
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
        function CurrentPosts(list) {
          let currentPosts = 0;
          //slice 첫번째인자부터 마지막인자-1 까지 복사본을 새롭게 생성
          currentPosts = list.slice(indexOfFirst, indexOfLast);
          return currentPosts;
        }

        const [searchWord, setSearchWord] = useState();
        const SearchWord = (event) => {
            console.log(event.target.value)
            setSearchWord(event.target.value);
        }

        const onSearchHandler = () => {
            const body = {
                searchword : searchWord
            }
            dispatch(communitySearch(body))
        }

        const onPostsPerPage = (event) => {
            setPostsPerPage(event.target.value);
            setCurrentPage(1);
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
                            <div className="selectpages row">
                                <span className="text">Show rows</span>
                                <select defaultValue={"5"} className="rowpages form-control" id="pages" onChange={onPostsPerPage}>
                                    <option value="default" disabled>개수 선택</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                                 <table className="table table-striped mx-right">
                                    <thead>   
                                        <tr>
                                        <th width='30' scope="col">ID</th>
                                        <th scope="col">Title</th>
                                        <th width='40' scope="col">Writer</th>
                                        <th width='200'scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CurrentPosts(list).map((val) => {
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
                                    <div className="search-form">
                                        <div className="fa fa-search search-btn" id="s-btn" onClick={onSearchHandler}></div>
                                        <input type="text" onChange={SearchWord} 
                                        className="form-control mx-auto" id="searchinput" placeholder="검색어를 입력하세요."/>
                                    </div>
                                    <div className="pagenumber mt-3">
                                            <Pagination postsPerPage={postsPerPage} 
                                            totalPosts={list.length} 
                                            paginate={setCurrentPage}
                                            currentNumber={currentPage}></Pagination>
                                    </div>
                                </div>
                            <div className="tab-pane" id="postboard" role="tabpanel">
                                  <PostBoard/>
                            </div>
                        </div>
                    </div>                       
                </HeaderDetails> 
    )
    

}

const HeaderDetails = styled.header`  
    font-family: Noto Sans CJK KR;
    .selectpages {
        display : relative;
    }

    span{
        display : absolute;
        margin-left : auto;
        margin-top :7px;
    }

    select {
        width : 100px;
        display : block;
        margin-right : 20px;

    }


    .search-form {
        margin-top : -30px;
    }

    .search-form .form-control {
        padding-left: 1rem;
        max-width : 300px;
    }
     
    .search-form .search-btn {
        position: absolute;
        display: inline-block;
        line-height: 2.375rem;
        color: var(--FontGrey);
    }

    #s-btn {
        cursor : pointer;
        padding-right : 1px;
        position: relative;
        top: 38px;
        left : 8em;
      }
        
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
