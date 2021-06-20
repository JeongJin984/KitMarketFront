import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateJoinRequest } from '../data/event/postEvent';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const AppllicationsList = ({
  username,
  isWriter,
  isParticipant,
  applications,
  participants,
  toggle,
  updateToggle,
  onClickUpdateToggle,
  handleCheck,
}) => {
  const dispatch = useDispatch();
  const { singlePost, isUpdatedJoin } = useSelector((state) => state.post);
  const [content, setContent] = useState('');

  const onChangeContent = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [content]
  );

  const handleUpdate = useCallback(() => {
    console.log(username, content);
    dispatch(updateJoinRequest({ id: singlePost.id, username, content }));
  }, [username, singlePost, content]);

  useEffect(() => {
    if (updateToggle === false) {
      applications.forEach((a) => {
        if (a.username === username) {
          setContent(a.content);
        }
      });
    }
  }, [updateToggle]);

  useEffect(() => {
    if (isUpdatedJoin) {
      location.reload();
    }
  }, [isUpdatedJoin]);

  if (isWriter) {
    if (!toggle) {
      return (
        <>
          {applications.map((application) => (
            <div key={application.id}>
              <FormGroup check style={{ width: '100%', marginBottom: '5%' }}>
                <Input
                  type="checkbox"
                  onChange={(e) => handleCheck(e, application.id)}
                />
                {application.content}
                <Label style={{ float: 'right' }}>{application.username}</Label>
              </FormGroup>
              <br />{' '}
            </div>
          ))}
        </>
      );
    } else {
      return (
        <>
          {participants.map((participant) => (
            <div key={participant.id}>
              <FormGroup check style={{ width: '100%', marginBottom: '5%' }}>
                {participant.email}
                <Label style={{ float: 'right' }}>{participant.username}</Label>
              </FormGroup>
              <br />{' '}
            </div>
          ))}
        </>
      );
    }
  } else if (isParticipant) {
    return (
      <>
        {participants.map((participant) => (
          <div key={participant.id}>
            <FormGroup check style={{ width: '100%', marginBottom: '5%' }}>
              {participant.email}
              <Label style={{ float: 'right' }}>{participant.username}</Label>
            </FormGroup>
            <br />{' '}
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        {applications.map((application) => {
          if (application.username === username) {
            return (
              <div key={application.id}>
                <FormGroup check style={{ width: '100%', marginBottom: '5%' }}>
                  <Input
                    type="checkbox"
                    onChange={(e) => handleCheck(e, application.id)}
                    disabled
                  />
                  {application.content}
                  <Label style={{ float: 'right' }}>
                    {application.username}
                  </Label>
                  <button
                    type="button"
                    style={{
                      float: 'right',
                      fontSize: 'x-small',
                      backgroundColor: 'transparent',
                      border: '0px',
                    }}
                    onClick={onClickUpdateToggle}
                  >
                    수정
                  </button>
                  <Modal isOpen={updateToggle} toggle={onClickUpdateToggle}>
                    <Form>
                      <ModalHeader toggle={onClickUpdateToggle}>
                        한마디 수정하기
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          type="textarea"
                          name="text"
                          id="comments"
                          defaultValue={content}
                          onChange={onChangeContent}
                          required
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          outline
                          color="secondary"
                          onClick={onClickUpdateToggle}
                        >
                          취소
                        </Button>{' '}
                        <Button
                          type="button"
                          color="secondary"
                          onClick={handleUpdate}
                        >
                          완료
                        </Button>
                      </ModalFooter>
                    </Form>
                  </Modal>
                </FormGroup>
                <br />{' '}
              </div>
            );
          } else {
            return (
              <div key={application.id}>
                <FormGroup check style={{ width: '100%', marginBottom: '5%' }}>
                  <Input
                    type="checkbox"
                    onChange={(e) => handleCheck(e, application.id)}
                    disabled
                  />
                  {application.content}
                  <Label style={{ float: 'right' }}>
                    {application.username}
                  </Label>
                </FormGroup>
                <br />{' '}
              </div>
            );
          }
        })}
      </>
    );
  }
};

export default AppllicationsList;
