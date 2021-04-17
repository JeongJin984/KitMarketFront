import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addPostRequest } from '../reducer/post';

import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from 'reactstrap';

const ModalButton = () => {
  const [modal, setModal] = useState(false);
  const [maxNum, setMaxNum] = useState('');
  const [needNum, setNeedNum] = useState('');
  //const { username } = useSelector((state) => state.user.me);
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  const onChangeMaxNum = useCallback((e) => {
    setMaxNum(e.target.value);
  }, []);

  const onChangeNeedNum = useCallback((e) => {
    setNeedNum(e.target.value);
  }, []);

  const getDDay = useCallback((formData, current) => {
    const year = formData.get('year');
    const month = formData.get('month');
    const date = formData.get('date');
    const ampm = formData.get('ampm');
    let hours = formData.get('hours');
    hours = parseInt(hours);
    if (ampm === 'PM') {
      hours += 12;
    }
    const minutes = formData.get('minutes');

    const setDate = `${year}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }T${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:00`;
    const dDay = new Date(setDate);
    const distance = dDay.getTime() - current.getTime();
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    return setDate;
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const current = new Date();
      const title = formData.get('title');
      const content = formData.get('content');
      const maxNum = formData.get('maxNum');
      const curNum = formData.get('maxNum') - formData.get('needNum');
      const category = formData.get('category');
      const createdAt = current.toISOString();
      const deadLine = getDDay(formData, current);
      const data = {
        //writer: username,
        title: 'Title',
        content: 'Content!!',
        deadLine: '2022-02-02T02:02:00',
        createdAt: '2021-04-10T12:56:18',
        maxNum: '4',
        curNum: '2',
        category: 'contest',
      };
      dispatch(addPostRequest(data));
    }
    //[username]
  );

  return (
    <div>
      <Button
        color="dark"
        onClick={toggle}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '75%',
          textAlign: 'center',
          margin: '0',
          position: 'absolute',
          bottom: '5%',
          right: '-7%',
        }}
      >
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
        />
        <link rel="stylesheet" href="style.css" />
        <a className="search-btn" href="#">
          <i className="fas fa-pencil-alt" style={{ color: 'white' }} />
        </a>
      </Button>
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>게시글 작성</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>카테고리</label>
              </Col>
              <Col xs="3">
                <Input type="select" name="category" id="exampleSelect">
                  <option value="contest">공모전</option>
                  <option>조별과제</option>
                  <option>OTT</option>
                  <option value="study">스터디</option>
                  <option>공동구매</option>
                  <option value="carPool">카풀/택시</option>
                </Input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>제목</label>
              </Col>
              <Col xs="10">
                <Input name="title" placeholder="제목" />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>구하는 인원</label>
              </Col>
              <Col xs="6">
                <Row>
                  <Col xs="3" style={{ marginRight: '-5%' }}>
                    <Input
                      name="maxNum"
                      type="number"
                      onChange={onChangeMaxNum}
                      placeholder=""
                    />
                  </Col>
                  <Col xs="3" style={{ marginRight: '-5%' }}>
                    <label>명 중에 </label>
                  </Col>
                  <Col xs="3" style={{ marginRight: '-5%' }}>
                    <Input
                      name="needNum"
                      type="number"
                      onChange={onChangeNeedNum}
                      placeholder=""
                    />
                  </Col>
                  <Col xs="3" style={{ marginRight: '-5%' }}>
                    <label>명 구해요 </label>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
            <label style={{ fontWeight: 'bold' }}>내용</label>
            <Input
              style={{ height: 300 }}
              type="textarea"
              name="content"
              id="exampleText"
              placeholder="내용"
            />
            <br />
            <label style={{ fontWeight: 'bold' }}>마감 날짜 & 시간</label>
            <Row>
              <Col xs="2" style={{ marginRight: '-3%' }}>
                <Input
                  name="year"
                  type="number"
                  min="1"
                  max="2022"
                  placeholder=""
                />
              </Col>
              <Col xs="1">
                <label>년</label>
              </Col>
              <Col xs="2" style={{ marginRight: '-3%' }}>
                <Input
                  name="month"
                  type="number"
                  min="1"
                  max="12"
                  placeholder=""
                />
              </Col>
              <Col xs="1">
                <label>월</label>
              </Col>
              <Col xs="2" style={{ marginRight: '-3%' }}>
                <Input
                  name="date"
                  type="number"
                  min="1"
                  max="31"
                  placeholder=""
                />
              </Col>
              <Col xs="1" style={{ marginRight: '-3%' }}>
                <label>일</label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs="3"></Col>
              <Col xs="2">
                <Input type="select" name="ampm" id="exampleSelect">
                  <option>AM</option>
                  <option>PM</option>
                </Input>
              </Col>
              <Col xs="2" style={{ marginRight: '-3%' }}>
                <Input name="hours" min="0" max="11" placeholder="" />
              </Col>
              <Col xs="1" style={{ marginRight: '-3%' }}>
                <label>시</label>
              </Col>
              <Col xs="2" style={{ marginRight: '-3%' }}>
                <Input name="minutes" min="0" max="59" placeholder="" />
              </Col>
              <Col xs="1" style={{ marginRight: '-3%' }}>
                <label>분</label>
              </Col>
              <Col xs="1">
                <label>까지</label>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={toggle}>
              취소
            </Button>
            <Button type="submit" color="secondary">
              확인
            </Button>{' '}
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalButton;
