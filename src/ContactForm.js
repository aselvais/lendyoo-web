import React, { Component } from 'react';
import ContactSchema from './shared/models/schemas/Contact.json';


/**
 *
 */
class ContactForm extends Component {

	/**
	 *
	 * @returns {Array}
	 */
	getForm()
	{
		var ret = [];
		for (var k in ContactSchema) {
			ret.push(<div key={k}>{ k } <input type="text" name="{ k }" value={ ContactSchema[k].default ? ContactSchema[k].default : "" }></input></div>);
		}
		return ret;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		return (
			<div>
				<div>{ this.getForm() }</div>
			</div>
		);
	}
}

export default ContactForm;
