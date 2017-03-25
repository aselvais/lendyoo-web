import React, { Component } from 'react';
import User from '../shared/models/frontend/User';

class Home extends Component {

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this._user = new User({ fname: 'Fake', lname: 'User' });
		this.state = {
			user: this._user
		};

		var _that = this;
		this._user.populateDataFromRemote('58be0931785ff104cc252d88').then(
			function(d) {
				if (d) _that.setState( {user: _that._user } );
			}
		);

	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		return (
			<div>
				<h3>Home</h3>
				THIS IS HOME  <b>{this.state.user.fullName}</b> !!! <br/>
				You are using this app on  <b>{process.env.NODE_ENV}</b> !!! <br/>
				Welcome to Lendyoo admin... Have fun ! :-P
			</div>
		);
	}
}

export default Home;
