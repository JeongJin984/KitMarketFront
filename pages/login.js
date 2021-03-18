import React, { useCallback, useState } from 'react';

import styled, { css } from 'styled-components';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

import { useDispatch } from 'react-redux';
import { loginRequest } from '../reducer/user';

const Home = () => {
    const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

    const onChangeUsername = useCallback(
		(e) => {
			setUsername(e.target.value)
		},
		[],
	) 

	const onChangePassword = useCallback(
		(e) => {
			setPassword(e.target.value)
		},
		[],
	) 


  const dispatch = useDispatch();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const data = {
        username: username,
        password: password
    }
    dispatch(loginRequest(data));
  }, [username, password]);

  return (
    <Container className="themed-container" fluid="lg">
      <Row>
        <Col xs="4" style={{ backgroundColor: 'white' }}></Col>
        <Col xs="4">
          <Form onSubmit={handleSubmit} style={{ marginTop: '40%' }}>
            <img
              style={{ width: '100%' }}
              src="https://cdn.logo.com/hotlink-ok/logo-social.png"
              alt="BigCo Inc. logo"
            />
            <FormGroup>
              <Label for="exampleEmail" hidden>
                Email
              </Label>
              <Input
                valid
                type="text"
                name="email"
                id="exampleEmail"
                placeholder="UserName"
                value={username}
                onChange={onChangeUsername}
              />
            </FormGroup>{' '}
            <FormGroup>
              <Label for="examplePassword" hidden>
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
              />
            </FormGroup>
            <Row>
              <Col xs="7">
                <Form>
                  <FormGroup check inline>
                    <Input id="InlineCheckboxes-checkbox-1" type="checkbox" />
                    <Label for="InlineCheckboxes-checkbox-1" check>
                      로그인 유지
                    </Label>
                  </FormGroup>
                </Form>
              </Col>
              <Col xs="5">
                <Button type="submit" style={{ width: '120px', margin: '3%' }}>LogIn</Button>
              </Col>
            </Row>
          </Form>
          <Button
            outline
            color="info"
            style={{ width: '100%', marginTop: '30px', height: '100px' }}
          >
            Don't you have Account? <br /> Make Account!
          </Button>{' '}
        </Col>
        <Col xs="4"></Col>
      </Row>
    </Container>
  );
};

export default Home;
