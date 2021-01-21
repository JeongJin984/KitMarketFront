import React, { useCallback } from 'react';

import { Form, Button } from 'react-bootstrap'

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
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formBasicUsername">
				<Form.Label>Username</Form.Label>
				<Form.Control type="text" placeholder="Enter username" />
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" />
			</Form.Group>
			<Form.Group controlId="formBasicCheckbox">
				<Form.Check type="checkbox" label="Check me out" />
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	)
}

export default Home;