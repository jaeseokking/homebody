import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NotFoundPage () {
    return (
        <Style>
        <div className="container">
                <div className="col-md-12">
                    <div className="error-comment">
                        <img src="/NotFound.svg" width="150px"/>
                        <h1>404</h1>
                        <h2>Page Not Found</h2>
                        <div>
                            죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
                        </div>
                        <div className="error-actions">
                            <Link to="/" className="btn btn-outline-secondary btn-lg mr-4">
                                &nbsp;Return Home
                            </Link>
                            <Link className="btn btn-outline-secondary btn-lg ml-1">
                                &nbsp;Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Style>
    )
}
export default NotFoundPage ;

const Style = styled.div`
    font-family: Noto Sans CJK KR;
    color : var(--FontDarkGrey);
    h1 {
        font-size : 130px;
    }

    .error-comment {
        padding: 40px 15px;
        text-align : center
    }

    .error-actions {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .btn {
        margin-right: 10px;
    }
`;