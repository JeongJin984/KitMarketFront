import React, { useEffect } from 'react';

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

const UpdatePostForm = ({
  handleSubmit,
  toggle,
  onChange,
  inputs,
  setInputs,
  initialInputs,
}) => {
  const {
    title,
    content,
    maxNum: initialMaxNum,
    needNum,
    year,
    month,
    date,
    ampm,
    hours,
    minutes,
    category: initialCategory,
    fare,
    hostOrganization,
    homepage,
    region,
    duration,
    topic,
    projectDuration,
    departure,
    destination,
    departHours,
    departMinutes,
  } = initialInputs;

  const { category, maxNum } = inputs;

  useEffect(() => {
    setInputs(initialInputs);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <ModalHeader toggle={toggle}>게시글 수정</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="2">
            <label style={{ fontWeight: 'bold' }}>카테고리</label>
          </Col>
          <Col xs="3">
            <Input
              type="select"
              name="category"
              onChange={onChange}
              defaultValue={initialCategory}
            >
              <option value="contest">공모전</option>
              <option value="study">스터디</option>
              <option value="miniProject">미니프로젝트</option>
              <option value="carPool">카풀/택시</option>
            </Input>
          </Col>
          <Col xs="1"></Col>
          <Col xs="2">
            {category === 'contest' && (
              <label style={{ fontWeight: 'bold' }}>분야</label>
            )}
            {category === 'study' && (
              <label style={{ fontWeight: 'bold' }}>분야</label>
            )}
            {category === 'miniProject' && (
              <label style={{ fontWeight: 'bold' }}>기간</label>
            )}
          </Col>
          <Col xs="3">
            {category === 'contest' && (
              <Input type="select" name="contestCategory" onChange={onChange}>
                <option value="REPORT">리포트</option>
                <option value="IDEA">아이디어</option>
                <option value="DESIGN">디자인</option>
                <option value="CHARACTER">캐릭터</option>
                <option value="CULTURE">문화</option>
                <option value="UCC">UCC</option>
                <option value="EXTERNAL_ACTIVITY">대외활동</option>
                <option>기타</option>
              </Input>
            )}
            {category === 'study' && (
              <Input type="select" name="subject" onChange={onChange}>
                <option value="ENGLISH">언어</option>
                <option value="NCS">공무원/공기업</option>
                <option value="CERTIFICATE">자격증</option>
                <option value="NONE">기타</option>
              </Input>
            )}
            {category === 'miniProject' && (
              <Input
                name="projectDuration"
                defaultValue={projectDuration}
                onChange={onChange}
                placeholder=""
                required
              />
            )}
          </Col>
        </Row>
        <br />
        {category === 'contest' && (
          <div>
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>주최기관</label>
              </Col>
              <Col xs="3">
                <Input
                  name="hostOrganization"
                  onChange={onChange}
                  defaultValue={hostOrganization}
                  placeholder=""
                  required
                />
              </Col>
              <Col xs="1"></Col>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>참가대상</label>
              </Col>
              <Col xs="3">
                <Input type="select" name="qualification" onChange={onChange}>
                  <option value="HIGHSCHOOL">고등학생</option>
                  <option value="COLLEGE">대학생</option>
                  <option value="NONE">기타</option>
                </Input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>홈페이지</label>
              </Col>
              <Col xs="10">
                <Input
                  name="homepage"
                  onChange={onChange}
                  defaultValue={homepage}
                  placeholder="http://www.abcd.com"
                  required
                />
              </Col>
            </Row>
            <br />
          </div>
        )}
        {category === 'study' && (
          <div>
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>지역</label>
              </Col>
              <Col xs="3">
                <Input
                  name="region"
                  onChange={onChange}
                  defaultValue={region}
                  placeholder=""
                  required
                />
              </Col>
              <Col xs="1"></Col>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>기간</label>
              </Col>
              <Col xs="3">
                <Input
                  name="duration"
                  onChange={onChange}
                  defaultValue={duration}
                  placeholder=""
                  required
                />
              </Col>
            </Row>
            <br />
          </div>
        )}
        {category === 'carPool' && (
          <div>
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>출발지</label>
              </Col>
              <Col xs="3">
                <Input
                  name="departure"
                  onChange={onChange}
                  defaultValue={departure}
                  placeholder=""
                  required
                />
              </Col>
              <Col xs="1"></Col>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>도착지</label>
              </Col>
              <Col xs="3">
                <Input
                  name="destination"
                  onChange={onChange}
                  defaultValue={destination}
                  placeholder=""
                  required
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>출발시간</label>
              </Col>
              <Col xs="2" style={{ marginRight: '-3%' }}>
                <Input
                  name="departHours"
                  type="number"
                  min="0"
                  max="23"
                  onChange={onChange}
                  defaultValue={departHours}
                  placeholder=""
                  required
                />
              </Col>
              <Col xs="1" style={{ marginRight: '-3%' }}>
                <label>시</label>
              </Col>
              <Col xs="2" style={{ marginRight: '-3%' }}>
                <Input
                  name="departMinutes"
                  min="0"
                  max="59"
                  onChange={onChange}
                  defaultValue={departMinutes}
                  placeholder=""
                  required
                />
              </Col>
              <Col xs="1" style={{ marginRight: '-3%' }}>
                <label>분</label>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>성별</label>
              </Col>
              <Col xs="3">
                <Input type="select" name="gender" onChange={onChange}>
                  <option value="MALE">남성</option>
                  <option value="FEMALE">여성</option>
                  <option value="NONE">상관 없음</option>
                </Input>
              </Col>
              <Col xs="1"></Col>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>요금</label>
              </Col>
              <Col xs="3">
                <Input
                  name="fare"
                  onChange={onChange}
                  defaultValue={fare}
                  placeholder=""
                  required
                />
              </Col>
            </Row>
            <br />
            <br />
          </div>
        )}
        {category === 'miniProject' && (
          <div>
            <Row>
              <Col xs="2">
                <label style={{ fontWeight: 'bold' }}>주제</label>
              </Col>
              <Col xs="10">
                <Input
                  name="topic"
                  onChange={onChange}
                  defaultValue={topic}
                  placeholder=""
                  required
                />
              </Col>
            </Row>
            <br />
          </div>
        )}
        <Row>
          <Col xs="2">
            <label style={{ fontWeight: 'bold' }}>제목</label>
          </Col>
          <Col xs="10">
            <Input
              name="title"
              onChange={onChange}
              defaultValue={title}
              placeholder="제목"
              required
            />
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
                  defaultValue={initialMaxNum}
                  placeholder=""
                  required
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
                  max={maxNum - 1}
                  onChange={onChange}
                  defaultValue={needNum}
                  placeholder=""
                  required
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
          defaultValue={content}
          placeholder="내용"
          required
        />
        <br />
        <label style={{ fontWeight: 'bold' }}>마감 날짜 & 시간</label>
        <Row>
          <Col xs="2" style={{ marginRight: '-3%' }}>
            <Input
              name="year"
              type="number"
              onChange={onChange}
              defaultValue={year}
              placeholder=""
              required
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
              defaultValue={month}
              placeholder=""
              required
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
              defaultValue={date}
              placeholder=""
              required
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
            <Input
              type="select"
              name="ampm"
              defaultValue={ampm}
              onChange={onChange}
              required
            >
              <option value="">선택</option>

              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </Input>
          </Col>
          <Col xs="2" style={{ marginRight: '-3%' }}>
            <Input
              name="hours"
              type="number"
              min="0"
              max="11"
              onChange={onChange}
              defaultValue={hours}
              placeholder=""
              required
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
              defaultValue={minutes}
              placeholder=""
              required
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

export default UpdatePostForm;
