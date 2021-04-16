import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../store';
import { END } from 'redux-saga';
import axios from 'axios';
import { loadProfileRequest } from '../reducer/user';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Media,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import AppLayout from '../components/AppLayout';
import classnames from 'classnames';

const profile = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { profile } = useSelector((state) => state.user);
  console.log(profile);
  return (
    <AppLayout>
      <Card style={{ marginTop: '2%' }}>
        <CardBody>
          <CardTitle tag="h3">내 프로필</CardTitle>
          <hr />
          <Row>
            <Col xs="5">
              <Media>
                <Media left href="#">
                  <Media
                    object
                    data-src="holder.js/128x128"
                    alt="Generic placeholder image"
                  />
                  {/* 크기조절 해야할듯 */}
                </Media>
              </Media>
            </Col>
            <Col xs="7">
              <br />
              <Row>
                <Col xs="2">
                  <CardText tag="h6" className="mb-2 text-muted">
                    Username
                  </CardText>
                </Col>
                <Col xs="10">
                  <CardText tag="h5">{profile.username}</CardText>
                </Col>
              </Row>
              <hr />
              <br />
              <Row>
                <Col xs="2">
                  <CardText tag="h6" className="mb-2 text-muted">
                    E-mail
                  </CardText>
                </Col>
                <Col xs="10">
                  <CardText tag="h5">{profile.email}</CardText>
                </Col>
              </Row>
              <hr />
              <br />
              <Row>
                <Col xs="2">
                  <CardText tag="h6" className="mb-2 text-muted">
                    Birth
                  </CardText>
                </Col>
                <Col xs="10">
                  <CardText tag="h5">{profile.age}</CardText>
                </Col>
              </Row>
              <hr />
              <br />
              <Row>
                <Col xs="2">
                  <CardText tag="h6" className="mb-2 text-muted">
                    Gender
                  </CardText>
                </Col>
                <Col xs="10">
                  <CardText tag="h5">성별</CardText>
                </Col>
              </Row>
              <hr />
              <br />
              <Row>
                <Col xs="2">
                  <CardText tag="h6" className="mb-2 text-muted">
                    Phone
                  </CardText>
                </Col>
                <Col xs="10">
                  <CardText tag="h5">핸드폰번호</CardText>
                </Col>
              </Row>
              <hr />
              <br />
              <Row>
                <Col xs="2">
                  <CardText tag="h6" className="mb-2 text-muted">
                    KaKao ID
                  </CardText>
                </Col>
                <Col xs="10">
                  <CardText tag="h5">카카오톡아이디</CardText>
                </Col>
              </Row>
              <hr />
              <br />
            </Col>
          </Row>
          <div className="col text-right">
            <Button color="secondary">Edit</Button>
          </div>
          <br />
          <div>
            <Nav tabs>
              <NavItem color="light">
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  만든 모임 현황
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  모임 신청 현황
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => {
                    toggle('3');
                  }}
                >
                  신청 대기 중
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <br />
                <Row>
                  <Col xs="3">
                    <Card body>
                      <Row>
                        <Col xs="8">
                          <CardTitle className="text-left">카테고리</CardTitle>
                        </Col>
                        <Col xs="4" className="col text-right">
                          <Button close />
                        </Col>
                      </Row>
                      <CardTitle tag="h5" className="text-center">
                        제목
                      </CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <br />
                      <Row>
                        <Col xs="5">
                          <CardSubtitle tag="h6" className="mb-2 text-muted ">
                            2020.04.13
                          </CardSubtitle>
                        </Col>
                        <Col xs="7">
                          <CardSubtitle tag="h6" className="mb-2 text-right">
                            1/4
                          </CardSubtitle>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xs="3">
                    <Card body>
                      <Row>
                        <Col xs="8">
                          <CardTitle className="text-left">카테고리</CardTitle>
                        </Col>
                        <Col xs="4" className="col text-right">
                          <Button close />
                        </Col>
                      </Row>
                      <CardTitle tag="h5" className="text-center">
                        제목
                      </CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <br />
                      <Row>
                        <Col xs="5">
                          <CardSubtitle tag="h6" className="mb-2 text-muted ">
                            2020.04.13
                          </CardSubtitle>
                        </Col>
                        <Col xs="7">
                          <CardSubtitle tag="h6" className="mb-2 text-right">
                            1/4
                          </CardSubtitle>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xs="3"></Col>
                  <Col xs="3"></Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <br />
                <Row>
                  <Col xs="3">
                    <Card body>
                      <Row>
                        <Col xs="8">
                          <CardTitle className="text-left">카테고리</CardTitle>
                        </Col>
                        <Col xs="4" className="col text-right">
                          <Button close />
                        </Col>
                      </Row>
                      <CardTitle tag="h5" className="text-center">
                        제목
                      </CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <br />
                      <Row>
                        <Col xs="5">
                          <CardSubtitle tag="h6" className="mb-2 text-muted ">
                            2020.04.13
                          </CardSubtitle>
                        </Col>
                        <Col xs="7">
                          <CardSubtitle tag="h6" className="mb-2 text-right">
                            1/4
                          </CardSubtitle>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xs="3">
                    <Card body>
                      <Row>
                        <Col xs="8">
                          <CardTitle className="text-left">카테고리</CardTitle>
                        </Col>
                        <Col xs="4" className="col text-right">
                          <Button close />
                        </Col>
                      </Row>
                      <CardTitle tag="h5" className="text-center">
                        제목
                      </CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <br />
                      <Row>
                        <Col xs="5">
                          <CardSubtitle tag="h6" className="mb-2 text-muted ">
                            2020.04.13
                          </CardSubtitle>
                        </Col>
                        <Col xs="7">
                          <CardSubtitle tag="h6" className="mb-2 text-right">
                            1/4
                          </CardSubtitle>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xs="3"></Col>
                  <Col xs="3"></Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <br />
                <Row>
                  <Col xs="3">
                    <Card body>
                      <Row>
                        <Col xs="8">
                          <CardTitle className="text-left">카테고리</CardTitle>
                        </Col>
                        <Col xs="4" className="col text-right">
                          <Button close />
                        </Col>
                      </Row>
                      <CardTitle tag="h5" className="text-center">
                        제목
                      </CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <br />
                      <Row>
                        <Col xs="5">
                          <CardSubtitle tag="h6" className="mb-2 text-muted ">
                            2020.04.13
                          </CardSubtitle>
                        </Col>
                        <Col xs="7">
                          <CardSubtitle tag="h6" className="mb-2 text-right">
                            1/4
                          </CardSubtitle>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xs="3">
                    <Card body>
                      <Row>
                        <Col xs="8">
                          <CardTitle className="text-left">카테고리</CardTitle>
                        </Col>
                        <Col xs="4" className="col text-right">
                          <Button close />
                        </Col>
                      </Row>
                      <CardTitle tag="h5" className="text-center">
                        제목
                      </CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <br />
                      <Row>
                        <Col xs="5">
                          <CardSubtitle tag="h6" className="mb-2 text-muted ">
                            2020.04.13
                          </CardSubtitle>
                        </Col>
                        <Col xs="7">
                          <CardSubtitle tag="h6" className="mb-2 text-right">
                            1/4
                          </CardSubtitle>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xs="3"></Col>
                  <Col xs="3"></Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, query }) => {
    const username = query.username || '';
    const data = { username };
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
    }
    store.dispatch(loadProfileRequest(data));
    store.dispatch(END); // Request가 끝날 때 까지 기다려줌
    await store.sagaTask.toPromise();
  }
);

export default profile;
