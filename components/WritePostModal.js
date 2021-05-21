import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addPostRequest } from '../reducer/post';

import { Button, Modal } from 'reactstrap';
import WritePostForm from './WritePostForm';

const ModalButton = () => {
  const initialInputs = {
    title: '',
    content: '',
    maxNum: '',
    needNum: '',
    category: 'contest',
    year: '',
    month: '',
    date: '',
    ampm: '',
    hours: '',
    minutes: '',
  };
  const { isPosted } = useSelector((state) => state.post);
  const { username } = useSelector((state) => state.user.me);
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);

  const dispatch = useDispatch();
  const current = new Date();

  useEffect(() => {
    if (modal === false) {
      onReset();
    }
  }, [modal]);

  useEffect(() => {
    if (isPosted) {
      toggle();
    }
  }, [isPosted]);

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
      } = inputs;
      const ampmHours = ampm === 'PM' ? parseInt(hours) + 12 : hours;
      const deadLine = `${year}-${month < 10 ? `0${month}` : month}-${
        date < 10 ? `0${date}` : date
      }T${ampmHours < 10 ? `0${ampmHours}` : ampmHours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:00`;
      const deadLineDate = new Date(deadLine);
      const data = {
        writer: username,
        title,
        content,
        deadLine,
        maxNum,
        curNum: maxNum - needNum,
        category,
      };
      console.log(data);

      if (
        deadLineDate.getTime() <= current.getTime() ||
        isNaN(deadLineDate.getTime())
      ) {
        alert('올바른 날짜를 입력해주세요.');
      } else {
        dispatch(addPostRequest(data));
      }
    },
    [isPosted, inputs]
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
        <WritePostForm
          handleSubmit={handleSubmit}
          toggle={toggle}
          onChange={onChange}
          inputs={inputs}
        />
      </Modal>
    </div>
  );
};

export default ModalButton;
