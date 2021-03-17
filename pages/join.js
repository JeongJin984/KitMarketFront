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
						<Row>
							<Col xs="5">
								<img style={{ width: "100%"}} src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="BigCo Inc. logo"/>
							</Col>
							<Col xs="7">
								<Label style={{marginTop: "5%"}}><h1>JOIN MEMBERSHIP</h1></Label>
							</Col>
						</Row>
						{' '}
						<FormGroup>
							<Label>ID</Label>
								<Row>
									<Col xs="10">
										<Label for="exampleEmail" hidden>Email</Label>
										<Input type="email" name="email" id="exampleEmail" placeholder="Email" />	
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
							<Row>
								<Col xs="6">
								<Label>이름</Label>
								<Label for="exampleName" hidden>Email</Label>
								<Input type="name" name="name" id="exampleName" placeholder="이름" />
								</Col>
								<Col xs="6">
								<Label>주민등록번호</Label>
									<Row>
										<Col xs="6">
											<Label for="exampleBirth" hidden>Birth</Label>
											<Input type="birth" name="birth" id="exampleBirth" placeholder="ex)210318" />
										</Col>
										<Col xs="1">
											<Label>-</Label>
										</Col>
											<Col xs="2">
											<Label for="exampleGender" hidden>Gender</Label>
											<Input type="gender" name="gender" id="exampleGender" placeholder="" />
										</Col>
											<Col xs="3"/* 4나 5로 하면 줄이 내려감 */> 
											<Label>●●●●●●</Label>
										</Col>
									</Row>
								</Col>
							</Row>
						</FormGroup>
						{' '}
						<FormGroup>
							<Label>번호</Label>
								<Row>
									<Col xs="6">
										<Row>
											<Col xs="3">
												<Label for="exampleFirstnum" hidden>Firstnum</Label>
												<Input type="firstnum" name="firstnum" id="exampleFirstnum" placeholder="" />
											</Col>
											<Col xs="1">
												<Label>-</Label>	
											</Col>
											<Col xs="3">
												<Label for="exampleMidnum" hidden>Midnum</Label>
												<Input type="midnum" name="midnum" id="exampleMidnum" placeholder="" />	
											</Col>
											<Col xs="1">
												<Label>-</Label>	
											</Col>
											<Col xs="3">
												<Label for="exampleFinalnum" hidden>Finalnum</Label>
												<Input type="finalnum" name="email" id="exampleFinalnum" placeholder="" />	
											</Col>
										</Row>
									</Col>
									<Col xs="6">
										
									</Col>
								</Row>
						</FormGroup>
						{' '}
					</Form>
					<Row>
						<Col xs="4">

						</Col>
						<Col xs="4">
							<Row>
							<Col xs="6">
							<Button outline color="secondary" style={{marginTop : "50px", width: "100%", height: "50px"}}>CANCELL</Button>
							</Col>
							<Col xs="6">
							<Button style={{marginTop : "50px", width: "100%", height: "50px"}}>JOIN</Button>
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