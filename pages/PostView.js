import React, { useState, } from 'react';
import { Row, Col, Card, Button, CardTitle, CardText, CardSubtitle, Form, FormGroup, UncontrolledPopover, PopoverHeader, PopoverBody, Badge, Label, Input } from 'reactstrap';
import AppLayout from '../components/AppLayout';

const PostView = () => {
	const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);


  return (
    <AppLayout>
			<Row style={{padding:'1%', marginTop:'2%'}}>
				<Col xs = "8" style={{marginRight:'1%', flexWrap:'wrap'}}>
				<Card body outline style={{ backgroundColor: '#E6E6E6', borderColor: '#E6E6E6', height: 700 }}>
					<Row>
						<Col xs= '6'>
							<CardTitle tag="h5" className="text-left">D-90</CardTitle>
						</Col>
						<Col xs= '6'>
							<CardText tag="h6" className="mb-2 text-muted text-right">
									2021.04.08. 6:30PM
							</CardText>
						</Col>
					</Row>
					<br />
          <CardTitle tag="h5">category</CardTitle>
          <CardTitle tag="h2" className="text-center">옥계중에서 택시 같이 타실 분 </CardTitle>
					<CardText tag="h5" className="text-right">배지원</CardText>
					<br />
					<br />
          <CardText tag="h4" style={{ height: 300 }}>
					옥계중에서 같이 택시 타실 분 구합니다 저는 월~금 다 1교시라서 8시 40분에는 타야해요. 같이 타실 분 연락 주십시오. 택시비 엔빵 야호야호~~~~~~
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
						<Col xs="9">
							<br />
							<br />
							<br />
							<Badge href="#" color="light">이전으로</Badge>
						</Col>
						<Col xs="3">
						<Button id="Popover1" outline color='secondary' onClick={toggle}
							style={{
								width:'90px',
								height:'90px',
								borderRadius:'75%',
								textAlign:'center',
								margin:'0',
								marginRight:'5%'}}>
								연락하기
						</Button>
						<UncontrolledPopover trigger="legacy" placement="bottom" target="Popover1">
							<PopoverHeader>'작성자' 연락처</PopoverHeader>
							<PopoverBody>카카오톡 id : asdfghjk</PopoverBody>
						</UncontrolledPopover>
						<Button color="secondary" onClick={toggle}
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
					<Card body outline color="secondary" style={{height: 700}}>
						<CardTitle className = 'text-center' tag="h5">함께하고 싶은 사람</CardTitle>
						<hr />
						<Form style={{height:500}}>
							<FormGroup check>
								<Label check>
									<Input type="checkbox" />{' '}
									닉네임1
								</Label>
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input type="checkbox" />{' '}
									닉네임2
								</Label>
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input type="checkbox" />{' '}
									닉네임3
								</Label>
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input type="checkbox" />{' '}
									닉네임4
								</Label>
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input type="checkbox" />{' '}
									닉네임5
								</Label>
							</FormGroup>
            </Form>
						<hr />
						<Button color="dark" size="lg">완료</Button>
					</Card>
				</Col>
			</Row>
    </AppLayout>
  );
};

export default PostView;