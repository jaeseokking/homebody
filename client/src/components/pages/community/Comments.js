import React from 'react';

const Comments = ({ list }) => {
  return (
    <>
  {list.map((val) => {
    const profile = btoa(String.fromCharCode(...new Uint8Array(val.profile.data))) ;
    return <tr key={val.comment_id}> 
            <td align='center' width="15%"> 
                <img className="user-img img-fluid rounded-circle" src={profile ? `data:image/png;base64,${profile}` : '/default.png'}  alt="Image"/>
                <div className="nickname">{val.nickname}</div>
            </td> 
                <td className="comment-td" width="85%"> 
                <p>{val.comment}</p>
            </td>
            </tr>
              })}
  </>
  );
};
export default Comments;