import React, { useCallback, useState } from 'react';

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
  UncontrolledDropdown,
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
  ButtonGroup,
  ButtonToolbar,
} from 'reactstrap';

import { useDispatch } from 'react-redux';
import { LOGIN_REQUEST } from '../reducer/user';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: LOGIN_REQUEST,
      data: {
        username: {
          username: e.target.formBasicUsername.value,
          password: e.target.formBasicPassword.value,
        },
      },
    });
  }, []);

  return (
    <Row>
      <Col xs="1"></Col>
      <Col xs="10">
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
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">프로젝트 명</NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink href="/components/">공모전</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/components/">조별과제</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/components/">OTT</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/components/">스터디</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/components/">공동구매</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/components/">카풀/택시</NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      User
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>회원정보</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>내 모임 현황</DropdownItem>
                      <DropdownItem>내 모임 신청 현황</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>신청 대기 중</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>로그아웃</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col xs="1"></Col>
          <Col xs="11" /*child */>
            <div>
              <Jumbotron>
                <h1 className="display-3">Hello, world!</h1>
                <p className="lead">
                  This is a simple hero unit, a simple Jumbotron-style component
                  for calling extra attention to featured content or
                  information.
                </p>
                <hr className="my-2" />
                <p>
                  It uses utility classes for typography and spacing to space
                  content out within the larger container.
                </p>
                <p className="lead">
                  <Button color="primary">Learn More</Button>
                </p>
              </Jumbotron>
            </div>
            <Row>
              <Col xs="3">
                <div>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src="/assets/318x180.svg"
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">Card title</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src="/assets/318x180.svg"
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">Card title</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src="/assets/318x180.svg"
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">Card title</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src="/assets/318x180.svg"
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">Card title</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
            <p></p>
            <Row>
              <Col xs="3">
                <div>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src="/assets/318x180.svg"
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">Card title</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src="/assets/318x180.svg"
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">Card title</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src="/assets/318x180.svg"
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">Card title</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col xs="3">
                <div>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src="/assets/318x180.svg"
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">Card title</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="5"></Col>
              <Col xs="2">
                <p></p>
                <ButtonToolbar>
                  <ButtonGroup>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button>4</Button>
                    <Button>5</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col xs="5"></Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs="1"></Col>
    </Row>
  );
};

export default Home;
