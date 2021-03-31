import React, { useCallback, useState } from 'react';
import Link from 'next/link';

import styled, { css } from 'styled-components';

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
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Jumbotron,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
} from 'reactstrap';

const AppLayout = ({ children }) => {
  const [dropdownOpen, setOpen] = useState(false);

  const togglebutton = () => setOpen(!dropdownOpen);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Row>
        <Col xs="1"></Col>
        <Col xs="10" style={{ marginTop: '1%' }}>
          <Row>
            <Col xs="1">
              <img
                resizemode={'cover'}
                style={{ width: '170%' }}
                src="https://cdn.logo.com/hotlink-ok/logo-social.png"
                alt="BigCo Inc. logo"
              />
            </Col>
            <Col xs="11" style={{ marginTop: '1%' }}>
              <Navbar className="Navbar" color="light" light expand="md">
                <NavbarBrand style={{ marginRight: '5%' }} href="/">
                  프로젝트 가제
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink href="/components/">공모전　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/components/">조별과제　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/components/">OTT　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/components/">스터디　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/components/">공동구매　　</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/components/">카풀/택시　　</NavLink>
                    </NavItem>
                  </Nav>
                  <Nav className="ml-auto" navbar>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={togglebutton}>
                      <Button id="caret" color="light"></Button>
                      <DropdownToggle split color="light" />
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
            <Col xs="5"></Col>
            <Col xs="2">
              <p></p>
              <ButtonToolbar>
                <ButtonGroup style={{ marginTop: '15%', marginBottom: '10%' }}>
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
            <Col xs="5"></Col>
          </Row>
        </Col>
        <Col xs="1"></Col>
      </Row>
    </div>
  );
};

export default AppLayout;
