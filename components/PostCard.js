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
  return (
    <Col xs="3" style={{marginTop:'2%', marginBottom:'2%'}}>
      <Card style={{width:'100%', height:'100%'}}>
        <CardBody>
          <Row>
            <Col xs = "7">
              <CardTitle tag="h5">카테고리</CardTitle>
            </Col>
            <Col xs = "5">
              <CardTitle tag="h5" className="text-right">D-90</CardTitle>
            </Col>
            <br />
          </Row>
          <CardTitle tag="h3">{postInfo.title}</CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          {/* 카드 내용 세줄정도 보여주고 넘치는건 더보기,, 어쩌구 넣으면 될것같은데
          지금은 일단 카드 내용이 많으면 카드가 커져요 */}
          <br />
          <Row>
            <Col xs = "6">
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                작성일자
              </CardSubtitle>
            </Col>
            <Col xs = "6">
              <CardSubtitle tag="h6" className="mb-2 text-muted text-right">
                작성자
              </CardSubtitle>
            </Col>
          </Row>
          


        </CardBody>
      </Card>
    </Col>
  );
};

export default PostCard;
