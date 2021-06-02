import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import {
  Row,
  Col,
  Jumbotron,
  Button,
  Input,
  InputGroup,
  Form,
} from 'reactstrap';

const JumbotronComponent = () => {
  const [select, setSelect] = useState('title');
  const [input, setInput] = useState('');
  const router = useRouter();

  const { category } = router.query;

  const onChangeInput = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onClickSubmit = useCallback(
    (e) => {
      e.preventDefault();
      category
        ? router.push(`/board/${category}/?select=${select}&search=${input}`)
        : router.push(`/?select=${select}&search=${input}`);
    },
    [category, select, input]
  );

  return (
    <Jumbotron style={{ height: '100%', marginTop: '2%' }}>
      <Row>
        <Col xs="3">
          <img
            resizemode={'cover'}
            style={{ width: '100%', marginBottom: '-15%', marginTop: '-2%' }}
            src="/images/Jumbotron1.png"
            alt="KnI"
          />
        </Col>
        <Col xs="6">
          <img
            resizemode={'cover'}
            style={{ width: '30%', marginTop: '-1%', marginLeft: '35%' }}
            src="/images/kni.png"
            alt="KnI"
          />
          <br />
          <br />
          <br />
          <br />
          <p className="lead" style={{ textAlign: 'center' }}>
            필요한 분야의 인원을 구해보세요
          </p>
          <br />
          {router.pathname !== '/' && (
            <Form onSubmit={onClickSubmit}>
              <InputGroup
                size="lg"
                style={{ position: 'absolute', marginBottom: '-30%' }}
              >
                <Input
                  style={{
                    borderRadius: '100px',
                    height: 70,
                    background: 'transparent',
                    border: 'none',
                  }}
                />

                <Input
                  type="select"
                  style={{
                    position: 'absolute',
                    width: '20%',
                    height: '100%',
                    // borderRadius:'100px',
                    zIndex: 3,
                  }}
                  name="select"
                >
                  <option value="title" onClick={() => setSelect('title')}>
                    제목
                  </option>
                  <option
                    value="username"
                    onClick={() => setSelect('username')}
                  >
                    작성자
                  </option>
                </Input>
                <Input
                  type="text"
                  placeholder="Search.."
                  name="text"
                  style={{
                    position: 'absolute',
                    // border: 'none',
                    width: '80%',
                    // height:'100%',
                    // borderRadius: '100px',
                    height: 70,
                    // background: 'transparent',
                    marginLeft: '20%',
                    zIndex: 3,
                  }}
                  onChange={onChangeInput}
                  required
                />
                <Button
                  outline
                  color="secondary"
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '1%',
                    top: '7%',
                    marginLeft: '-21%',
                    width: '8%',
                    height: '85%',
                    borderRadius: '90px',
                    textAlign: 'center',
                    margin: '0',
                    zIndex: 5,
                  }}
                >
                  <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
                  />
                  <link rel="stylesheet" href="style.css" />
                  <a className="search-btn" href="#">
                    <i className="fas fa-search" style={{ color: 'black' }} />
                  </a>
                </Button>
              </InputGroup>
            </Form>
          )}
        </Col>
        <Col xs="3">
          <img
            resizemode={'cover'}
            style={{ width: '100%', marginTop: '-2%', marginBottom: '-15%' }}
            src="/images/Jumbotron2.png"
            alt="KnI"
          />
        </Col>
      </Row>
    </Jumbotron>
  );
};

export default JumbotronComponent;
