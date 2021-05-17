import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentNumber}) => {
    //page번호를 지정할 리스트 생성
    var pageNumbers = [];
    //1 부터 Math.ceil 올림을 사용해서 총개수/한페이지당 보여질 개수 만큼 페이지 번호를 list에 추가
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    
//나누어진 페이지를 5개 씩 나누기 위한 변수
const [pageOfPage , setPageOfPage] = useState(1);
const [Per, setPer] = useState(5);
var LastPageIndex = pageOfPage * Per;
var FirstPageIndex = LastPageIndex - Per;

const lastPageOfPage = Math.ceil(totalPosts/postsPerPage/Per);

//이전이나 다음버튼을 누를 경우
useEffect(() => {
    LastPageIndex = pageOfPage * Per;
    FirstPageIndex = LastPageIndex - Per;
    paginate(FirstPageIndex + 1);
},[pageOfPage])


if(pageNumbers.length > 5){
    pageNumbers = pageNumbers.slice(FirstPageIndex , LastPageIndex)
}

const onNextHandler = () => {
    setPageOfPage(pageOfPage + 1);
}

const onBackHandler = () => {
    setPageOfPage(pageOfPage - 1);
}

return (
    <PaginationStyle>
    <table>
        <tbody>
            <tr className="page-item row ">
            {pageOfPage > 1 ? <td className="page-link" onClick={onBackHandler}>
            <i className="fas fa-angle-left"></i> 
            </td> : <></>} 
            {pageNumbers.map(number => (
                    <td key={number} onClick={() => paginate(number)} 
                        className={number !== currentNumber ? "page-link" : "page-link c"}>
                        {number}
                    </td>
            ))}
            {lastPageOfPage > pageOfPage ? <td className="page-link" onClick={onNextHandler}>
                <i className="fas fa-angle-right"></i> 
            </td> : <></>}
            </tr>
        </tbody>   
    </table>
</PaginationStyle>  
)
};

const PaginationStyle = styled.header`
    font-family: Noto Sans CJK KR;
    .fas {
       font-size : 1rem;
    }

    .fas: hover {
        color : var(--white);
    }

   .page-item {   
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .page-link.c {
        color : var(--white);
        background : var(--FontGrey);
    }

    .page-link {
        cursor : pointer;
        color : var(--FontDarkGrey);   
    }

    .page-link: hover {
        color : var(--white)
    }
`

export default Pagination;

