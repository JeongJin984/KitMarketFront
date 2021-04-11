import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { wrapper } from '../store';
import { END } from 'redux-saga';
import axios from 'axios';
import { loadMainPostsRequest } from '../reducer/post';

import { Row, Col } from 'reactstrap';
import PostCard from '../components/PostCard';
import JumbotronComponent from '../components/JumbotronComponent';
import AppLayout from '../components/AppLayout';
import ModalButton from '../components/ModalButton';

const Category = () => {
  const router = useRouter();
  const { mainPosts } = useSelector((state) => state.post);
  console.log(router.query);
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
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, query }) => {
    console.log('start');
    const category = query.category || 'postList';
    const cookie = req ? req.headers.cookie : '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
    }
    console.log('cookie', req.headers);
    store.dispatch(loadMainPostsRequest(category));
    store.dispatch(END); // Request가 끝날 때 까지 기다려줌
    await store.sagaTask.toPromise();
    // getState()로 로그인 여부 확인가능
    //console.log('me', store.getState().user.me);
    axios.defaults.headers.Cookie = '';
  }
);

export default Category;
