import React from 'react';
import {
  Row,
  Col,
  Jumbotron,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';

const JumbotronComponent = () => {
  return (
    <Jumbotron style={{ height: '120%', marginTop: '2%' }}>
      <h1 className="display-3">K&I</h1>
      <p className="lead">간단한 설명</p>
      <br />
      <Row>
        <Col xs="3"></Col>
        <Col xs="6">
          <InputGroup size="lg" style={{position:'relative'}}>
            <Input placeholder="Search..." type="text" style={{borderRadius: '100px', height:70}} />
              <Button outline color="secondary" type="submit"
              style={{
                position:'absolute',
                right:'10px',
                top:'5px',
                marginLeft:'-21%',
                width:'60px',
                height:'60px',
                borderRadius:'75%',
                textAlign:'center',
                margin:'0',
                zIndex: 100}}>
                <link
                  rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
                />
                <link rel="stylesheet" href="style.css" />
                <a className="search-btn" href="#">
                  <i className="fas fa-search" style={{ color: 'black' }} />
                </a>
              </Button> 
          </InputGroup>
        </Col>
        <Col xs="3"></Col>
      </Row>
    </Jumbotron>
  );
};

export default JumbotronComponent;