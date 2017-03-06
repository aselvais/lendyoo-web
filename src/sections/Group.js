import React, {Component} from 'react';
import GroupForm from '../forms/GroupForm';
import GroupGrid from '../grids/GroupGrid';
import {Panel, Button, Glyphicon} from 'react-bootstrap';

class Group extends Component {

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
				<h3>Group</h3>
				<GroupGrid></GroupGrid>
				<Button bsSize="xsmall" bsStyle="primary" onClick={ () => this.setState({open: !this.state.open})}>
					<Glyphicon glyph="plus"/>&nbsp;&nbsp;Add
				</Button>
				<br/>
				<br/>
				<Panel header="Add/Edit" bsStyle="primary" className={ this.state.open ? '' : 'hidden'}>
					<GroupForm></GroupForm>
				</Panel>
			</div>
		);
	}
}

export default Group;
