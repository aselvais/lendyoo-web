import React, { Component } from 'react';
import User from '../models/User';

class Home extends Component {

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.user = new User({ fname: 'Arnaud', lname: 'Selvais' });
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		return (
			<div>
				<h3>Home</h3>
				THIS IS HOME  <b>{this.user.fullName}</b> !!! <br/>
				Welcome to Lendyoo admin... Have fun ! :-P
			</div>
		);
	}
}

export default Home;
