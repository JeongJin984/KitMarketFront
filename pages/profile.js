import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../store';
import { END } from 'redux-saga';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
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
import {
  loadProfileRequest,
  updateProfileRequest,
} from '../data/event/userEvent';
import {
  loadApplicatedPostsRequest,
  loadCreatedPostsRequest,
  loadParticipatingPostsRequest,
} from '../data/event/postEvent';

const profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('1');
  const {
    profile: profileState,
    isLoadedProfile,
    me,
  } = useSelector((state) => state.user);
  const { username } = me;
  const { createdPosts, participatingPosts, applicatedPosts } = useSelector(
    (state) => state.post
  );
  const { isUpdatedProfile } = useSelector((state) => state.user);

  const [profile, setProfile] = useState({
    username: '',
    email: '',
    age: '',
    major: '',
    grade: '',
    gender: '',
  });
  const [inputs, setInputs] = useState({});

  const [modal, setModal] = useState(false);

  const tab = router.query.tab || '';
  const page = router.query.page - 1 || 0;

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

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const onReset = useCallback(() => {
    if (isLoadedProfile) {
      setInputs({
        email: profileState.email,
        age: profileState.age,
        major: profileState.major,
        grade: profileState.grade,
        gender: profileState.gender,
      });
    }
  }, [setInputs, profileState]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateProfileRequest({ ...inputs, username }));
    },
    [dispatch, inputs]
  );

  useEffect(() => {
    if (tab === 'participating') setActiveTab('2');
    else if (tab === 'applicated') setActiveTab('3');
    else setActiveTab('1');
  }, []);

  useEffect(() => {
    if (isLoadedProfile) {
      setProfile(profileState);
      setInputs({
        email: profileState.email,
        age: profileState.age,
        major: profileState.major,
        grade: profileState.grade,
        gender: profileState.gender,
      });
    }
  }, [isLoadedProfile]);

  useEffect(() => {
    if (modal === false) {
      onReset();
    }
  }, [modal]);

  useEffect(() => {
    if (isUpdatedProfile) {
      location.reload();
    }
  }, [isUpdatedProfile]);

  useEffect(() => {
    if (!profileState) {
      dispatch(loadProfileRequest({ username }));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (tab === 'participating') {
      dispatch(loadParticipatingPostsRequest({ username, page }));
    } else if (tab === 'applicated') {
      dispatch(loadApplicatedPostsRequest({ username, page }));
    } else {
      dispatch(loadCreatedPostsRequest({ username, page }));
    }
  }, [dispatch, username, page, tab]);

  return (
    <AppLayout>
      <Card style={{ marginTop: '2%' }}>
        <CardBody>
          <CardTitle tag="h3">내 프로필</CardTitle>
          <hr />
          <Row>
            <Col xs="5"></Col>
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
              <Form onSubmit={handleSubmit}>
                <ModalHeader toggle={togglebutton}>내 프로필 수정</ModalHeader>
                <ModalBody>
                  <br />
                  <Row>
                    <Col xs="2"></Col>
                    <Col xs="2">
                      <label style={{ fontWeight: 'bold' }}>E-mail</label>
                    </Col>
                    <Col xs="6">
                      <Input
                        type="text"
                        defaultValue={inputs.email}
                        onChange={onChange}
                        required
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs="2"></Col>
                    <Col xs="2">
                      <label style={{ fontWeight: 'bold' }}>Major</label>
                    </Col>
                    <Col xs="6">
                      <Input
                        type="text"
                        name="major"
                        defaultValue={inputs.major}
                        onChange={onChange}
                        required
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs="2"></Col>
                    <Col xs="2">
                      <label style={{ fontWeight: 'bold' }}>Grade</label>
                    </Col>
                    <Col xs="2">
                      <Input
                        type="number"
                        min="1"
                        max="4"
                        placeholder=""
                        defaultValue={inputs.grade}
                        onChange={onChange}
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
                      <Input
                        type="select"
                        name="gender"
                        defaultValue={inputs.gender}
                        onChange={onChange}
                        required
                      >
                        <option value="MALE">남자</option>
                        <option value="FEMALE">여자</option>
                      </Input>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs="2"></Col>
                    <Col xs="2">
                      <label style={{ fontWeight: 'bold' }}>Age</label>
                    </Col>
                    <Col xs="2">
                      <Input
                        type="number"
                        max="99"
                        defaultValue={inputs.age}
                        onChange={onChange}
                        required
                      />
                    </Col>
                  </Row>
                  <br />
                </ModalBody>
                <ModalFooter>
                  <Button outline color="secondary" onClick={togglebutton}>
                    취소
                  </Button>{' '}
                  <Button color="secondary" type="submit">
                    수정
                  </Button>
                </ModalFooter>
              </Form>
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
                    <ProfilePost postInfo={post} tab={tab} key={post.id} />
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
  async ({ store }) => {
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default profile;
