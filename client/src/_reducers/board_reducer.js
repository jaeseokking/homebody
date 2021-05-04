export default function(state = {}, action){
    switch (action.type){
        case 'HOME_ALL' :
            return {...state, home : action.payload}
            break;

        case 'HOME_DETAIL' :
            return {...state, detail : action.payload}
            break;

        case 'COMMUNITY_ALL' :
            return {...state, community : action.payload}
            break;

        case 'COMMUNITY_UPLOAD' :
            return {...state, upload : action.payload}
            break;
        
        case 'COMMUNITY_DETAIL' :
            return {...state, detail : action.payload}        
            break;

        case 'COMMUNITY_UPDATE' :
            return {...state, update : action.payload}        
            break;
    
        case 'COMMUNITY_DELETE' :
            return {...state, delete : action.payload}        
            break;

        case 'COMMUNITY_SEARCH' :
            return {...state, community : action.payload}        
            break;   

        default:
            return state;
    }
}

