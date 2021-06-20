import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../../store';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';
import {
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Label,
  Input,
} from 'reactstrap';
import AppLayout from '../../../components/AppLayout';
import JoinButton from '../../../components/JoinButton';
import UpdatePostModal from '../../../components/UpdatePostModal';
import Map from '../../../components/Map';
import ApplicationsForm from '../../../components/ApplicationsForm';

import {
  deletePostRequest,
  loadPostRequest,
  permitJoinRequest,
} from '../../../data/event/postEvent';

const PostView = () => {
  const { singlePost, isPermittedJoin } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const [checked, setChecked] = useState(new Set());

  // const username = 'a';
  const { username } = me;
  const [modal, setModal] = useState(false);

  const {
    id,
    writer,
    title,
    dueDate,
    content,
    maxNum,
    curNum,
    applications,
    participants,
    region,
    duration,
    fare,
    departure,
    destination,
    departTime,
    hostOrganization,
    homepage,
    projectDuration,
    topic,
    lat,
    long,
  } = singlePost;

  const dispatch = useDispatch();
  const createdAt = singlePost.createdAt.replace('T', ' ').substr(0, 16);
  const toggle = () => setModal(!modal);

  let category = '';
  if (singlePost.category === 'contest') {
    category = '공모전';
  } else if (singlePost.category === 'study') {
    category = '스터디';
  } else if (singlePost.category === 'carPool') {
    category = '카풀/택시';
  } else if (singlePost.category === 'miniProject') {
    category = '미니프로젝트';
  }

  let contestCategory = '';
  if (singlePost.contestCategory === 'REPORT') {
    contestCategory = '리포트';
  } else if (singlePost.contestCategory === 'IDEA') {
    contestCategory = '아이디어';
  } else if (singlePost.contestCategory === 'DESIGN') {
    contestCategory = '디자인';
  } else if (singlePost.contestCategory === 'CHARACTER') {
    contestCategory = '캐릭터';
  } else if (singlePost.contestCategory === 'CULTURE') {
    contestCategory = '문화';
  } else if (singlePost.contestCategory === 'UCC') {
    contestCategory = 'UCC';
  } else if (singlePost.contestCategory === 'EXTERNAL_ACTIVITY') {
    contestCategory = '대외활동';
  }

  let subject = '';
  if (singlePost.subject === 'ENGLISH') {
    subject = '언어';
  } else if (singlePost.subject === 'NCS') {
    subject = '공무원/공기업';
  } else if (singlePost.subject === 'CERTIFICATE') {
    subject = '자격증';
  } else if (singlePost.subject === 'NONE') {
    subject = '기타';
  }

  let qualification = '';
  if (singlePost.qualification === 'HIGHSCHOOL') {
    qualification = '고등학생';
  } else if (singlePost.qualification === 'COLLEGE') {
    qualification = '대학생';
  } else if (singlePost.qualification === 'NONE') {
    qualification = '기타';
  }

  let gender = '';
  if (singlePost.gender === 'MALE') {
    gender = '남자';
  } else if (singlePost.gender === 'FEMALE') {
    gender = '여자';
  } else if (singlePost.gender === 'NONE') {
    gender = '상관없음';
  }

  const handleCheck = useCallback(
    (e, id) => {
      const isChecked = e.target.checked;
      if (isChecked) {
        checked.add(id);
        setChecked(checked);
      } else {
        checked.delete(id);
        setChecked(checked);
      }
      console.log('checked', checked);
    },
    [checked]
  );

  const handlePermit = useCallback(
    (e) => {
      e.preventDefault();
      const checkedApps = Array.from(checked);
      if (checkedApps.length === 0) {
        alert('한 개 이상 체크하세요.');
      } else if (confirm('선택한 신청을 수락하시겠습니까?')) {
        dispatch(
          permitJoinRequest({ appIds: checkedApps, hostName: username })
        );
      }
    },
    [checked]
  );

  const onClickDelete = useCallback(() => {
    if (confirm('게시물을 삭제 하시겠습니까?')) {
      dispatch(deletePostRequest({ id }));
    }
  }, [singlePost]);

  useEffect(() => {
    if (isPermittedJoin) location.reload();
  }, [isPermittedJoin]);

  const isParticipant = participants.some((p) => p.username === username);
  const isWriter = username === writer;

  return (
    <AppLayout>
      <Row style={{ padding: '1%', marginTop: '2%' }}>
        <Col xs="8" style={{ marginRight: '1%', flexWrap: 'wrap' }}>
          <Card
            body
            outline
            style={{
              backgroundColor: 'white',
              borderColor: '#F3F3F2',
              height: 850,
            }}
          >
            <Row>
              <Col xs="2">
                <CardText className="text-center" tag="h5">
                  D-{dueDate}
                </CardText>
              </Col>
              <CardTitle className="text-center" tag="h3">
                {title}
              </CardTitle>
              {isWriter && (
                <div style={{ marginLeft: 'auto' }}>
                  <UpdatePostModal />
                  <Button color="#00FFFFFF" size="sm" onClick={onClickDelete}>
                    삭제
                  </Button>
                </div>
              )}
            </Row>
            <hr />
            <br />
            {singlePost.category === 'contest' && (
              <>
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>카테고리</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{category}</CardTitle>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>분야</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{contestCategory}</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>주최기관</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{hostOrganization}</CardTitle>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>참가대상</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{qualification}</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>홈페이지</label>
                  </Col>
                  <Col xs="10">
                    <CardTitle tag="h5">{homepage}</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>구하는 인원</label>
                  </Col>
                  <Col xs="6">
                    <CardText tag="h5">
                      {maxNum}명중에 {maxNum - curNum}명 구해요
                    </CardText>
                  </Col>
                </Row>
                <br />
              </>
            )}
            {singlePost.category === 'study' && (
              <>
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>카테고리</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{category}</CardTitle>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>분야</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{subject}</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>지역</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{region}</CardTitle>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>기간</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{duration}</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>구하는 인원</label>
                  </Col>
                  <Col xs="6">
                    <CardText tag="h5">
                      {maxNum}명중에 {maxNum - curNum}명 구해요
                    </CardText>
                  </Col>
                </Row>
                <br />
              </>
            )}
            {singlePost.category === 'carPool' && (
              <>
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>카테고리</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{category}</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>출발지</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{departure}</CardTitle>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>도착지</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{destination}</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>출발시간</label>
                  </Col>
                  <Col xs="10">
                    <CardTitle tag="h5">
                      {departTime.hours} : {departTime.minutes}
                    </CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>성별</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{gender}</CardTitle>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>요금</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{fare}원</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>구하는 인원</label>
                  </Col>
                  <Col xs="6">
                    <CardText tag="h5">
                      {maxNum}명중에 {maxNum - curNum}명 구해요
                    </CardText>
                  </Col>
                </Row>
                <br />
              </>
            )}
            {singlePost.category === 'miniProject' && (
              <>
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>카테고리</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{category}</CardTitle>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>기간</label>
                  </Col>
                  <Col xs="3">
                    <CardTitle tag="h5">{projectDuration}</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>주제</label>
                  </Col>
                  <Col xs="10">
                    <CardTitle tag="h5">{topic}</CardTitle>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="2">
                    <label style={{ fontWeight: 'bold' }}>구하는 인원</label>
                  </Col>
                  <Col xs="6">
                    <CardText tag="h5">
                      {maxNum}명중에 {maxNum - curNum}명 구해요
                    </CardText>
                  </Col>
                </Row>
                <br />
              </>
            )}
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>내용</label>
              </Col>
            </Row>
            <Row>
              <Card
                body
                outline
                style={{ backgroundColor: 'white', height: 270 }}
              >
                {singlePost.category === 'carPool' ? (
                  <CardText
                    tag="h5"
                    style={{ height: '100%', position: 'relative' }}
                  >
                    <Map lat={lat} long={long} />
                    <div style={{ display: 'inline' }}>{content}</div>
                    <CardText
                      tag="h6"
                      className="mb-2 text-muted text-left"
                      style={{ position: 'absolute', bottom: 0 }}
                    >
                      {createdAt}
                    </CardText>
                  </CardText>
                ) : (
                  <CardText tag="h5" style={{ height: '100%' }}>
                    {content}
                    <CardText
                      tag="h6"
                      className="mb-2 text-muted text-left"
                      style={{ position: 'absolute', bottom: 0 }}
                    >
                      {createdAt}
                    </CardText>
                  </CardText>
                )}
                <br />
              </Card>
            </Row>
            <Row>
              <Col xs="8">
                <br />
                <br />
                <br />
                <br />
                <Button
                  color="#00FFFFFF"
                  size="sm"
                  onClick={() => history.back()}
                >
                  이전으로
                </Button>{' '}
              </Col>
              <Col xs="4">
                <br />

                <Button
                  id="Popover1"
                  outline
                  color="secondary"
                  onClick={toggle}
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '75%',
                    textAlign: 'center',
                    margin: '0',
                    marginRight: '5%',
                  }}
                >
                  연락하기
                </Button>
                <UncontrolledPopover
                  trigger="legacy"
                  placement="bottom"
                  target="Popover1"
                >
                  <PopoverHeader>'작성자' 연락처</PopoverHeader>
                  <PopoverBody>카카오톡 id : asdfghjk</PopoverBody>
                </UncontrolledPopover>
                <JoinButton singlePost={singlePost} me={me} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs="4" style={{ marginLeft: '-1%' }}>
          <ApplicationsForm
            singlePost={singlePost}
            isWriter={isWriter}
            isParticipant={isParticipant}
            handleCheck={handleCheck}
            handlePermit={handlePermit}
            username={username}
          />
        </Col>
      </Row>
      <br />
      <br />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, query }) => {
    const cookie = req ? req.headers.cookie : '';
    const { category, id } = query;
    const data = { category, id };

    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
    }
    if (id !== 'style.css') {
      store.dispatch(loadPostRequest(data));
      store.dispatch(END); // Request가 끝날 때 까지 기다려줌
      await store.sagaTask.toPromise();
    }
  }
);

export default PostView;
