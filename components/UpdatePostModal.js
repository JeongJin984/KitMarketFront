import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updatePostRequest } from '../reducer/post';
import { Button, Modal } from 'reactstrap';
import UpdatePostForm from './UpdatePostForm';

const UpdatePostButton = () => {
  const { isUpdatedPost } = useSelector((state) => state.post);
  const { username } = useSelector((state) => state.user.me);
  const { id, title, content, maxNum, needNum, category } = useSelector(
    (state) => state.post.singlePost
  );
  const initialInputs = { title, content, maxNum, needNum, category };
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
      } = inputs;
      const ampmHours = ampm === 'PM' ? parseInt(hours) + 12 : hours;
      const deadLine = `${year}-${month < 10 ? `0${month}` : month}-${
        date < 10 ? `0${date}` : date
      }T${ampmHours < 10 ? `0${ampmHours}` : ampmHours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:00`;
      const deadLineDate = new Date(deadLine);
      const data = {
        id,
        writer: username,
        title,
        content,
        deadLine,
        maxNum,
        curNum: maxNum - needNum,
        category,
      };

      if (
        deadLineDate.getTime() <= current.getTime() ||
        isNaN(deadLineDate.getTime())
      ) {
        alert('올바른 날짜를 입력해주세요.');
      } else {
        dispatch(updatePostRequest(data));
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
          initialInputs={initialInputs}
        />
      </Modal>
    </>
  );
};

export default UpdatePostButton;
