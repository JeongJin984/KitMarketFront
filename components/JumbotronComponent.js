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
    <Jumbotron style={{ height: '100%', marginTop: '2%' }}>
      <Row>
        <Col xs="3">
        <img
          resizemode={'cover'}
          style={{ width: '100%', marginBottom:'-15%', marginTop:'-2%'}}
          src="/images/Jumbotron1.png"
          alt="KnI"
        />
        </Col>
        <Col xs="6">
          <img
            resizemode={'cover'}
            style={{ width: '30%', marginTop:'-1%', marginLeft:'35%'}}
            src="/images/kni.png"
            alt="KnI"
            />
          <br />
          <br />
          <br />
          <br />
          <p className="lead" style={{ textAlign: 'center'}} >필요한 분야의 인원을 구해보세요</p>
          <br />
          <InputGroup size="lg" style={{position:'relative', marginBotton:'-30%'}}>
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
        <Col xs="3">
        <img
          resizemode={'cover'}
          style={{ width: '100%', marginTop:'-2%', marginBottom:'-15%'}}
          src="/images/Jumbotron2.png"
          alt="KnI"
        />
        </Col>
      </Row>
    </Jumbotron>
  );
};

export default JumbotronComponent;