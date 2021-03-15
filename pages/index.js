import React, { useCallback } from 'react';

import styled, { css } from 'styled-components'

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

	const Button = styled.button`
		background: transparent;
		border-radius: 10px;
		border: 2px solid #497649;
		color: black;
		margin: 0.5em 1em;
		padding: 0.5em 2em;

		:hover {
			background-color: #E1FFE1;	
		}

		`;

	const Card = styled.section`
		height: 300px;
		width: 400px;
		border-radius: 30px;
		border-width : 3px;
		border-style : dashed;
		border-color : #497649;
		background: #F0FFF0;
		position: absolute;
		left: 50%;
		top: 50%; 
 		transform: translate(-50%, 100%);
	`



	return (
		<div>
			<Row>
				<Col className = "text-center">
					<Card body>
					<CardTitle tag="h3">LOGIN</CardTitle>
					<CardText>ID와 Password를 입력해주세요.</CardText>
					<Form >
						<FormGroup row>
							<Label className = "text-center" for="exampleEmail" sm={4}>ID</Label>
							<Col sm={7}>
							<Input type="email" name="email" id="exampleEmail" placeholder="ID" />
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label className = "text-center" for="examplePassword" sm={4}>Password</Label>
							<Col sm={7}>
							<Input type="password" name="password" id="examplePassword" placeholder="password" />
							</Col>
						</FormGroup>
						<FormGroup>
							
						</FormGroup>
						<FormGroup check row>
							<Col sm={{ size: 9, offset: 1 }}>
							<Button>Login</Button>
							</Col>
						</FormGroup>
					</Form>
					</Card>
				</Col>
			</Row>
		</div>
	  );
}

export default Home;