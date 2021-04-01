import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostRow from '../components/PostRow';

import { loadMainPostsRequest } from '../reducer/post';

import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Jumbotron,
  Button,
  ButtonGroup,
  ButtonToolbar,
} from 'reactstrap';

const Home = () => {
  const dispatch = useDispatch();
  // const { mainPosts } = useSelector((state) => state.post);
  // console.log(mainPosts);
  // useEffect(() => {
  //   dispatch(loadMainPostsRequest());
  // }, []);
  const mainPosts = [1, 2, 3, 4, 5];
  return (
    <AppLayout>
      {/* <Col xs ="1">
            </Col> */}
      <Col xs="12" /*child */>
        <div>
          <Jumbotron style={{ height: '120%', marginTop: '2%' }}>
            <h1 className="display-3">프로그램 가제</h1>
            <p className="lead">간단한 설명</p>
            <hr className="my-2" />
            <p>
              It uses utility classes for typography and spacing to space
              content out within the larger container.
            </p>
            <p className="lead">
              <Button color="primary">Learn More</Button>
            </p>
          </Jumbotron>
        </div>
        {mainPosts.length < 5 ? (
          <PostRow begin={0} />
        ) : (
          <>
            <PostRow begin={0} />
            <PostRow begin={4} />
          </>
        )}
      </Col>
    </AppLayout>
  );
};

export default Home;
