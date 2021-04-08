export default function(state = {}, action){
    switch (action.type){
        case 'COMMUNITY_LIKE_GET' :
            return {...state, detail : action.payload}
            break;
        case 'COMMUNITY_LIKE_UPDATE' :
            return {...state, result : action.payload}
            break;
                     
        default:
            return state;
    }
}