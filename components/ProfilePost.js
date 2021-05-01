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
  return (
    <Col xs="3">
      <Card body>
        <Row>
          <Col xs="8">
            <CardTitle className="text-left">카테고리</CardTitle>
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
          제목
        </CardTitle>
        <CardText>내용</CardText>
        <br />
        <Row>
          <Col xs="5">
            <CardSubtitle tag="h6" className="mb-2 text-muted ">
              2020.04.13
            </CardSubtitle>
          </Col>
          <Col xs="7">
            <CardSubtitle tag="h6" className="mb-2 text-right">
              1/4
            </CardSubtitle>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProfilePost;
