import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import ModalButton from '../components/ModalButton';
import PostRow from '../components/PostRow';
import { wrapper } from '../store';
import { END } from 'redux-saga';
import axios from 'axios';
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
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  console.log(mainPosts);
  // useEffect(() => {
  //   dispatch(loadMainPostsRequest());
  // }, []);
  //const mainPosts = [1, 2, 3, 4, 5];
  return (
    <AppLayout>
      {/* <Col xs ="1">
            </Col> */}
      <Col xs="12" /*child */>
        <div>
          <Jumbotron style={{ height: '120%', marginTop: '2%'}}>
            <h1 className="display-3">K&I</h1>
            <p className="lead">간단한 설명</p>
            <br />
            <Row>
              <Col xs="3"></Col>
              <Col xs="6">
                <InputGroup size = 'lg'>
                  <Input />
                  <InputGroupAddon addonType="append" >
                    <Button color="secondary">
                      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" />
                      <link rel="stylesheet" href="style.css" />
                      <a className="search-btn" href="#">
                        <i className="fas fa-search" style={{color:'black'}}/>
                      </a>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col xs="3"></Col>
            </Row>
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
      <ModalButton />
    </AppLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store, req }) => {
//     console.log('start');
//     const cookie = req ? req.headers.cookie : '';
//     if (req && cookie) {
//       axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
//     }
//     console.log('cookie', req.headers);
//     store.dispatch(loadMainPostsRequest());
//     store.dispatch(END); // Request가 끝날 때 까지 기다려줌
//     await store.sagaTask.toPromise();
//     // getState()로 로그인 여부 확인가능
//     //console.log('me', store.getState().user.me);
//   }
// );

export default Home;
