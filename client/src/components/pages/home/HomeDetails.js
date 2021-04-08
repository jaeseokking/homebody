import React, { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { homeDetail } from '../../../_actions/board_action';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import HomeCommentsGet from './HomeCommentsGet';
import Comment from './HomeCommentUpload';
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
            <HeaderDetails key={list.home_id} className="container-fluid align-items-center">
                        <h1 className="display-1 font-weight-bold">{list.headertitle}</h1>
                        <h4 className="display-5">{list.headersubtitle}</h4>
                        <p>{list.headertext}</p>
                        {/* Social Icons */}
                        <div className="container mt-5 align-times-right">
                            <div className="row justify-content-between">
                                <div className="col-2">
                                    <i className="fab fa-facebook-f"/>   
                                </div>
                                <div className="col-2">
                                    <i className="fab fa-twitter"/>   
                                </div>
                                <div className="col-2">
                                    <i className="fab fa-google-plus-g"/>   
                                </div>
                                <div className="col-2">
                                    <i className="fab fa-reddit"/>   
                                </div>
                                <div className="col-2">
                                    <i className="fab fa-whatsapp"/>   
                                </div>
                                <div className="col-2">
                                    <i className="fab fa-facebook-messenger"/>   
                                </div> 
                            </div>
                        </div>
                    </HeaderDetails> 
                     {/* Nav Link */}
                    <div className="container">
                        <ul className="nav nav-tabs">
                           {/* About Place Link */}
                           <li className="nav-item">
                               {/* 부트스트랩에서는 Link to 작용하지 않음 */}
                                <a className="nav-link active" href="#aboutPlace" 
                                role="tab" data-toggle="tab">About Place</a>  
                            </li> 
                           <li className="nav-item">
                                <a className="nav-link" href="#comments" 
                                role="tab" data-toggle="tab">comments</a>  
                            </li> 
                            {/* Map Link*/}
                           <li className="nav-item">
                                <a className="nav-link" href="#postcomment" 
                                role="tab" data-toggle="tab">Post a comment</a>  
                            </li> 
                        </ul>
                        {/* Tab Pane */}
                        <div className="tab-content mb-5">
                            {/* About Place Tab */}
                            <div className="tab-pane in active text-center mt-5" 
                                role="tabpanel"
                                id="aboutPlace">
                                <h2 className="mb-3">{list.title}</h2>
                                <p>{list.description}</p>
                                <img className="img-thumbnail img-fluid"
                                src={"/images/" + list.image} alt={list.title}/>
                            </div>
                            {/* comments */}
                            <div className="tab-pane " id="comments" role="tabpanel">
                                <HomeCommentsGet/>
                            </div>
                              {/* Map */}
                              <div className="tab-pane " id="postcomment" role="tabpanel">
                                <HomeCommentUpload/>
                            </div>
                        </div>
                    </div>    
                           
        </div>
    )
}
export default HomeDetails;

const HeaderDetails = styled.header`
    background: linear-gradient(rgba(150, 150, 150), rgba(255, 255, 255));
    height: 70vh;
    text-transform: uppercase;
    color: var(--white);
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
        margin-bottom: 10%;
        color: var(--FontDarkGrey);

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
    h1  {
        color: var(--white);
        font-size : 10vw;
    }
    h4 {
        color: var(--white);
        font-size : 6vw;  
    }

    p {
        color : var(--white);
    }

    tap-pane {
        font-size : 10%;
    }
}
  
`;

//linear-gradient(아래색, 위색) 그라데이션