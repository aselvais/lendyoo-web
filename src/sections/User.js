import React, {Component} from 'react';
import UserForm from '../forms/UserForm';
import UserGrid from '../grids/UserGrid';
import {Panel, Button, Glyphicon} from 'react-bootstrap';

class User extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			open: false
		};
	}


	render()
	{
		return (
			<div>
				<h3>User</h3>
				<UserGrid></UserGrid>
				<Button bsSize="xsmall" bsStyle="primary" onClick={ () => this.setState({open: !this.state.open})}>
					<Glyphicon glyph="plus"/>&nbsp;&nbsp;Add
				</Button>
				<br/>
				<br/>
				<Panel header="Add/Edit" bsStyle="primary" className={ this.state.open ? '' : 'hidden'}>
					<UserForm></UserForm>
				</Panel>
			</div>
		);
	}
}

export default User;
