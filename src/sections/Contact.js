import React, {Component} from 'react';
import ContactForm from '../forms/ContactForm';
import ContactGrid from '../grids/ContactGrid';
import {Panel, Button, Glyphicon} from 'react-bootstrap';

class Contact extends Component {

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
				<h3>Contact</h3>
				<ContactGrid/>
				<Button bsSize="xsmall" bsStyle="primary" onClick={ () => this.setState({open: !this.state.open})}>
					<Glyphicon glyph="plus"/>&nbsp;&nbsp;Add
				</Button>
				<br/>
				<br/>
				<Panel header="Add/Edit" bsStyle="primary" className={ this.state.open ? '' : 'hidden'}>
					<ContactForm></ContactForm>
				</Panel>
			</div>
		);
	}
}

export default Contact;
