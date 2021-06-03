import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Button, Modal } from 'reactstrap';
import UpdatePostForm from './UpdatePostForm';
import { updatePostRequest } from '../data/event/postEvent';

const UpdatePostButton = () => {
  const { isUpdatedPost } = useSelector((state) => state.post);
  const { username } = useSelector((state) => state.user.me);
  // const username = 'a';
  const {
    id,
    title,
    content,
    maxNum,
    needNum,
    category,
    deadLine,
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
  } = useSelector((state) => state.post.singlePost);

  const year = deadLine.substr(0, 4);
  const month = parseInt(deadLine.substr(5, 2));
  const date = parseInt(deadLine.substr(8, 2));
  let hours = parseInt(deadLine.substr(11, 2));
  let ampm = 'AM';
  const minutes = parseInt(deadLine.substr(14, 2));
  if (hours >= 12) {
    hours = hours - 12;
    ampm = 'PM';
  }
  const initialInputs = {
    title,
    content,
    maxNum,
    needNum,
    category,
    year,
    month,
    date,
    hours,
    ampm,
    minutes,
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
    contestCategory: 'REPORT',
    subject: 'ENGLISH',
    qualification: 'HIGHSCHOOL',
    gender: 'MALE',
  };
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const current = new Date();

  useEffect(() => {
    if (modal === false) {
      onReset();
    }
  }, [modal]);

  useEffect(() => {
    if (isUpdatedPost) {
      toggle();
    }
  }, [isUpdatedPost]);

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs(initialInputs);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const {
        title,
        content,
        maxNum,
        needNum,
        category,
        year,
        month,
        date,
        ampm,
        hours,
        minutes,
        contestCategory,
        subject,
        fare,
        hostOrganization,
        qualification,
        homepage,
        region,
        duration,
        topic,
        projectDuration,
        departure,
        destination,
        gender,
        departHours,
        departMinutes,
      } = inputs;
      const ampmHours = ampm === 'PM' ? parseInt(hours) + 12 : hours;
      const deadLine = `${year}-${month < 10 ? `0${month}` : month}-${
        date < 10 ? `0${date}` : date
      }T${ampmHours < 10 ? `0${ampmHours}` : ampmHours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:00`;
      const deadLineDate = new Date(deadLine);
      let data = {
        writer: username,
        title,
        content,
        deadLine,
        maxNum: parseInt(maxNum),
        curNum: maxNum - needNum,
        category,
      };
      if (category === 'contest') {
        data = {
          ...data,
          contestCategory,
          hostOrganization,
          qualification,
          homepage,
        };
      } else if (category === 'study') {
        data = {
          ...data,
          subject,
          region,
          duration,
        };
      } else if (category === 'carPool') {
        data = {
          ...data,
          fare,
          departure,
          destination,
          gender,
          departTime: {
            hours: departHours,
            minutes: departMinutes,
          },
        };
      } else if (category === 'miniProject') {
        data = {
          ...data,
          topic,
          projectDuration,
        };
      }

      if (
        deadLineDate.getTime() <= current.getTime() ||
        isNaN(deadLineDate.getTime())
      ) {
        alert('올바른 날짜를 입력해주세요.');
      } else {
        dispatch(updatePostRequest({ id, data }));
      }
    },
    [isUpdatedPost, inputs]
  );

  return (
    <>
      <Button color="#00FFFFFF" size="sm" onClick={toggle}>
        수정
      </Button>
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <UpdatePostForm
          handleSubmit={handleSubmit}
          toggle={toggle}
          onChange={onChange}
          inputs={inputs}
          setInputs={setInputs}
          initialInputs={initialInputs}
        />
      </Modal>
    </>
  );
};

export default UpdatePostButton;
