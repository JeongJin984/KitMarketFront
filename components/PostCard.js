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
  const time = postInfo.createdAt.split('T')[1].split('.')[0];

  return (
    <Col xs="3" style={{ marginTop: '2%', marginBottom: '2%' }}>
      <Card style={{ width: '100%', height: '100%' }}>
        <CardBody>
          <Row>
            <Col xs="7">
              <CardTitle tag="h5">{postInfo.category}</CardTitle>
            </Col>
            <Col xs="5">
              <CardTitle tag="h5" className="text-right">
                D-{postInfo.deadLine}
              </CardTitle>
            </Col>
            <br />
          </Row>

          <CardTitle tag="h3">{postInfo.title}</CardTitle>
          <CardText style={{ height: 70 }}>
            {postInfo.content}
            <CardSubtitle
              tag="h5"
              style={{ marginTop: '5%' }}
              className="text-right"
            >
            </CardSubtitle>
          </CardText>
          <CardText tag="h5" style={{marginBottom:'5%'}} className="text-right">
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
