import React from 'react';
import { useSelector } from 'react-redux';

import { Row } from 'reactstrap';

import PostCard from './PostCard';

const PostRow = ({ begin }) => {
  const { mainPosts } = useSelector((state) => state.post);
  console.log(begin);
  const post = mainPosts.slice(begin, begin + 4);
  return (
    <Row style={{ marginTop: '3%' }}>
      {post.map((v) => (
        <PostCard key={v.id} postInfo={v} />
      ))}
    </Row>
  );
};

export default PostRow;
