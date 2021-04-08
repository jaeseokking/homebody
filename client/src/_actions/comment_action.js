import React from 'react'
import Axios from 'axios'

export function homeCommentGet(home_id) {
    const result = Axios.post('/api/home/getcomment', home_id)
    .then(response => response.data)

    return {
        type : 'HOME_COMMENT_GET',
        payload : result
    }
}


export function homeCommentUplaod(postid) {
    const result = Axios.post('/api/home/uploadcomment', postid)
    .then(response => response.data)


    return {
        type : 'HOME_COMMENT_UPLOAD',
        payload : result
    }
}


export function uploadComment(comment) {
    const result = Axios.post('/api/community/uploadcomment', comment)
    .then(response => response.data)


    return {
        type : 'COMMUNITY_COMMENT_UPLOAD',
        payload : result
    }
}



