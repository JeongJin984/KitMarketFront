import React, { useCallback, useState } from 'react';

import {
  Card,
  Button,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const ApplicationsForm = ({
  singlePost,
  isWriter,
  isParticipant,
  handleCheck,
  handlePermit,
}) => {
  const { applications, participants } = singlePost;

  const [toggle, setToggle] = useState(false);

  const onClickToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

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

  const List = useCallback(() => {
    if (isWriter) {
      if (!toggle) {
        return (
          <>
            {applications.map((application) => (
              <>
                <FormGroup check style={{ width: '100%', marginBottom: '5%' }}>
                  <Input
                    type="checkbox"
                    onChange={(e) => handleCheck(e, application.id)}
                  />
                  {application.content}
                  <Label style={{ float: 'right' }}>
                    {application.username}
                  </Label>
                </FormGroup>
                <br />{' '}
              </>
            ))}
          </>
        );
      } else {
        return (
          <>
            {participants.map((participant) => (
              <>
                <FormGroup check style={{ width: '100%', marginBottom: '5%' }}>
                  {participant.email}
                  <Label style={{ float: 'right' }}>
                    {participant.username}
                  </Label>
                </FormGroup>
                <br />{' '}
              </>
            ))}
          </>
        );
      }
    } else if (isParticipant) {
      return (
        <>
          {participants.map((participant) => (
            <>
              <FormGroup check style={{ width: '100%', marginBottom: '5%' }}>
                {participant.email}
                <Label style={{ float: 'right' }}>{participant.username}</Label>
              </FormGroup>
              <br />{' '}
            </>
          ))}
        </>
      );
    } else {
      return (
        <>
          {applications.map((application) => (
            <>
              <FormGroup check style={{ width: '100%', marginBottom: '5%' }}>
                <Input
                  type="checkbox"
                  onChange={(e) => handleCheck(e, application.id)}
                  disabled
                />
                {application.content}
                <Label style={{ float: 'right' }}>{application.username}</Label>
              </FormGroup>
              <br />{' '}
            </>
          ))}
        </>
      );
    }
  }, [isWriter, isParticipant, applications, participants, toggle]);

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
          <List />
        </div>
        <hr />
        <Buttons />
      </Form>
    </Card>
  );
};

export default ApplicationsForm;
