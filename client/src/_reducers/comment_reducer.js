export default function(state = {}, action){
    switch (action.type){
        case 'HOME_COMMENT_GET' :
            return {...state, comments : action.payload}
            break;

        case 'HOME_COMMENT_UPLOAD' :
            return {...state, upload : action.payload}
            break;
            
        case 'COMMUNITY_COMMENT_UPLOAD' :
            return {...state, communicycomment : action.payload}
            break;

        default:
            return state;
    }
}

