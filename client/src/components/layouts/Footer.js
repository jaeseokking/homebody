import React from 'react'
import styled from 'styled-components';

function Footer() {
    return (
        //부트스트랩 클래스정의
        <FooterContainer className="main-footer">
            <div className="footer-middle">
                <div className="container">
                    {/* 행으로 정렬 */}
                    <div className="row">
                        {/* Colum1 */}
                        {/* 중간크기 3 작은크기 6 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>Contact Us</h4>
                            <ul className="list-unstyled">
                                <li>JaeSeok</li>
                                <li>Main st ssuggogae 34 </li>
                                <li>phone: 010-5124-2934</li>
                            </ul>
                        </div>
                        {/* Colum2*/}
                        <div className="col-md-3 col-sm-6">
                            <h4>unkown</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">----------</a></li>
                                <li><a href="/">----------</a></li>
                                <li><a href="/">----------</a></li>
                                <li><a href="/">----------</a></li>
                            </ul>
                        </div>
                        {/* Colum3 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>unkown</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">----------</a></li>
                                <li><a href="/">----------</a></li>
                                <li><a href="/">----------</a></li>
                                <li><a href="/">----------</a></li>
                            </ul>
                        </div>
                        {/* Colum4 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>unkown</h4>
                            <ul className="list-unstyled">
                                <li><a href="/">----------</a></li>
                                <li><a href="/">----------</a></li>
                                <li><a href="/">----------</a></li>
                                <li><a href="/">----------</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Footer Bottm */}
                    <div className="footer-bottom">
                        {/* 중앙배치 */}
                        <p className="text-xs-center">
                            &copy;{new Date().getFullYear()} Community App - All Right Reserved
                        </p>
                    </div>
                </div>
            </div>
        </FooterContainer>
    )
}
export default Footer;

const FooterContainer = styled.footer`
    font-family: Noto Sans CJK KR;

    .on-footer{
        height: 20vh;
    }
    .footer-middle {
        background: var(--FootBG);
        padding-top: 3.5rem;
        color : var(--white)   
    }
    .footer-bottom{
        padding-top: 3rem;
        padding-bottom: 2rem;
    }
    ul li a {
        color: var(--white);
    }

    ul li a :hover {
        color : var(--white);
    }
`;