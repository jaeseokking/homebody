import { combineReducers } from 'redux'
import userReducer from './user_reducer';
import boardReducer from './board_reducer';
import commentReducer from './comment_reducer';
import likeReducer from './like_reducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session';

//로그인 구현을 위해서 user만 session에 저장
const persistConfig = {
    key: "root",
    storage,
    whitelist : ["user"] 
}

//여러 리듀서을 하나로 합쳐서 관리하기 위해서 만듦
const rootReducer = combineReducers({
    user : userReducer,
    board : boardReducer,
    comment : commentReducer,
    like : likeReducer
})

export default persistReducer(persistConfig, rootReducer);