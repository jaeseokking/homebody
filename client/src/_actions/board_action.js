import Axios from 'axios'

export function homeAll (){
    const result = Axios.get('/api/home/all')
    .then(response => response.data)

    return {
        type : 'HOME_ALL',
        payload : result
    }
}

export function homeDetail(homeid){
    const result = Axios.post('/api/home/detail', homeid)
    .then(response => response.data)
     

    return{
        type : 'HOME_DETAIL',
        payload : result
    }
}

export function communityAll () {
    
    const result = Axios.get('/api/community/all')
    .then(response => response.data)
    
    return {
        type : 'COMMUNITY_ALL',
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

export const communityUpdate = async (formdata) => {
    const result = await Axios.post('/api/community/update', formdata)
    .then(response => response.data)

    return{
        type : 'COMMUNITY_UPDATE',
        payload : result
    }
}

export const communityDelete =  (postid) => {
    const result = Axios.post('/api/community/delete', postid)
    .then(response => response.data)

    return{
        type : 'COMMUNITY_DELETE',
        payload : result
    }
}

export const communitySearch =  (searchword) => {
    const result = Axios.post('/api/community/search', searchword)
    .then(response => response.data)

    return{
        type : 'COMMUNITY_SEARCH',
        payload : result
    }
}

