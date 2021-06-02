import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { wrapper } from '../../store';
import { END } from 'redux-saga';
import axios from 'axios';

import { Row, Input } from 'reactstrap';
import PostCard from '../../components/PostCard';
import JumbotronComponent from '../../components/JumbotronComponent';
import AppLayout from '../../components/AppLayout';
import WritePostModal from '../../components/WritePostModal';
import BoardPagination from '../../components/BoardPagination';
import {
  loadMainPostsRequest,
  searchPostsRequest,
} from '../../data/event/postEvent';

const Category = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const router = useRouter();
  const { category } = router.query;
  return (
    <AppLayout>
      <JumbotronComponent />
      <Input
        style={{ width: 'min-content', marginLeft: 'auto' }}
        type="select"
        name="select"
      >
        <option onClick={() => router.push(`/board/${category}`)}>전체</option>
        <option
          onClick={() => router.push(`/board/${category}?status=POSTING`)}
        >
          모집중인 모임
        </option>
        <option onClick={() => router.push(`/board/${category}?status=CLOSED`)}>
          모집 종료된 모임
        </option>
      </Input>
      <Row>
        {mainPosts.map((postInfo) => (
          <PostCard postInfo={postInfo} key={postInfo.id} />
        ))}
      </Row>
      <WritePostModal />
      <Row>
        <BoardPagination />
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, query }) => {
    const q = query.category || 'post';
    const category = `${q}List`;
    const status = query.status;
    const page = query.page - 1 || 0;
    const { select, search } = query;

    const data = { category, status, page };
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
    }

    if (search) {
      store.dispatch(searchPostsRequest({ select, search, page }));
    } else {
      store.dispatch(loadMainPostsRequest(data));
    }

    store.dispatch(END); // Request가 끝날 때 까지 기다려줌
    await store.sagaTask.toPromise();
  }
);

export default Category;
