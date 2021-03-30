export default function(state = {}, action){
    switch (action.type){
        case 'POST_ALL' :
            return {...state, postlist : action.payload}
            break;

        case 'HOMEPOST_ALL' :
            return {...state, homepostlist : action.payload}
            break;

        case 'HOMEPOST_DETAIL' :
            return {...state, homepostdetail : action.payload}
            break;

        case 'COMMUNITY_UPLOAD' :
            return {...state, communityupload : action.payload}
            break;
        
        case 'COMMUNITY_DETAIL' :
            return {...state, communitydetail : action.payload}        

        default:
            return state;
    }
}

