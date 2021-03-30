import React from 'react'
import Axios from 'axios'

export function homeReviews(postid) {
    const result = Axios.post('/api/home/reviews', postid)
    .then(response => response.data)

    return {
        type : 'HOME_REVIEWS',
        payload : result
    }
}


export function homeComment(postid) {
    const result = Axios.post('/api/home/comment', postid)
    .then(response => response.data)


    return {
        type : 'HOME_COMMENT',
        payload : result
    }
}


export function uploadComment(comment) {
    console.log('uploadaction')
    const result = Axios.post('/api/community/uploadcomment', comment)
    .then(response => response.data)


    return {
        type : 'COMMUNITY_COMMENT',
        payload : result
    }
}



