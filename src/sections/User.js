import React, { Component } from 'react';
import UserForm from '../forms/UserForm';

class User extends Component {
	render() {
		return (
			<div className="container">
				<h3>User</h3>
				<UserForm></UserForm>
			</div>
		);
	}
}

export default User;
