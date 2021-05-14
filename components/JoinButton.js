import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { joinPostRequest, cancelJoinRequest } from '../reducer/post';
import { Button } from 'reactstrap';

const JoinButton = ({ singlePost, username }) => {
  const { writer, applications } = singlePost;
  const [isJoined, setIsJoined] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => setPopoverOpen(!popoverOpen);

  const onClickJoin = useCallback(() => {
    const data = { id: singlePost.id, username };
    dispatch(joinPostRequest(data));
  }, [singlePost, username]);

  const onClickCancel = useCallback(() => {
    dispatch(cancelJoinRequest({ id: singlePost.id, username }));
  }, [singlePost, username]);

  useEffect(() => {
    setIsJoined(applications.some((a) => a.username === username));
  }, [applications, username]);

  if (isJoined) {
    return (
      <Button
        color="secondary"
        onClick={toggle}
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
  } else if (writer === username) {
    return (
      <Button
        color="secondary"
        onClick={toggle}
        style={{
          marginLeft: '-120%',
          width: '90px',
          height: '90px',
          borderRadius: '75%',
          textAlign: 'center',
          margin: '0',
        }}
      >
        마감하기
      </Button>
    );
  } else {
    return (
      <Button
        color="secondary"
        onClick={toggle}
        style={{
          marginLeft: '-120%',
          width: '90px',
          height: '90px',
          borderRadius: '75%',
          textAlign: 'center',
          margin: '0',
        }}
        onClick={onClickJoin}
      >
        함께하기
      </Button>
    );
  }
};

export default JoinButton;
