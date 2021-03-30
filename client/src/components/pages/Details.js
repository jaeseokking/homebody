import React, { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { homeDetail } from '../../actions/post_action';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Reviews from '../Reviews';
import Comment from '../Comment';

function Details (){
    let { postid } = useParams();
    
    const body = {
        postid : postid
    }
    //console.log(postid)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(homeDetail(body))
    }, [])
   
    const posthome = useSelector(state => state.post.homepostdetail ?? {});
    const list = posthome.list ?? [];

    return (
        <div>  
            <HeaderDetails key={list.id} className="container-fluid align-items-center">
                        <h1 className="display-1 font-weight-bold">{list.headertitle}</h1>
                        <h4 className="display-5">{list.headersubtitle}</h4>
                        <p>{list.headerText}</p>
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
                                <a className="nav-link" href="#reviews" 
                                role="tab" data-toggle="tab">Reviews</a>  
                            </li> 
                            {/* Map Link*/}
                           <li className="nav-item">
                                <a className="nav-link" href="#comment" 
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
                                src={"/images/" + list.img} alt={list.title}/>
                            </div>
                            {/* Reviews */}
                            <div className="tab-pane " id="reviews" role="tabpanel">
                                <Reviews/>
                            </div>
                              {/* Map */}
                              <div className="tab-pane " id="comment" role="tabpanel">
                                <Comment/>
                            </div>
                        </div>
                    </div>    
                           
        </div>
    )
}
export default Details;

const HeaderDetails = styled.header`
    background: linear-gradient(rgba(109, 109, 109), rgba(255, 255, 255));
    height: 70vh;
    text-transform: uppercase;
    color: var(--white);
    text-align: center;

    h1 {
        padding-top: 10%;
        color: var(--FontGrey);
    }

    h4 {
        color: var(--FontGrey);
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
        color: var(--mainWhite);
    }
}
  
`;

//linear-gradient(아래색, 위색) 그라데이션