import React, { Component } from 'react';
import LoanForm from '../forms/LoanForm';

class Loan extends Component {
	render() {
		return (
			<div className="container">
				<h3>Loan</h3>
				<LoanForm></LoanForm>
			</div>
		);
	}
}

export default Loan;
