import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
  Form,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import {
  cancelJoinRequest,
  joinPostRequest,
  closePostRequest,
} from '../data/event/postEvent';

const JoinButton = ({ singlePost, username }) => {
  const { writer, applications, status } = singlePost;
  const [comment, setComment] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { isJoinedPost, isCancelledJoin } = useSelector((state) => state.post);

  const modalToggle = () => setModal(!modal);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = { id: singlePost.id, username, content: comment };
      dispatch(joinPostRequest(data));
    },
    [singlePost, username, comment]
  );

  const onClickCancel = useCallback(() => {
    dispatch(cancelJoinRequest({ id: singlePost.id, username }));
  }, [singlePost, username]);

  const onClickClose = useCallback(() => {
    if (confirm('모집을 마감 하시겠습니까?')) {
      dispatch(closePostRequest({ id: singlePost.id }));
    }
  }, [singlePost]);

  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  useEffect(() => {
    setIsJoined(applications.some((a) => a.username === username));
  }, [applications, username]);

  useEffect(() => {
    if (isJoinedPost || isCancelledJoin) {
      location.reload();
    }
  }, [isJoinedPost, isCancelledJoin]);

  if (writer !== username && isJoined) {
    return (
      <Button
        color="secondary"
        style={{
          marginLeft: '-120%',
          width: '90px',
          height: '90px',
          borderRadius: '75%',
          textAlign: 'center',
          margin: '0',
        }}
        onClick={onClickCancel}
      >
        취소하기
      </Button>
    );
  } else if (writer !== username && !isJoined) {
    return (
      <>
        <Button
          color="secondary"
          style={{
            marginLeft: '-120%',
            width: '90px',
            height: '90px',
            borderRadius: '75%',
            textAlign: 'center',
            margin: '0',
          }}
          onClick={modalToggle}
        >
          함께하기
        </Button>
        <Modal isOpen={modal} toggle={modalToggle}>
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={modalToggle}>한마디 남기기</ModalHeader>
            <ModalBody>
              <Input
                type="textarea"
                name="text"
                id="comments"
                placeholder="함께하고 싶어요~"
                onChange={onChangeComment}
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button outline color="secondary" onClick={modalToggle}>
                취소
              </Button>{' '}
              <Button type="submit" color="secondary">
                완료
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </>
    );
  } else if (writer === username && status === 'POSTING') {
    return (
      <Button
        color="secondary"
        style={{
          marginLeft: '-120%',
          width: '90px',
          height: '90px',
          borderRadius: '75%',
          textAlign: 'center',
          margin: '0',
        }}
        onClick={onClickClose}
      >
        마감하기
      </Button>
    );
  }
};

export default JoinButton;
