import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../store';
import { END } from 'redux-saga';
import axios from 'axios';
import { loadProfileRequest } from '../reducer/user';
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

const profile = () => {
  const [activeTab, setActiveTab] = useState('1');
  const { username, email, age, createdPost, participatingPost } = useSelector(
    (state) => state.user.profile
  );
  const profile = useSelector((state) => state.user.profile);
  const page = router.query.page || 1;

  const slicedPosts = useCallback((posts, page) => {
    const sliceNum = page * 4;
    return posts.slice(sliceNum - 4, sliceNum);
  }, []);

  const toggle = useCallback(
    (tab) => {
      if (activeTab !== tab) {
        setActiveTab(tab);
        router.push('/profile');
      }
    },
    [activeTab]
  );

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
                  <CardText tag="h5">{username}</CardText>
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
                  <CardText tag="h5">{email}</CardText>
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
                  {slicedPosts(createdPost, page).map((post) => (
                    <ProfilePost postInfo={post} />
                  ))}
                </Row>
                <Row>
                  <ProfilePagination posts={createdPost} />
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <br />
                <Row>
                  {slicedPosts(participatingPost, page).map((post) => (
                    <ProfilePost postInfo={post} />
                  ))}
                </Row>
                <Row>
                  <ProfilePagination posts={participatingPost} />
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <br />
                <Row>
                  {slicedPosts(participatingPost, page).map((post) => (
                    <ProfilePost postInfo={post} />
                  ))}
                </Row>
                <Row>
                  <ProfilePagination posts={participatingPost} />
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
    store.dispatch(loadProfileRequest());
    store.dispatch(END); // Request가 끝날 때 까지 기다려줌
    await store.sagaTask.toPromise();
  }
);

export default profile;
