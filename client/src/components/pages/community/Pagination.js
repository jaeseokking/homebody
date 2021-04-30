import React from 'react';
import styled from 'styled-components';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentNumber}) => {
    //page번호를 지정할 리스트 생성
    const pageNumbers = [];
    //1 부터 Math.ceil 올림을 사용해서 총개수/한페이지당 보여질 개수 만큼 페이지 번호를 list에 추가
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    console.log(currentNumber)
    return (
        <PaginationDesign>
        <table>
            <tbody>
                <tr className="page-item row ">
                {pageNumbers.map(number => (
                        <td key={number} onClick={() => paginate(number)} 
                            className={number !== currentNumber ? "page-link" : "page-link c"}>
                            {number}
                        </td>
                ))}
                </tr>
            </tbody>   
        </table>
    </PaginationDesign>
        
    )
};

const PaginationDesign = styled.header`
    font-family: Noto Sans CJK KR;

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

