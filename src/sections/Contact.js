import React, { Component } from 'react';
import ContactForm from '../forms/ContactForm';

class Contact extends Component {
	render() {
		return (
			<div className="container">
				<h3>Contact</h3>
				<ContactForm></ContactForm>
			</div>
		);
	}
}

export default Contact;
