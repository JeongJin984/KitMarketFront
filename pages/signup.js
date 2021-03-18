import React, { useCallback, useState } from 'react';

import styled, { css } from 'styled-components'

import { Button, 
	Form, 
	FormGroup, 
	Label, 
	Input, 
	Container, 
	Row, 
	Col,
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { useDispatch } from 'react-redux';
import { LOGIN_REQUEST } from '../reducer/user';

const Home = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen(prevState => !prevState);


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
		<Container className="themed-container" fluid="lg">
      <Row>
        <Col xs="2" style={{backgroundColor: "white"}}></Col>
        <Col xs="8">
					<Form style={{ marginTop: "30%" }}>
						<Label style={{marginTop: "5%"}}><h1>회원 가입</h1></Label>
						{' '}
						<FormGroup>
							<Label>Username</Label>
								<Row>
									<Col xs="10">
										<Label for="exampleUsername" hidden>Username</Label>
										<Input type="username" name="username" id="exampleUsername" placeholder="Username" />	
									</Col>
									<Col xs="2">
										<Button style={{width: "95px", margin: "2%"}}>중복 확인</Button>
									</Col>
								</Row>
						</FormGroup>
						{' '}
						<FormGroup>
							<Label>Email</Label>
								<Row>
									<Col xs="10">
										<Label for="exampleEmail" hidden>Email</Label>
										<Input valid type="email" name="email" id="exampleEmail" placeholder="Email" />	
									</Col>
									<Col xs="2">
										<Button style={{width: "95px", margin: "2%"}}>중복 확인</Button>
									</Col>
								</Row>
						</FormGroup>
						{' '}
						<FormGroup>
							<Label>Password</Label>
							<Label for="examplePassword" hidden>Password</Label>
							<Row>
								<Col xs="6">
									<Input valid type="password" name="password" id="examplePassword" placeholder="Password" />
								</Col>
								<Col xs="6">
									<Input valid type="password" name="password" id="examplePassword" placeholder="Password Check" />
								</Col>
							</Row>
						</FormGroup>
						{' '}
						<FormGroup>
							
						</FormGroup>
						{' '}
					</Form>
					<Row>
						<Col xs="4">

						</Col>
						<Col xs="4">
							<Row>
							<Col xs="6">
							<Button outline color="secondary" style={{marginTop : "50px", width: "100%", height: "50px"}}>취소</Button>
							</Col>
							<Col xs="6">
							<Button style={{marginTop : "50px", width: "100%", height: "50px"}}>회원가입</Button>
							</Col>
							</Row>
						</Col>
						<Col xs="4">
		
						</Col>
					</Row>
				</Col>
        <Col xs="2"></Col>
      </Row>
		</Container>
	  );
}

export default Home;