import React, {Component} from 'react';
import LoanForm from '../forms/LoanForm';
import LoanGrid from '../grids/LoanGrid';
import {Panel, Button, Glyphicon} from 'react-bootstrap';

class Loan extends Component {

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
				<h3>Loan</h3>
				<LoanGrid/>
				<Button bsSize="xsmall" bsStyle="primary" onClick={ () => this.setState({open: !this.state.open})}>
					<Glyphicon glyph="plus"/>&nbsp;&nbsp;Add
				</Button>
				<br/>
				<br/>
				<Panel header="Add/Edit" bsStyle="primary" className={ this.state.open ? '' : 'hidden'}>
					<LoanForm></LoanForm>
				</Panel>
			</div>
		);
	}
}

export default Loan;
