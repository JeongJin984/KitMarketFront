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
import {
  deletePostRequest,
  loadPostRequest,
  permitJoinRequest,
} from '../../../data/event/postEvent';

const PostView = () => {
  const { singlePost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  // const username = 'a';
  const { username } = me;
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(new Set());

  const { id, writer, title, dueDate, content, maxNum, curNum, applications } =
    singlePost;

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

  const onClickDelete = useCallback(() => {
    if (confirm('게시물을 삭제 하시겠습니까?')) {
      dispatch(deletePostRequest({ id }));
    }
  }, [singlePost]);

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
        dispatch(permitJoinRequest({ appIds: checkedApps, hostName: writer }));
      }
    },
    [checked]
  );

  const isWriter = username === writer;
  return (
    <AppLayout>
      <Row style={{ padding: '1%', marginTop: '2%' }}>
        <Col xs="8" style={{ marginRight: '1%', flexWrap: 'wrap' }}>
          <Card
            body
            outline
            style={{
              backgroundColor: '#F3F3F2',
              borderColor: '#F3F3F2',
              height: 700,
            }}
          >
            <Row>
              <Col xs="3">
                <CardTitle tag="h5">{category}</CardTitle>
              </Col>
              <Col xs="6">
                <br />
                <CardTitle className="text-center" tag="h3">
                  {title}
                </CardTitle>
              </Col>
              <Col xs="3">
                <CardText className="text-right" tag="h5">
                  D-{dueDate}
                </CardText>
                <CardText
                  className="text-right"
                  tag="h6"
                  style={{ marginTop: '10%' }}
                >
                  {writer}
                </CardText>
              </Col>
            </Row>
            <hr />
            <Row style={{ display: 'flex' }}>
              <div style={{ marginLeft: 'auto' }}>
                <UpdatePostModal />
                <Button color="#00FFFFFF" size="sm" onClick={onClickDelete}>
                  삭제
                </Button>
              </div>
            </Row>
            <Card
              body
              outline
              style={{ backgroundColor: 'white', height: 400 }}
            >
              <CardText tag="h4" style={{ height: 350 }}>
                {content}
              </CardText>
              <br />
              <Row>
                <Col xs="6">
                  <CardText tag="h5">
                    {maxNum}명중에 {maxNum - curNum}명 구해요
                  </CardText>
                </Col>
                <Col xs="6">
                  <CardText tag="h6" className="mb-2 text-muted text-right">
                    {/* 2021.04.08. 6:30PM */}
                    {createdAt}
                  </CardText>
                </Col>
              </Row>
            </Card>
            <hr />
            <Row>
              <Col xs="9">
                <br />
                <br />
                <br />
                <Button color="#00FFFFFF" size="sm" style={{}}>
                  이전으로
                </Button>{' '}
              </Col>
              <Col xs="3">
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
          <Card body outline color="secondary" style={{ height: 700 }}>
            <CardTitle className="text-center" tag="h4">
              함께하고 싶은 사람
            </CardTitle>
            <hr />
            <Form
              style={{ height: '85%', position: 'relative' }}
              onSubmit={handlePermit}
            >
              <div
                style={{
                  height: '80%',
                  paddingLeft: '5%',
                  paddingRight: '5%',
                  overflow: 'auto',
                }}
              >
                {applications.map((application) => (
                  <>
                    <FormGroup
                      check
                      style={{ width: '100%', marginBottom: '5%' }}
                    >
                      <Input
                        type="checkbox"
                        onChange={(e) => handleCheck(e, application.id)}
                      />
                      {application.content}
                      <Label style={{ float: 'right' }}>
                        {application.username}
                      </Label>
                    </FormGroup>
                    <br />{' '}
                  </>
                ))}
              </div>
              <hr />
              <Button
                color="dark"
                size="lg"
                style={{
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                }}
              >
                완료
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
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
    store.dispatch(loadPostRequest(data));
    store.dispatch(END); // Request가 끝날 때 까지 기다려줌
    await store.sagaTask.toPromise();
  }
);

export default PostView;
