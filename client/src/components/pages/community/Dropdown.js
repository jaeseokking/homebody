import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { communityDelete } from '../../../_actions/board_action';


function Dropdown ({boardWriter, history}) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const board = useSelector(state => state.board);
    const login = user.login ?? {};
    const loginUserNickname = login.nickname ?? "";
    const body = {
        board_id : board.detail.list[0].board_id
    }

    const onDeleteHandler = () => {
        const result = window.confirm('삭제하시겠습니까?');
        if(result){
            dispatch(communityDelete(body)).then(response => {
                if(response.payload.Success){
                    alert('삭제성공');
                    history.push('/community'); 
                }else{
                    alert('삭제실패');
                }
            })
        }else{
            return;
        }
    }
    //로그인한 유저와 게시글을 올린 유저가 같을 경우 드롭다운을 생성
    if(loginUserNickname === boardWriter){
        return (
            <div>
                <div className="dropdown float-right">
                    <button className="btn" type="button" 
                    data-toggle="dropdown">
                    <em className="fa fa-ellipsis-h"></em>
                    </button>
                    <div className="dropdown-menu dropdown-scale dropdown-menu-right"
                        role="menu">
                       <Link to="/community/update"><div className="dropdown-item" >update</div></Link>
                       <div onClick={onDeleteHandler} className="dropdown-item" >delete</div> 
                        </div>
                </div>
            </div>
        )
    }else{
        return(
            <>
                {/* 일치하지 않을 경우 아무것도 렌더링하지 않음 */}
            </>
        )
    }
   
}

export default withRouter(Dropdown);