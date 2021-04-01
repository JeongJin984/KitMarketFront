import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
            <Col xs="11" style={{ marginTop: '1%'}}>
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
                  <Nav className="mr-auto" style={{ marginLeft:'-6%'}} navbar>
                    <NavItem>
                      <NavLink href="/helloworld">공모전　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/helloworld">조별과제　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/helloworld">OTT　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/helloworld">스터디　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/helloworld">공동구매　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/helloworld">카풀/택시　　</NavLink>
                    </NavItem>
                  </Nav>
                    <>
                      <Button outline color="primary">
                        Signup
                      </Button>{' '}
                      <Button color="link"> Login</Button>
                    </>
                  <Nav className="ml-auto" navbar>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={togglebutton}>
                      <DropdownToggle split color="light">
                      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" />
                      <link rel="stylesheet" href="style.css" />
                      <a className="user-btn" href="#">
                          <i className="fas fa-user" style={{color:'black'}}/>
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
                </Collapse>
              </Navbar>
              <div>{children}</div>
            </Col>
          </Row>
          <Row>
            <Col xs="1"> </Col>
            <Col xs="11">
              <Row>
                <Col xs="5"></Col>
                <Col xs="1">
                  <ButtonToolbar>
                    <ButtonGroup
                      style={{
                        marginLeft: '28%',
                        marginTop: '40%',
                        marginBottom: '10%',
                      }}
                    >
                      <Button outline color="secondary">
                        1
                      </Button>
                      <Button outline color="secondary">
                        2
                      </Button>
                      <Button outline color="secondary">
                        3
                      </Button>
                      <Button outline color="secondary">
                        4
                      </Button>
                      <Button outline color="secondary">
                        5
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs="1"></Col>
      </Row>
    </div>
  );
};

export default AppLayout;
