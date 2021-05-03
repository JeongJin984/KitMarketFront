import React from 'react';

import {
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

const ProfilePost = ({ postInfo }) => {
  const { id, category, title, writer, createdAt } = postInfo;
  return (
    <Col xs="3">
      <Card body>
        <Row>
          <Col xs="8">
            <CardTitle className="text-left">{category}</CardTitle>
          </Col>
          <Col xs="4" className="col text-right">
            <Button
              close
              onClick={(e) => {
                if (window.confirm('모임을 탈퇴하시겠습니까?'))
                  this.deleteItem(e);
              }}
            ></Button>
          </Col>
        </Row>
        <CardTitle tag="h5" className="text-center">
          {title}
        </CardTitle>
        <CardText>{writer}</CardText>
        <br />
        <Row>
          <Col xs="5">
            <CardSubtitle tag="h6" className="mb-2 text-muted ">
              {createdAt.slice(0, 10)}
            </CardSubtitle>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProfilePost;
