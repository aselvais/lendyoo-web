import React, {Component} from 'react';
import PhotoForm from '../forms/PhotoForm';
import PhotoGrid from '../grids/PhotoGrid';
import {Panel, Button, Glyphicon} from 'react-bootstrap';

class Photo extends Component {

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
				<h3>Photo</h3>
				<PhotoGrid/>
				<Button bsSize="xsmall" bsStyle="primary" onClick={ () => this.setState({open: !this.state.open})}>
					<Glyphicon glyph="plus"/>&nbsp;&nbsp;Add
				</Button>
				<br/>
				<br/>
				<Panel header="Add/Edit" bsStyle="primary" className={ this.state.open ? '' : 'hidden'}>
					<PhotoForm></PhotoForm>
				</Panel>
			</div>
		);
	}
}

export default Photo;
