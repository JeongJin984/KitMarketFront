import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';


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
  ButtonGroup,
  ButtonToolbar,
} from 'reactstrap';


const AppLayout = ({ children }) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);
  const togglebutton = () => setOpen(!dropdownOpen);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, []);

  const onClickSignUp = () => {
    router.push('/signup');
  };

  const onClickLogIn = () => {
    router.push('/login');
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
                  <Nav className="mr-auto" style={{ marginLeft: '-6%' }} navbar>
                    <NavItem>
                      <Link
                        href={{
                          pathname: '/category',
                          query: { category: 'contestList' },
                        }}
                        as="/category/"
                      >
                        공모전　　
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link style={{ textDecoration: 'none' }}
                        href={{
                          pathname: '/helloworld',
                        }}
                        //as="/category/"
                      >
                        조별과제　　
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link
                        href={{
                          pathname: '/helloworld',
                        }}
                        //as="/category/"
                      >
                        OTT　　
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link
                        href={{
                          pathname: '/category',
                          query: { category: 'studyList' },
                        }}
                        as="/category/"
                      >
                        스터디　　
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link
                        href={{
                          pathname: '/helloworld',
                        }}
                        //as="/category/"
                      >
                        공동구매　　
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link
                        href={{
                          pathname: '/category',
                          query: { category: 'carPoolList' },
                        }}
                        as="/category/"
                      >
                        카풀/택시　　
                      </Link>
                    </NavItem>
                  </Nav>
                  {loggedIn ? (
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
                          <DropdownItem>회원정보</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>내 모임 현황</DropdownItem>
                          <DropdownItem>내 모임 신청 현황</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>신청 대기 중</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>로그아웃</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </Nav>
                  ) : (
                    <>
                      <Button outline color="primary" onClick={onClickSignUp}>
                        Signup
                      </Button>{' '}
                      <Button color="link" onClick={onClickLogIn}>
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
    </div>
  );
};

export default AppLayout;
