import Axios from 'axios'

export function postAll () {
    
    const result = Axios.get('/api/post/all')
    .then(response => response.data)
    return {
        type : 'POST_ALL',
        payload : result
    }
}

export function homePost (){
    const result = Axios.get('/api/post/homepost')
    .then(response => response.data)

    return {
        type : 'HOMEPOST_ALL',
        payload : result
    }
}

export function homeDetail(postid){
    const result = Axios.post('/api/post/homedetail', postid)
    .then(response => response.data)
     

    return{
        type : 'HOMEPOST_DETAIL',
        payload : result
    }
}

export function communityUpload(uploadFile){
    const result = Axios.post('/api/community/upload', uploadFile)
    .then(response => response.data)
     

    return{
        type : 'COMMUNITY_UPLOAD',
        payload : result
    }
}

export const communityDetail = async (postid) => {
    const result = await Axios.post('/api/community/detail', postid)
    .then(response => response.data)

    return{
        type : 'COMMUNITY_DETAIL',
        payload : result
    }
}

