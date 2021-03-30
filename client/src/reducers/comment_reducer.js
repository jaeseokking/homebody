export default function(state = {}, action){
    switch (action.type){
        case 'HOME_REVIEWS' :
            return {...state, homereviews : action.payload}
            break;

        case 'HOME_COMMENT' :
            return {...state, homecomment : action.payload}
            break;
            
        case 'COMMUNITY_COMMENT' :
            return {...state, communicycomment : action.payload}
            break;

        default:
            return state;
    }
}

