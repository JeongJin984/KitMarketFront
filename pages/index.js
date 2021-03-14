import React, { useCallback } from 'react';

import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, CardText  } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { LOGIN_REQUEST } from '../reducer/user';

const Home = () => {

	const dispatch = useDispatch();

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({
				type: LOGIN_REQUEST,
				data: {
					username: {
						username: e.target.formBasicUsername.value,
						password: e.target.formBasicPassword.value
					}
				}
			})
		}, []
	) 

	return (
		<div>
			<Row>
				<Col sm="6">
					<Card body>
					<CardTitle tag="h5">로그인</CardTitle>
					<CardText>ID와 Password를 입력해주세요.</CardText>
					<Form className = "text-center">
						<FormGroup row>
							<Label className = "text-center" for="exampleEmail" sm={2}>ID</Label>
							<Col sm={5}>
							<Input type="email" name="email" id="exampleEmail" placeholder="ID" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label className = "text-center" for="examplePassword" sm={2}>Password</Label>
							<Col sm={5}>
							<Input type="password" name="password" id="examplePassword" placeholder="password" />
							</Col>
						</FormGroup>
						<FormGroup check row>
							<Col sm={{ size: 5, offset: 1 }}>
							<Button>Login</Button>
							</Col>
						</FormGroup>
					</Form>
					</Card>
				</Col>
				{/* <Col sm="6">
					<Card body>
					<CardTitle tag="h5">회원가입</CardTitle>
					<CardText>ID와 Password를 입력해주세요.</CardText>
					<Form className = "text-center">
						<FormGroup row>
							<Label className = "text-center" for="exampleEmail" sm={2}>ID</Label>
							<Col sm={5}>
							<Input type="email" name="email" id="exampleEmail" placeholder="ID" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label className = "text-center" for="examplePassword" sm={2}>Password</Label>
							<Col sm={5}>
							<Input type="password" name="password" id="examplePassword" placeholder="password" />
							</Col>
						</FormGroup>
						<FormGroup check row>
							<Col sm={{ size: 5, offset: 1 }}>
							<Button>Login</Button>
							</Col>
						</FormGroup>
					</Form>
					</Card>
				</Col> */}
			</Row>
		</div>
	  );
}

export default Home;