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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
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
  const [imgBase64, setImgBase64] = useState(''); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };

  const [activeTab, setActiveTab] = useState('1');
  const { profile: profileState, isLoadedProfile } = useSelector(
    (state) => state.user
  );
  const { createdPosts, participatingPosts, applicatedPosts } = useSelector(
    (state) => state.post
  );
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    age: '',
    major: '',
    grade: '',
    gender: '',
  });

  const router = useRouter();
  const tab = router.query.tab || '';
  const [modal, setModal] = useState(false);
  const togglebutton = () => setModal(!modal);

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

  useEffect(() => {
    if (isLoadedProfile) setProfile(profileState);
  }, [isLoadedProfile]);

  return (
    <AppLayout>
      <Card style={{ marginTop: '2%' }}>
        <CardBody>
          <CardTitle tag="h3">내 프로필</CardTitle>
          <hr />
          <Row>
            <Col xs="5">
              <br />
              <div className="App">
                <div
                  style={{
                    backgroundColor: '#efefef',
                    width: '250px',
                    height: '250px',
                  }}
                >
                  <img
                    src=""
                    src={imgBase64}
                    style={{ width: '250px', height: '250px' }}
                  />
                </div>
                <br />
                <div>
                  <input
                    type="file"
                    name="imgFile"
                    id="imgFile"
                    onChange={handleChangeFile}
                  />
                </div>
              </div>
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
                    Major
                  </CardText>
                </Col>
                <Col xs="10">
                  <CardText tag="h5">{profile.major}</CardText>
                </Col>
              </Row>
              <hr />
              <br />
              <Row>
                <Col xs="2">
                  <CardText tag="h6" className="mb-2 text-muted">
                    Grade
                  </CardText>
                </Col>
                <Col xs="10">
                  <CardText tag="h5">{profile.grade}</CardText>
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
                  <CardText tag="h5">{profile.gender}</CardText>
                </Col>
              </Row>
              <hr />
              <br />
              <Row>
                <Col xs="2">
                  <CardText tag="h6" className="mb-2 text-muted">
                    Age
                  </CardText>
                </Col>
                <Col xs="10">
                  <CardText tag="h5">{profile.age}</CardText>
                </Col>
              </Row>
              <hr />
              <br />
            </Col>
          </Row>
          <div className="col text-right">
            <Button color="secondary" onClick={togglebutton}>
              Edit
            </Button>
            <Modal size="lg" isOpen={modal} toggle={togglebutton}>
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
                  <Col xs="6">
                    <Input
                      type="date"
                      name="date"
                      id="exampleDate"
                      placeholder="date placeholder"
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
                <Button outline color="secondary" onClick={togglebutton}>
                  취소
                </Button>{' '}
                <Button color="secondary" onClick={togglebutton}>
                  수정
                </Button>
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

    store.dispatch(loadProfileRequest({ username }));
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
