import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../../store';
import { END } from 'redux-saga';
import axios from 'axios';
import {
  loadPostRequest,
  joinPostRequest,
  cancelJoinRequest,
} from '../../../reducer/post';
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
  Badge,
  Label,
  Input,
} from 'reactstrap';
import AppLayout from '../../../components/AppLayout';

const PostView = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  const dispatch = useDispatch();
  const { singlePost, isJoinedPost } = useSelector((state) => state.post);
  // const { username } = useSelector((state) => state.user.me);
  const username = 'user';
  const createdAt = singlePost.createdAt.replace('T', ' ').substr(0, 16);

  let category = '';
  if (singlePost.category === 'contest') {
    category = '공모전';
  } else if (singlePost.category === 'study') {
    category = '스터디';
  } else if (singlePost.category === 'carPool') {
    category = '카풀/택시';
  }

  const onClickJoin = useCallback(() => {
    const data = { id: singlePost.id, content: 'content', username };
    dispatch(joinPostRequest(data));
  }, [singlePost, username]);

  const onClickCancle = useCallback(() => {
    console.log('취소하기');
    dispatch(cancelJoinRequest({ postId: singlePost.id, username }));
  }, [singlePost, username]);

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
                  {singlePost.title}
                </CardTitle>
              </Col>
              <Col xs="3">
                <CardText className="text-right" tag="h5">
                  D-{singlePost.deadLine}
                </CardText>
                <CardText
                  className="text-right"
                  tag="h6"
                  style={{ marginTop: '10%' }}
                >
                  {singlePost.writer}
                </CardText>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs = "11"></Col>
              <Badge style={{textAlign:'right'}}href="#" color="light">
                수정
              </Badge>
              <Badge href="#" color="light">
                삭제
              </Badge>
            </Row>
            <Card
              body
              outline
              style={{ backgroundColor: 'white', height: 400 }}
            >
              <CardText tag="h4" style={{ height: 350 }}>
                {singlePost.content}
              </CardText>
              <br />
              <Row>
                <Col xs="6">
                  <CardText tag="h5">
                    {singlePost.maxNum}명중에{' '}
                    {singlePost.maxNum - singlePost.curNum}명 구해요
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
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> 마감하시겠습니까?
              </Label>
            </FormGroup>
            <hr />
            <Row>
              <Col xs="9">
                <br />
                <br />
                <br />
                <Badge href="#" color="light">
                  이전으로
                </Badge>
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
                {isJoinedPost ? (
                  <Button
                    color="secondary"
                    onClick={toggle}
                    style={{
                      marginLeft: '-120%',
                      width: '90px',
                      height: '90px',
                      borderRadius: '75%',
                      textAlign: 'center',
                      margin: '0',
                    }}
                    onClick={onClickCancle}
                  >
                    취소하기
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    onClick={toggle}
                    style={{
                      marginLeft: '-120%',
                      width: '90px',
                      height: '90px',
                      borderRadius: '75%',
                      textAlign: 'center',
                      margin: '0',
                    }}
                    onClick={onClickJoin}
                  >
                    함께하기
                  </Button>
                )}
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
            <Form style={{ height: 500 }}>
              {singlePost.applications.map((application) => (
                <>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" /> {application.content}
                    </Label>
                  </FormGroup>
                  <br />{' '}
                </>
              ))}
            </Form>
            <hr />
            <Button color="dark" size="lg">
              완료
            </Button>
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
