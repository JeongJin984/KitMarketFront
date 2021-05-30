import React from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '../../store';
import { END } from 'redux-saga';
import axios from 'axios';

import { Row } from 'reactstrap';
import PostCard from '../../components/PostCard';
import JumbotronComponent from '../../components/JumbotronComponent';
import AppLayout from '../../components/AppLayout';
import WritePostModal from '../../components/WritePostModal';
import BoardPagination from '../../components/BoardPagination';
import {loadMainPostsRequest} from "../../data/event/postEvent";

const Category = () => {
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      <JumbotronComponent />
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
    const page = query.page - 1 || 0;
    const data = { category, page };
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
    }

    store.dispatch(loadMainPostsRequest(data));
    store.dispatch(END); // Request가 끝날 때 까지 기다려줌
    await store.sagaTask.toPromise();
  }
);

export default Category;
