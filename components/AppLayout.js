import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const NavStyle = styled.nav`
  a {
    background-color: none;
    color: #7a7a79;
    padding: 0.5rem;
    text-decoration: none;

    &[aria-current] {
      background-color: none;
      color: none;
    }
  }
`;

import {
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  ButtonDropdown,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../reducer/user';
import Cookie from 'universal-cookie';
import axios from 'axios';

const AppLayout = ({ children }) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  var cookie = new Cookie();

  const toggle = () => setIsOpen(!isOpen);
  const togglebutton = () => setOpen(!dropdownOpen);
  const onClickProfile = () => {
    router.push('/profile');
  };
  const onClickSignUp = () => {
    router.push('/signup');
  };

  const onClickLogIn = () => {
    router.push('/login');
  };

  const onClickLogOut = () => {
    dispatch(logoutRequest());
  };

  return (
    <div>
      <Row>
        <Col xs="1"></Col>
        <Col xs="10" style={{ marginTop: '1%' }}>
          <Row>
            <Col xs="1">
              <img
                resizemode={'cover'}
                style={{ marginLeft: '30%', width: '80%' }}
                src="/images/logo.png"
                alt="KnI logo"
              />
            </Col>
            <Col xs="11" style={{ marginTop: '1%' }}>
              <Navbar className="Navbar" color="light" light expand="md">
                <NavbarBrand href="/">
                  <img
                    resizemode={'cover'}
                    style={{ width: '40%' }}
                    src="/images/kni.png"
                    alt="KnI"
                  />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                  <NavStyle>
                    {isLoggedIn ? (
                      <Nav
                        className="mr-auto"
                        style={{ marginLeft: '-6%' }}
                        navbar
                      >
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/board/contest',
                            }}
                          >
                            공모전　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/helloworld',
                            }}
                          >
                            조별과제　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/helloworld',
                            }}
                          >
                            OTT　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/board/study',
                            }}
                          >
                            스터디　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/helloworld',
                            }}
                          >
                            공동구매　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/board/carPool',
                            }}
                          >
                            카풀/택시　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/board/carPool',
                            }}
                          >
                            마감　　
                          </Link>
                        </NavItem>
                      </Nav>
                    ) : (
                      <Nav
                        className="mr-auto"
                        style={{ marginLeft: '-6%' }}
                        navbar
                      >
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/login',
                            }}
                          >
                            공모전　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/login',
                            }}
                          >
                            조별과제　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/login',
                            }}
                          >
                            OTT　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/login',
                            }}
                          >
                            스터디　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/login',
                            }}
                          >
                            공동구매　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/login',
                            }}
                          >
                            카풀/택시　　
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link
                            href={{
                              pathname: '/board/carPool',
                            }}
                          >
                            마감　　
                          </Link>
                        </NavItem>
                      </Nav>
                    )}
                  </NavStyle>
                  {isLoggedIn ? (
                    <Nav className="ml-auto" navbar>
                      <ButtonDropdown
                        isOpen={dropdownOpen}
                        toggle={togglebutton}
                      >
                        <DropdownToggle split color="light">
                          <link
                            rel="stylesheet"
                            href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
                          />
                          <link rel="stylesheet" href="style.css" />
                          <a className="user-btn" href="#">
                            <i
                              className="fas fa-user"
                              style={{ color: 'black' }}
                            />
                          </a>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={onClickProfile}>
                            내 프로필 보기
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={onClickLogOut}>
                            로그아웃
                          </DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </Nav>
                  ) : (
                    <>
                      <Button
                        outline
                        color="dark"
                        onClick={onClickSignUp}
                        style={{ marginLeft: '40%' }}
                      >
                        Signup
                      </Button>{' '}
                      <Button color="#00FFFFFF" onClick={onClickLogIn}>
                        Login
                      </Button>
                    </>
                  )}
                </Collapse>
              </Navbar>
              <div>{children}</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ backgroundColor: '#F2F2F2' }}>
        <Col xs="1"></Col>
        <Col xs="2">
        <img
          resizemode={'cover'}
          style={{ width: '60%' , height: '60%', marginTop:"10%", marginLeft:"20%"}}
          src="/images/knilogo.png"
          alt="KnI"
        />   
        </Col>
        <Col xs="2">
        <br />
        <div className="mb-1 text-muted ">남정진(팀장)</div> 
        <div className="mb-1 text-muted ">아키텍쳐 구축</div>
        <div className="mb-1 text-muted ">로그인 인증/ 구현</div>
        <div className="mb-1 text-muted ">skawjdwls@gmail.com</div>
        <br />
        </Col>
        <Col xs="2">
        <br />
        <div className="mb-1 text-muted ">박기남</div> 
        <div className="mb-1 text-muted ">API 개발</div>
        <div className="mb-1 text-muted ">qkrwnlska@gmail.com</div>
        </Col>
        <Col xs="2">
        <br />
        <div className="mb-1 text-muted ">추헌재</div> 
        <div className="mb-1 text-muted ">FrontEnd 개발</div>
        <div className="mb-1 text-muted ">cngjswo@gmail.com</div>
        </Col>
        <Col xs="2">
        <br />
        <div className="mb-1 text-muted ">배지원</div> 
        <div className="mb-1 text-muted ">UI/UX 개발</div>
        <div className="mb-1 text-muted ">1gbae53@gmail.com</div>
        </Col>
        <Col xs="1"></Col>
      </Row>
      <Row style={{ backgroundColor: '#F2F2F2' }}>
        <Col xs="4"></Col>
        <Col xs="4">
          <div className="mb-1 text-muted text-center">금오공과대학교 컴퓨터공학과 창의설계프로젝트 SAT</div>
        </Col>
        <Col xs="4"></Col>
      </Row>
    </div>
  );
};

export default AppLayout;