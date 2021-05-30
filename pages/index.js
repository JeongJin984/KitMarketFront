import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { wrapper } from '../store';
import { END } from 'redux-saga';
import axios from 'axios';
import { loadMainPostsRequest, loadPostingListRequest } from '../reducer/post';

import { Row, Input, Button, Fade } from 'reactstrap';

import PostCard from '../components/PostCard';
import JumbotronComponent from '../components/JumbotronComponent';
import AppLayout from '../components/AppLayout';
import WritePostModal from '../components/WritePostModal';
import BoardPagination from '../components/BoardPagination';

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const { isLoggedIn } = useSelector((state) => state.user);
  const router = useRouter();
  const [fadeIn, setFadeIn] = useState(true);
  const [fadeIn1, setFadeIn1] = useState(true);
  const [fadeIn2, setFadeIn2] = useState(true);
  const [fadeIn3, setFadeIn3] = useState(true);
  const [fadeIn4, setFadeIn4] = useState(true);
  const toggle = () => setFadeIn(!fadeIn);
  const toggle1 = () => setFadeIn1(!fadeIn1);
  const toggle2 = () => setFadeIn2(!fadeIn2);
  const toggle3 = () => setFadeIn3(!fadeIn3);
  const toggle4 = () => setFadeIn4(!fadeIn4);

  return (
    <AppLayout>
      <JumbotronComponent />
      <Input style={{ width: 'min-content' }} type="select" name="select">
        <option onClick={() => router.push('/')}>전체</option>
        <option onClick={() => router.push('/?status=postingList')}>
          구인중인 모임
        </option>
        <option onClick={() => router.push('/?status=closedList')}>
          종료된 모임
        </option>
      </Input>
      {!isLoggedIn ? (
        <>
          <Row>
            {mainPosts.map((postInfo) => (
              <PostCard postInfo={postInfo} key={postInfo.id} />
            ))}
          </Row>
          <WritePostModal />
          <Row>
            <BoardPagination />
          </Row>
        </>
      ) : (
        <Row>
          <Row
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              onClick={toggle}
              style={{
                border: 'none',
                background: 'transparent',
                width: '15%',
              }}
            >
              <img src="/images/react.png" style={{ width: '100%' }} />
            </Button>
            <div>
              <Fade in={fadeIn} tag="h5">
                JavaScript 객체 형태의 Virtual DOM 을 사용하여 어플리케이션의
                성능을 향상
              </Fade>
              <Fade in={fadeIn} tag="h5">
                Component 의 가독성이 매우 높고 간단하여 쉬운 유지보수, 간편한
                UI 수정 및 재사용 용이
              </Fade>
              <Fade in={fadeIn} tag="h5">
                다른 프레임워크와 혼용 가능
              </Fade>
            </div>
          </Row>

          <Row
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ marginLeft: 'auto', height: 'min-content' }}>
              <Fade in={fadeIn1} tag="h5">
                프로젝트 전체 구조 설계에 유용
              </Fade>
              <Fade in={fadeIn1} tag="h5">
                다른 프레임워크들의 포용
              </Fade>
              <Fade in={fadeIn1} tag="h5">
                개발 생산성과 도구의 지원
              </Fade>
            </div>
            <Button
              onClick={toggle1}
              style={{
                border: 'none',
                background: 'transparent',
                width: '35%',
              }}
            >
              <img src="/images/spring.png" style={{ width: '100%' }} />
            </Button>
          </Row>

          <Row
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              onClick={toggle2}
              style={{
                border: 'none',
                background: 'transparent',
                width: '35%',
              }}
            >
              <img src="/images/redux.png" style={{ width: '100%' }} />
            </Button>

            <Fade in={fadeIn2} tag="h5">
              웹사이트의 상태를 store에서 관리
            </Fade>
          </Row>

          <Row
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <div style={{ marginLeft: 'auto' }}>
              <Fade in={fadeIn3} tag="h5">
                동적 쿼리 작성이 편리
              </Fade>
              <Fade in={fadeIn3} tag="h5">
                재사용 용이
              </Fade>
              <Fade in={fadeIn3} tag="h5">
                컴파일 시점에 문법 오류를 발견
              </Fade>
            </div>
            <Button
              onClick={toggle3}
              style={{
                border: 'none',
                background: 'transparent',
                width: '35%',
              }}
            >
              <img src="/images/querydsl.png" style={{ width: '100%' }} />
            </Button>
          </Row>

          <Row
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={toggle4}
              style={{
                border: 'none',
                background: 'transparent',
                width: '35%',
              }}
            >
              <img src="/images/jpa.png" style={{ width: '100%' }} />
            </Button>
            <div>
              <Fade in={fadeIn4} tag="h5">
                비즈니스 로직에만 집중할 수 있기 때문에 생산성에 강점
              </Fade>
              <Fade in={fadeIn4} tag="h5">
                유지보수가 간결
              </Fade>
            </div>
          </Row>
        </Row>
      )}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, query }) => {
    const page = query.page - 1 || 0;
    const status = query.status;
    const cookie = req ? req.headers.cookie : '';
    console.log('cookie', cookie);
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
    }
    if (status === 'postingList') {
      store.dispatch(loadPostingListRequest({ page }));
      // } else if (store.getState().user.me) {
      //   store.dispatch(loadMainPostsRequest({ category: 'postList', page }));
      // }
    } else {
      store.dispatch(loadMainPostsRequest({ category: 'postList', page }));
    }
    store.dispatch(END); // Request가 끝날 때 까지 기다려줌
    await store.sagaTask.toPromise();
  }
);

export default Home;
