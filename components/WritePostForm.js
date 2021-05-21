import React from 'react';

import {
  Row,
  Col,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from 'reactstrap';

const AddPostForm = ({ handleSubmit, toggle, onChange, inputs }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <ModalHeader toggle={toggle}>게시글 작성</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="2">
            <label style={{ fontWeight: 'bold' }}>카테고리</label>
          </Col>
          <Col xs="3">
            <Input type="select" name="category" onChange={onChange}>
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
            <Input name="title" onChange={onChange} placeholder="제목" />
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
                  min="2"
                  onChange={onChange}
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
                  min="1"
                  max={inputs.maxNum - 1}
                  onChange={onChange}
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
          onChange={onChange}
          placeholder="내용"
        />
        <br />
        <label style={{ fontWeight: 'bold' }}>마감 날짜 & 시간</label>
        <Row>
          <Col xs="2" style={{ marginRight: '-3%' }}>
            <Input
              name="year"
              type="number"
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
            <Input type="select" name="ampm" onChange={onChange} required>
              <option value="">선택</option>
              <option>AM</option>
              <option>PM</option>
            </Input>
          </Col>
          <Col xs="2" style={{ marginRight: '-3%' }}>
            <Input
              name="hours"
              type="number"
              min="0"
              max="11"
              onChange={onChange}
              placeholder=""
            />
          </Col>
          <Col xs="1" style={{ marginRight: '-3%' }}>
            <label>시</label>
          </Col>
          <Col xs="2" style={{ marginRight: '-3%' }}>
            <Input
              name="minutes"
              min="0"
              max="59"
              onChange={onChange}
              placeholder=""
            />
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
  );
};

export default AddPostForm;
