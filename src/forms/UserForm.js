import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';
import UserSchema from '../shared/models/schemas/User.json';


/**
 *
 */
class UserForm extends Component {

	/**
	 *
	 * @returns {Array}
	 */
	getForm()
	{
		var ret = [];
		for (var k in UserSchema)
		{
			if (UserSchema.hasOwnProperty(k))
			{
				ret.push(
					<FormGroup controlId="formHorizontalEmail" key={k}>
						<Col componentClass={ControlLabel} sm={1}>
							{ k }
						</Col>
						<Col sm={10}>
							<FormControl type="text" name={ k } placeholder={k}
										 value={ UserSchema[k].default ? UserSchema[k].default : "" }/>
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

export default UserForm;
