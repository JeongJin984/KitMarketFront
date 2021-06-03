import React, { useCallback } from 'react';
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
  searchPostsTitleRequest,
  searchPostsUsernameRequest,
} from '../../data/event/postEvent';

const Category = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const router = useRouter();
  const { category } = router.query;

  const onChangeSelect = useCallback((e) => {
    const selected = e.target.value;
    if (selected === 'POSTING') {
      router.push(`/board/${category}?status=POSTING`);
    } else if (selected === 'CLOSED') {
      router.push(`/board/${category}?status=CLOSED`);
    } else {
      router.push(`/board/${category}`);
    }
  }, []);
  return (
    <AppLayout>
      <JumbotronComponent />
      <Input
        style={{ width: 'min-content', marginLeft: 'auto' }}
        type="select"
        name="select"
        onChange={onChangeSelect}
      >
        <option value="ALL">전체</option>
        <option value="POSTING">모집중인 모임</option>
        <option value="CLOSED">모집 종료된 모임</option>
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
    console.log('queeeeeeeeeeeeee', query);
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
    }
    if (q !== 'style.css') {
      if (search && select === 'title') {
        store.dispatch(searchPostsTitleRequest({ search, page }));
      } else if (search && select === 'username') {
        console.log('titleeee');
        store.dispatch(searchPostsUsernameRequest({ search, page }));
      } else if (status) {
        store.dispatch(loadMainPostsRequest({ category, status, page }));
      } else {
        store.dispatch(loadMainPostsRequest({ category, page }));
      }
      store.dispatch(END); // Request가 끝날 때 까지 기다려줌
      await store.sagaTask.toPromise();
    }
  }
);

export default Category;
