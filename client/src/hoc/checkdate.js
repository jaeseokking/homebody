import React from 'react'

function checkdate(boarddate) {
    const date = new Date();
    
    const year = date.getFullYear();
    let month;
    let day;
    if(date.getMonth()+1 < 10 ){
        month = '0'+ (date.getMonth()+1)
    }else{
        month = (date.getMonth()+1)
    }

    if(date.getDate() < 10){
        day = '0'+ (date.getDate())
    }else{
        day = date.getDate()
    }
    const currentDate = year+'-'+month+'-'+day;
    return (currentDate === boarddate.substr(0,10));
}

export default checkdate;