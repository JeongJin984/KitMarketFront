import React, { useCallback, useState } from 'react';

import { Card, Button, CardTitle, Form } from 'reactstrap';

import ApplicationsList from './ApplicationsList';

const ApplicationsForm = ({
  singlePost,
  isWriter,
  isParticipant,
  handleCheck,
  handlePermit,
  username,
}) => {
  const { applications, participants } = singlePost;

  const [toggle, setToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);

  const onClickToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  const onClickUpdateToggle = useCallback(() => {
    setUpdateToggle(!updateToggle);
  }, [updateToggle]);

  let height = 850;

  if (singlePost.category === 'contest') {
    height = 850;
  } else if (singlePost.category === 'study') {
    height = 750;
  } else if (singlePost.category === 'carPool') {
    height = 880;
  } else if (singlePost.category === 'miniProject') {
    height = 750;
  }

  const Title = useCallback(() => {
    if (isWriter) {
      if (!toggle) {
        return (
          <CardTitle className="text-center" tag="h4">
            함께하고 싶은 사람
          </CardTitle>
        );
      } else {
        return (
          <CardTitle className="text-center" tag="h4">
            참여하고 있는 사람
          </CardTitle>
        );
      }
    } else if (isParticipant) {
      return (
        <CardTitle className="text-center" tag="h4">
          참여하고 있는 사람
        </CardTitle>
      );
    } else {
      return (
        <CardTitle className="text-center" tag="h4">
          함께하고 싶은 사람
        </CardTitle>
      );
    }
  }, [isWriter, isParticipant, toggle]);

  const Buttons = useCallback(() => {
    if (isWriter) {
      if (!toggle) {
        return (
          <>
            <Button
              color="#00FFFFFF"
              size="sm"
              style={{ position: 'absolute', width: '100%' }}
              onClick={onClickToggle}
            >
              참여하고 있는 사람 보기
            </Button>
            <Button
              color="dark"
              size="lg"
              style={{
                position: 'absolute',
                width: '100%',
                bottom: 0,
              }}
              type="submit"
            >
              완료
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button
              color="#00FFFFFF"
              size="sm"
              style={{ position: 'absolute', width: '100%' }}
              onClick={onClickToggle}
            >
              함께하고 싶은 사람 보기
            </Button>
          </>
        );
      }
    } else {
      return <></>;
    }
  }, [isWriter, toggle]);

  return (
    <Card body outline color="secondary" style={{ height: height }}>
      <Title />
      <hr />
      <Form
        style={{ height: '85%', position: 'relative' }}
        onSubmit={handlePermit}
      >
        <div
          style={{
            height: '80%',
            paddingLeft: '5%',
            paddingRight: '5%',
            overflow: 'auto',
          }}
        >
          <ApplicationsList
            username={username}
            isWriter={isWriter}
            isParticipant={isParticipant}
            applications={applications}
            participants={participants}
            toggle={toggle}
            updateToggle={updateToggle}
            onClickUpdateToggle={onClickUpdateToggle}
            handleCheck={handleCheck}
          />
        </div>
        <hr />
        <Buttons />
      </Form>
    </Card>
  );
};

export default ApplicationsForm;
