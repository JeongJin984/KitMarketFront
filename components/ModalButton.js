import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components'

import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

const ModalButton = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="dark" onClick={toggle}
      style={{
        width:'60px',
        height:'60px',
        borderRadius:'75%',
        textAlign:'center',
        margin:'0',
        position:'absolute',
        bottom:'5%',
        right:'-7%'}}>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" />
        <link rel="stylesheet" href="style.css" />
        <a className="search-btn" href="#">
          <i className="fas fa-pencil-alt" style={{color:'white'}}/>
        </a>
      </Button>
      <Modal size='lg' isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>게시글 작성</ModalHeader>
        <ModalBody>
          <label style={{ fontWeight: 'bold'}}>제목</label>
          <Input placeholder="제목" />
          <br />
          <Row>
            <Col xs = '3'>
              <label style={{ fontWeight: 'bold'}}>구하는 인원</label>
            </Col>
            <Col xs='6'>
              <Row>
                <Col xs = '3'>
                  <Input placeholder=""/>
                </Col>
                <Col xs = '3'>
                  <label>명 중에 </label>
                </Col>
                <Col xs = '3'>
                  <Input placeholder=""/>
                </Col>
                <Col xs = '3'>
                  <label>명 구해요 </label>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <label style={{ fontWeight: 'bold'}}>내용</label>
          <Input type="textarea" name="text" id="exampleText" placeholder="내용"/>
          <br />
          <label style={{ fontWeight: 'bold'}}>마감 날짜 & 시간</label>
          <Row>
            <Col xs = '2'>
              <Input placeholder=""/>
            </Col>
            <Col xs = '1'>
              <label>년</label>
            </Col>
            <Col xs = '2'>
              <Input placeholder=""/>
            </Col>
            <Col xs = '1'>
              <label>월</label>
            </Col>
            <Col xs = '2'>
              <Input placeholder=""/>
            </Col>
            <Col xs = '1'>
              <label>일</label>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs = '3'>

            </Col>
            <Col xs = '2'>
            <Input type="select" name="select" id="exampleSelect">
              <option>AM</option>
              <option>PM</option>
            </Input>
            </Col>
            <Col xs = '2'>
              <Input placeholder=""/>
            </Col>
            <Col xs = '1'>
              <label>시</label>
            </Col>
            <Col xs = '2'>
              <Input placeholder=""/>
            </Col>
            <Col xs = '1'>
              <label>분</label>
            </Col>
            <Col xs = '1'>
              <label>까지</label>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button outline color="secondary" onClick={toggle}>취소</Button>
          <Button color="secondary" onClick={toggle}>확인</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalButton;