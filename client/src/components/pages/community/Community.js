import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { communityAll } from '../../../_actions/board_action';
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
        //console.log(list)

        

        return (
        <div className="table-form">
             <HeaderDetails className="container-fluid align-items-center">
                        <h1 className="display-1 font-weight-bold">Community</h1>                        
            </HeaderDetails> 
                     {/* Nav Link */}
                    <div className="container">
                        <ul className="nav nav-tabs">
                           {/* About Place Link */}
                           <li className="nav-item">
                               {/* 부트스트랩에서는 Link to 작용하지 않음 */}
                                <a className="nav-link active" href="#board" 
                                role="tab" data-toggle="tab">board</a>  
                            </li> 
                           {/* Map Link*/}
                           <li className="nav-item">
                                <a className="nav-link" href="#postboard" 
                                role="tab" data-toggle="tab">Post a board</a>  
                            </li> 
                        </ul>
                        {/* Tab Pane */}
                        <div className="tab-content mb-5">
                            {/* About Place Tab */}
                            <div className="tab-pane in active text-center mt-5" 
                                role="tabpanel"
                                id="board">
                                 <table className="table my-5 mx-right">
                                    <thead>
                                        
                                        <tr>
                                        <th width='30' scope="col">ID</th>
                                        <th scope="col">Title</th>
                                        <th width='40' scope="col">Writer</th>
                                        <th width='200'scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((val) => {
                                        return <tr key={val.board_id}>
                                            <td >{val.board_id}</td>
                                            <td><Link to={`/community/details/${val.board_id}`}>{val.title}</Link></td>
                                            <td >{val.writer}</td>
                                            <td >{val.regdate}</td>
                                        </tr>
                                        })}
                                    </tbody>
                                    </table>
                            </div>
                             {/* Map */}
                              <div className="tab-pane " id="postboard" role="tabpanel">
                                  <PostBoard/>
                            </div>
                        </div>
                    </div>    
                         
           
        </div>
    )
    

}

const HeaderDetails = styled.header`
    background: linear-gradient(rgba(240, 240, 240), rgba(255, 255, 255));
    text-transform: uppercase;
    text-align: center;

    h1 {
        padding-top: 5vw;
        color: var(--FontDarkGrey);
    }

    h4 {
        color: var(--FontDarkGrey);
    }

    p {
        padding-left : 10%;
        padding-right: 10%;
        margin-bottom: 10%;
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

.nav-item {
    height: 18.75rem;
}

@media(max-width: 760px) {
    h1, h4 {
        color: var(--FontGrey);
        font-size : 12vw;
    }
    h1 {
        padding-top: 10vw;
    }
}
  
`;

export default Community;
