import React from 'react'
import Axios from 'axios'

export function communityLikeGet(board_id) {
    const result = Axios.post('/api/community/like', board_id)
    .then(response => response.data)

    return {
        type : 'COMMUNITY_LIKE_GET',
        payload : result
    }
}

export function communityLikeUpdate(likeInfo) {
    const result = Axios.post('/api/community/likeUpdate', likeInfo)
    .then(response => response.data)

    return {
        type : 'COMMUNITY_LIKE_UPDATE',
        payload : result
    }
}