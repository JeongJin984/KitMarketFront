import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../store';
import { END } from 'redux-saga';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
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
import ProfilePost from '../components/ProfilePost';
import ProfilePagination from '../components/ProfilePagination';
import { useRouter } from 'next/router';
import { loadProfileRequest } from '../data/event/userEvent';
import {
  loadApplicatedPostsRequest,
  loadCreatedPostsRequest,
  loadParticipatingPostsRequest,
} from '../data/event/postEvent';

const profile = () => {
  const [activeTab, setActiveTab] = useState('1');
  const profile = useSelector((state) => state.user.profile);
  const { createdPosts, participatingPosts, applicatedPosts } = useSelector(
    (state) => state.post
  );
  const router = useRouter();
  const tab = router.query.tab || '';

  const toggle = useCallback(
    (tab) => {
      if (activeTab !== tab) {
        setActiveTab(tab);
        if (tab === '1') router.push('/profile');
        else if (tab === '2') router.push('/profile?tab=participating');
        else if (tab === '3') router.push('/profile?tab=applicated');
      }
    },
    [activeTab]
  );

  useEffect(() => {
    if (tab === 'participating') setActiveTab('2');
    else if (tab === 'applicated') setActiveTab('3');
    else setActiveTab('1');
  }, []);

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
                  <CardText tag="h5">username</CardText>
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
                  <CardText tag="h5">email</CardText>
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
                  <CardText tag="h5"></CardText>
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
            <Button color="secondary" onClick={togglebutton}>Edit</Button>
            <Modal  size="lg" isOpen={modal} toggle={togglebutton}>
              <ModalHeader toggle={togglebutton}>내 프로필 수정</ModalHeader>
              <ModalBody>
                <br />
                <Row>
                  <Col xs="2"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>Username</label>
                  </Col>
                  <Col xs="6">
                    <Input placeholder="username" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>E-mail</label>
                  </Col>
                  <Col xs="6">
                    <Input placeholder="E-mail" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>Birth</label>
                  </Col>
                  <Col xs="2">
                    <Input placeholder="" />
                  </Col>
                  <Col xs="2">
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      placeholder=""
                      required
                    />
                  </Col>
                  <Col xs="2">
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      placeholder=""
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>Gender</label>
                  </Col>
                  <Col xs="3">
                    <Input type="select">
                      <option>남자</option>
                      <option>여자</option>
                    </Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>Phone</label>
                  </Col>
                  <Col xs="2">
                    <Input placeholder="" />
                  </Col>
                  <Col xs="2">
                    <Input placeholder="" />
                  </Col>
                  <Col xs="2">
                    <Input placeholder="" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>KaKao ID</label>
                  </Col>
                  <Col xs="6">
                    <Input placeholder="kakao id" />
                  </Col>
                </Row>
                <br />
              </ModalBody>
              <ModalFooter>
                <Button outline color="secondary" onClick={togglebutton}>취소</Button>{' '}
                <Button color="secondary" onClick={togglebutton}>수정</Button>
              </ModalFooter>
            </Modal>
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
                  내가 만든 모임
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  참가 중인 모임
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
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '4' })}
                  onClick={() => {
                    toggle('4');
                  }}
                >
                  마감된 모임
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <br />
                <Row>
                  {createdPosts.data.map((post) => (
                    <ProfilePost postInfo={post} tab={tab} />
                  ))}
                </Row>
                <Row>
                  <ProfilePagination posts={createdPosts} />
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <br />
                <Row>
                  {participatingPosts.data.map((post) => (
                    <ProfilePost postInfo={post} tab={tab} />
                  ))}
                </Row>
                <Row>
                  <ProfilePagination posts={participatingPosts} />
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <br />
                <Row>
                  {applicatedPosts.data.map((post) => (
                    <ProfilePost postInfo={post} tab={tab} />
                  ))}
                </Row>
                <Row>
                  <ProfilePagination posts={applicatedPosts} />
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <br />
                <Row>
                  {applicatedPosts.data.map((post) => (
                    <ProfilePost postInfo={post} tab={tab} />
                  ))}
                </Row>
                <Row>
                  <ProfilePagination posts={applicatedPosts} />
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
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
    }
    const tab = query.tab || 'created';
    const page = query.page - 1 || 0;
    const state = store.getState();
    const { username } = state.user.me;
    const data = { page, username };
    store.dispatch(loadProfileRequest());
    if (tab === 'created') store.dispatch(loadCreatedPostsRequest(data));
    else if (tab === 'participating')
      store.dispatch(loadParticipatingPostsRequest(data));
    else if (tab === 'applicated')
      store.dispatch(loadApplicatedPostsRequest(data));

    store.dispatch(END); // Request가 끝날 때 까지 기다려줌
    await store.sagaTask.toPromise();
  }
);

export default profile;
