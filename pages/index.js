import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import ModalButton from '../components/ModalButton';
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
  Input,
} from 'reactstrap';
import PostCard from '../components/PostCard';

const Home = () => {
  // const { mainPosts } = useSelector((state) => state.post);
  // console.log(mainPosts);
  // useEffect(() => {
  //   dispatch(loadMainPostsRequest());
  // }, []);
  const mainPosts = {
    data: [
      {
        id: 346,
        account: 'Account0',
        title: 'Contest25',
        content: "I'm Contest25",
        applications: null,
      },
      {
        id: 326,
        account: 'Account0',
        title: 'Contest20',
        content: "I'm Contest20",
        applications: null,
      },
      {
        id: 306,
        account: 'Account0',
        title: 'Contest15',
        content: "I'm Contest15",
        applications: null,
      },
      {
        id: 286,
        account: 'Account0',
        title: 'Contest10',
        content: "I'm Contest10",
        applications: null,
      },
      {
        id: 266,
        account: 'Account0',
        title: 'Contest5',
        content: "I'm Contest5",
        applications: null,
      },
    ],
  };
  return (
    <AppLayout>
      {/* <Col xs ="1">
            </Col> */}
      <Col xs="12" /*child */>
        <div>
          <Jumbotron style={{ height: '120%', marginTop: '2%' }}>
            <h1 className="display-3">K&I</h1>
            <p className="lead">간단한 설명</p>
            <br />
            <Row>
              <Col xs="3"></Col>
              <Col xs="6">
                <InputGroup size="lg">
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Button color="secondary">
                      <link
                        rel="stylesheet"
                        href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
                      />
                      <link rel="stylesheet" href="style.css" />
                      <a className="search-btn" href="#">
                        <i
                          className="fas fa-search"
                          style={{ color: 'black' }}
                        />
                      </a>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col xs="3"></Col>
            </Row>
          </Jumbotron>
        </div>
        <Row>
          {mainPosts.data.map((postInfo) => (
            <PostCard postInfo={postInfo} />
          ))}
        </Row>
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
