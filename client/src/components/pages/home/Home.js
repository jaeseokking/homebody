import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link , withRouter } from 'react-router-dom';
import { homeAll } from '../../../_actions/board_action';
import styled from 'styled-components';

function Home() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(homeAll())
    }, [])

    const board = useSelector(state => state.board);
    const home = board.home ?? {};
    const list = home.list ?? [];
    

    return (
    <HomeDesign>  
         <div className="row">
        {list.map((val) => {
             return <div key={val.home_id} className="card-container mx-auto">
                <div className="card ml-2 mr-5 my-5 mx-3" position = 'center' style={{ width: '20rem'}} >
                  <img src={"/images/"+val.image} alt={val.headertitle} className="card-img"/>
                  <div className="card-body">
                      <h3   className="card-title text-uppercase">{val.headertitle}</h3>
                      <h5 className="card-title">{val.headersubtitle}</h5>
                      <p className="card-text">{val.headertext}</p>
                      <Link to = {`/details/${val.home_id}`} className="btn btn-outline-secondary text-uppercese">
                            More Info
                      </Link>
                  </div>      
              </div> 
              </div> 
              })}
        </div>
        </HomeDesign> 
    )
}

const HomeDesign = styled.header`
    background: linear-gradient(rgba(240, 240, 240), rgba(255, 255, 255));
    text-transform: uppercase;
    text-align: center;

   
    .card {
        border-radius: 10px;
        overflow: hidden; 
        box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);

    }
`

export default withRouter(Home);