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
import { useSelector } from 'react-redux';

const AppLayout = ({ children }) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);

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
                    </Nav>
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
                          <DropdownItem>로그아웃</DropdownItem>
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
    </div>
  );
};

export default AppLayout;
