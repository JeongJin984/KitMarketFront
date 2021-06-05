import { useRouter } from 'next/router';
import React from 'react';

import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

const PostCard = ({ postInfo }) => {
  // const { mainPosts } = useSelector((state) => state.post);
  const date = postInfo.createdAt.split('T')[0];
  const router = useRouter();

  let category = '';
  if (postInfo.category === 'contest') {
    category = '공모전';
  } else if (postInfo.category === 'study') {
    category = '스터디';
  } else if (postInfo.category === 'carPool') {
    category = '카풀/택시';
  } else if (postInfo.category === 'miniProject') {
    category = '미니프로젝트';
  }

  const onClickPost = () => {
    router.push(`/post/${postInfo.category}/${postInfo.id}`);
  };

  return (
    <Col xs="3" style={{ marginTop: '2%', marginBottom: '2%' }}>
      <Card style={{ width: '100%', height: '100%' }} onClick={onClickPost}>
        <CardBody>
          <Row>
            <Col xs="7">
              <CardTitle tag="h5">{category}</CardTitle>
            </Col>
            <Col xs="5">
              <CardTitle tag="h5" className="text-right">
                D-{postInfo.dueDate}
              </CardTitle>
            </Col>
            <br />
          </Row>
          {/* 마감처리 */}
          {/* <CardText className="text-muted font-weight-bold" style={{fontSize : "145px", marginTop:"-15%", marginBottom:"-55%"}}>마감</CardText> */}
          <CardTitle tag="h3">{postInfo.title}</CardTitle>
          <CardText style={{ height: 50 }}>{postInfo.content}</CardText>
          <CardText tag="h5" className="text-right">
            {postInfo.curNum}/{postInfo.maxNum}
          </CardText>
          <Row>
            <Col xs="5">
              <CardSubtitle tag="h6" className="mb-2 text-muted ">
                {date}
              </CardSubtitle>
            </Col>
            <Col xs="7">
              <CardSubtitle tag="h6" className="mb-2 text-muted text-right">
                {postInfo.writer}
              </CardSubtitle>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PostCard;
