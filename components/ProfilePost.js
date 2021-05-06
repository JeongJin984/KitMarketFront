import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { cancelJoinRequest } from '../reducer/post';

const ProfilePost = ({ postInfo, tab }) => {
  const { id, category, title, writer, createdAt } = postInfo;
  const dispatch = useDispatch();
  const { isCancelledJoin } = useSelector((state) => state.post);
  return (
    <Col xs="3">
      <Card body>
        <Row>
          <Col xs="8">
            <CardTitle className="text-left">{category}</CardTitle>
          </Col>
          <Col xs="4" className="col text-right">
            {tab === 'applicated' ? (
              <Button
                close
                onClick={(e) => {
                  if (confirm('신청을 취소하시겠습니까?'))
                    dispatch(cancelJoinRequest({ postId: id }));
                  if (isCancelledJoin) {
                    alert('취소되었습니다.');
                  }
                }}
              ></Button>
            ) : (
              <></>
            )}
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
