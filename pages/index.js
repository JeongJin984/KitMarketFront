import React from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../store';
import { END } from 'redux-saga';
import axios from 'axios';
import { loadMainPostsRequest } from '../reducer/post';

import { Row, Col, Button, ButtonToolbar, ButtonGroup } from 'reactstrap';
import PostCard from '../components/PostCard';
import JumbotronComponent from '../components/JumbotronComponent';
import AppLayout from '../components/AppLayout';
import ModalButton from '../components/ModalButton';

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  // console.log(mainPosts);
  // useEffect(() => {
  //   dispatch(loadMainPostsRequest());
  // }, []);

  return (
    <AppLayout>
      <Col xs="12">
        <JumbotronComponent />
        <Row>
          {mainPosts.map((postInfo) => (
            <PostCard postInfo={postInfo} key={postInfo.id} />
          ))}
        </Row>
      </Col>
      <ModalButton />
      <Row>
        <Col xs="1"> </Col>
        <Col xs="11">
          <Row>
            <Col xs="4"></Col>
            <Col xs="1">
              <ButtonToolbar>
                <ButtonGroup
                  style={{
                    marginLeft: '5%',
                    marginTop: '40%',
                    marginBottom: '10%',
                  }}
                >
                  <Button outline color="secondary">
                    ⟪
                  </Button>
                  <Button outline color="secondary">
                    ⟨
                  </Button>
                  <Button outline color="secondary">
                    1
                  </Button>
                  <Button outline color="secondary">
                    2
                  </Button>
                  <Button outline color="secondary">
                    3
                  </Button>
                  <Button outline color="secondary">
                    4
                  </Button>
                  <Button outline color="secondary">
                    5
                  </Button>
                  <Button outline color="secondary">
                    ⟩
                  </Button>
                  <Button outline color="secondary">
                    ⟫
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
        </Col>
      </Row>
    </AppLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store, req }) => {
//     console.log('start');
//     const cookie = req ? req.headers.cookie : '';
//     if (req && cookie) {
//       axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
//     }
//     console.log('cookie', req.headers);
//     store.dispatch(loadMainPostsRequest('postList'));
//     store.dispatch(END); // Request가 끝날 때 까지 기다려줌
//     await store.sagaTask.toPromise();
//     // getState()로 로그인 여부 확인가능
//     //console.log('me', store.getState().user.me);
//     axios.defaults.headers.Cookie = '';
//   }
// );

export default Home;
