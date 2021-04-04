import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalButton = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
          bottom: '-2%',
          right: '-5%',
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>모달띄우기</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalButton;
