import React, { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { homeDetail } from '../../../_actions/board_action';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import HomeCommentsGet from './HomeCommentsGet';
import HomeCommentUpload from './HomeCommentUpload';

function HomeDetails (){
    let { home_id } = useParams();
    
    const body = {
        home_id : home_id
    }
    //console.log(postid)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(homeDetail(body))
    }, [])
   
    const detail = useSelector(state => state.board.detail ?? {});
    const list = detail.list ?? [];

    return (
        <div>  
            <Header key={list.home_id} className="header container-fluid align-items-center">
                <h1 className="display-1 font-weight-bold">{list.headertitle}</h1>
                <h4 className="display-5">{list.headersubtitle}</h4>
                <p>{list.headertext}</p>
            </Header> 
            {/* Nav의 태그 */}
            <div className="container">
            <Nav>
                <ul className="nav nav-tabs">
                    {/* 상단 태그 */}
                    <li className="nav-item">
                        {/* 부트스트랩에서는 Link to 작용하지 않음 */}
                        <a className="nav-link active" href="#news" 
                        role="tab" data-toggle="tab">News</a>  
                    </li> 
                    <li className="nav-item">
                        <a className="nav-link" href="#comments" 
                        role="tab" data-toggle="tab">Comments</a>  
                    </li> 
                    {/* 게시글 댓글 등록 태그*/}
                    <li className="nav-item">
                        <a className="nav-link" href="#postcomment" 
                        role="tab" data-toggle="tab">Post a comment</a>  
                    </li> 
                </ul>
               
                {/* 탭 누를시 보여줄 내용들 */}
                <div className="tab-content mb-5">
                    {/* News */}
                    <div className="tab-pane in active text-center mt-5" 
                        role="tabpanel"
                        id="news">
                        <h2 className="mb-3">{list.title}</h2>
                        <p>{list.description}</p>
                        <img className="img-thumbnail img-fluid"
                        src={"/images/" + list.image} alt={list.title}/>
                    </div>
                    {/* comments */}
                    <div className="tab-pane " id="comments" role="tabpanel">
                        <HomeCommentsGet/>
                    </div>
                        {/* postacomment */}
                        <div className="tab-pane " id="postcomment" role="tabpanel">
                        <HomeCommentUpload/>
                    </div>
                </div>
                </Nav>
            </div>                     
        </div>
    )
}
export default HomeDetails;

const Header = styled.header`
    font-family: Noto Sans CJK KR;

    background: linear-gradient(rgba(242, 241, 236), rgba(255, 255, 255));
    height: 50vh;
    text-align: center;

 
    
    h1 {
        padding-top: 10%;
        color: var(--FontDarkGrey);
    }

    h4 {
        color: var(--FontDarkGrey);
    }

    p {
        padding-left : 10%;
        padding-right: 10%;
        color: var(--mainDark);
    }

    @media(max-width: 760px) {
        
        h1  {
            font-size : 9vw;
        }

        h4 {
            font-size : 3vw;  
        }

        height : 60vw;

    }
  
`;

const Nav = styled.header `
    font-family: Noto Sans CJK KR;

    .nav-link {
        color: var(--FontGrey);
    }

    .nav-link : focus {
        color: var(--FontDarkGrey);
    }
`

