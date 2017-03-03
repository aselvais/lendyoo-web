import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';
import ContactSchema from '../shared/models/schemas/Contact.json';

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
		for (var k in ContactSchema)
		{
			if (ContactSchema.hasOwnProperty(k))
			{
				ret.push(
					<FormGroup controlId="formHorizontalEmail" key={k}>
						<Col componentClass={ControlLabel} sm={2}>
							{ k }
						</Col>
						<Col sm={10}>
							<FormControl type="text" name={ k } placeholder={k}
										 value={ ContactSchema[k].default ? ContactSchema[k].default : "" }/>
						</Col>
					</FormGroup>
				);
			}
		}
		return ret;
	}

	/**
	 *
	 * @returns {XML}
	 */
	render()
	{
		return (
			<Form horizontal>
				{ this.getForm() }
				<Button type="submit">Submit</Button>
			</Form>
		);
	}
}

export default ContactForm;
