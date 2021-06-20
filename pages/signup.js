import React, { useCallback, useEffect, useState } from 'react';

import styled, { css } from 'styled-components';

import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';
import axios from 'axios';
import { signUpRequest } from '../data/event/userEvent';

const signUp = () => {
  const { isSignedUp } = useSelector((state) => state.user);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isSignedUp) {
      router.push('/login');
    }
  }, [isSignedUp]);

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);

    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const checkPassword = useCallback(
    (e) => {
      if (password === e.target.value) {
        setIsPwdValid(true);
      } else {
        setIsPwdValid(false);
      }
    },
    [password]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = {
        username: username,
        email: email,
        password: password,
      };
      dispatch(signUpRequest(data));
    },
    [username, email, password]
  );

  const onClickCancle = (e) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <Container className="themed-container" fluid="lg">
      <Row>
        <Col xs="3" style={{ backgroundColor: 'white' }}></Col>
        <Col xs="6">
          <Form onSubmit={handleSubmit} style={{ marginTop: '25%' }}>
            <div style={{ textAlign: 'center' }}>
              <Label style={{ marginTop: '5%' }}>
                <h1>회원 가입</h1>
              </Label>{' '}
            </div>
            <FormGroup required>
              <Label>Username</Label>
              <Row>
                <Col xs="10">
                  <Label for="exampleUsername" hidden>
                    Username
                  </Label>
                  <Input
                    type="text"
                    name="username"
                    id="exampleUsername"
                    placeholder="Username"
                    required
                    onChange={onChangeUsername}
                  />
                </Col>
              </Row>
            </FormGroup>{' '}
            <FormGroup>
              <Label>Email</Label>
              <Row>
                <Col xs="10">
                  <Label for="exampleEmail" hidden>
                    Email
                  </Label>
                  {isEmailValid ? (
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Email"
                      onChange={onChangeEmail}
                      valid
                      required
                    />
                  ) : (
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Email"
                      onChange={onChangeEmail}
                      invalid
                      required
                    />
                  )}
                  <FormFeedback invalid>올바르지 않은 형식입니다.</FormFeedback>
                </Col>
              </Row>
            </FormGroup>{' '}
            <FormGroup>
              <Label>Password</Label>
              <Label for="examplePassword" hidden>
                Password
              </Label>
              <Row>
                <Col xs="6">
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Password"
                    onChange={onChangePassword}
                    required
                  />
                </Col>
                <Col xs="6">
                  {isPwdValid ? (
                    <Input
                      type="password"
                      name="passwordCheck"
                      id="examplePassword"
                      placeholder="Password Check"
                      onChange={checkPassword}
                      valid
                      required
                    />
                  ) : (
                    <Input
                      type="password"
                      name="passwordCheck"
                      id="examplePassword"
                      placeholder="Password Check"
                      onChange={checkPassword}
                      invalid
                      required
                    />
                  )}
                </Col>
              </Row>
            </FormGroup>{' '}
            <FormGroup></FormGroup>{' '}
            <Row>
              <Col xs="3"></Col>
              <Col xs="6">
                <Row>
                  <Col xs="6">
                    <Button
                      outline
                      color="secondary"
                      style={{
                        marginTop: '50px',
                        width: '100%',
                        height: '50px',
                      }}
                      onClick={onClickCancle}
                    >
                      취소
                    </Button>
                  </Col>
                  <Col xs="6">
                    <Button
                      type="submit"
                      style={{
                        marginTop: '50px',
                        width: '100%',
                        height: '50px',
                        marginLeft: '10px',
                      }}
                      onClick={handleSubmit}
                    >
                      회원가입
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col xs="3"></Col>
            </Row>
          </Form>
        </Col>
        <Col xs="2"></Col>
      </Row>
    </Container>
  );
};

export default signUp;
