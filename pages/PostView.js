import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import AppLayout from '../components/AppLayout';

const PostView = () => {
	const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <AppLayout>
			<Row style={{padding:'1%', marginTop:'2%'}}>
				<Col xs = "8" style={{marginRight:'1%', flexWrap:'wrap'}}>
				<Card body outline style={{ backgroundColor: '#E6E6E6', borderColor: '#E6E6E6' }}>
				<br />
				<Row>
            <Col xs = "7">
              <CardTitle tag="h5">카테고리</CardTitle>
            </Col>
            <Col xs = "5">
              <CardTitle tag="h5" className="text-right">D-90</CardTitle>
            </Col>
            <br />
						<br />
          </Row>
          <CardTitle tag="h2">제목입니다</CardTitle>
					<CardText tag="h5" className="text-right">작성자</CardText>
					<br />
          <CardText tag="h4">
						내용입니다
          </CardText>
          <br />
					<br />
          <Row>
            <Col xs = "6">
              <CardSubtitle tag="h5">
                4명중에 2명 구해요
              </CardSubtitle>
            </Col>
          </Row>
					<br />
					<Row>
            <Col xs = "6">
            </Col>
            <Col xs = "6">
              <CardText tag="h6" className="mb-2 text-muted text-right">
                2021.04.08. 6:30PM
								<br />
								<br />
              </CardText>
            </Col>
          </Row>
					<Row>
						<Col xs="9">
							<br />
							<br />
							<br />
							<div>이전으로</div>
							{/* 헌재님 이겁니다!! */}
						</Col>
						<Col xs="3">
						<Button outline color='secondary' onClick={toggle}
							style={{
								width:'90px',
								height:'90px',
								borderRadius:'75%',
								textAlign:'center',
								margin:'0',
								marginRight:'5%'}}>
								연락하기
						</Button>
						<Button color="dark" onClick={toggle}
							style={{
								marginLeft:'-120%',
								width:'90px',
								height:'90px',
								borderRadius:'75%',
								textAlign:'center',
								margin:'0',}}>
								함께하기
						</Button>
						</Col>
					</Row>
				</Card>
				</Col>
				<Col xs = "4" style={{ marginLeft:'-1%'}}>
					<Card body outline color="secondary">
						<CardTitle tag="h5">Special Title Treatment</CardTitle>
						<CardText>With supporting text below as a natural lead-in to additional content.</CardText>
						<Button>Button</Button>
					</Card>
				</Col>
			</Row>
    </AppLayout>
  );
};

export default PostView;