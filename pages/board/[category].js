import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { wrapper } from '../../store';
import { END } from 'redux-saga';
import axios from 'axios';
import { loadMainPostsRequest } from '../../reducer/post';

import { Row, Col } from 'reactstrap';
import PostCard from '../../components/PostCard';
import JumbotronComponent from '../../components/JumbotronComponent';
import AppLayout from '../../components/AppLayout';
import ModalButton from '../../components/ModalButton';
import Pagination from '../../components/Pagination';

const Category = () => {
  const router = useRouter();
  const { mainPosts } = useSelector((state) => state.post);
  console.log(router.query);
  return (
    <AppLayout>
      <JumbotronComponent />
      <Row>
        {mainPosts.map((postInfo) => (
          <PostCard postInfo={postInfo} key={postInfo.id} />
        ))}
      </Row>
      <ModalButton />
      <Row>
        <Pagination />
      </Row>
    </AppLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store, req, query }) => {
//     const q = query.category || 'post';
//     const category = `${q}List`;
//     const page = query.page - 1 || 0;
//     const data = { category, page };
//     const cookie = req ? req.headers.cookie : '';
//     axios.defaults.headers.Cookie = '';
//     if (req && cookie) {
//       axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
//     }
//     console.log('cookie', req.headers);

//     store.dispatch(loadMainPostsRequest(data));
//     store.dispatch(END); // Request가 끝날 때 까지 기다려줌
//     await store.sagaTask.toPromise();
//   }
// );

export default Category;
