import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';
import UserSchema from '../shared/models/schemas/User.json';


/**
 *
 */
class UserForm extends Component {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		var _state = {};
		for (var k in UserSchema) {
			if (UserSchema.hasOwnProperty(k))
				_state[k] = UserSchema[k].default ? UserSchema[k].default : "";
		}
		this.state = _state;
	}

	/**
	 *
	 * @param e
	 * @param k
	 */
	handleChange(e, k) {
		var _o = {};
		_o[k] = e.target.value;
		this.setState(_o);
	}

	/**
	 *
	 * @param e
	 */
	submit(e) {
		e.preventDefault();
		alert(JSON.stringify(this.state));
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		return (
			<Form horizontal onSubmit={ (e) => this.submit(e) }>
				{
					Object.keys(UserSchema).map( (k) => {
							return (<FormGroup controlId="formHorizontalEmail" key={k}>
								<Col componentClass={ControlLabel} sm={2}>{ k }</Col>
								<Col sm={10}>
									<FormControl key={k} type="text" name={ k } placeholder={k} value={ this.state[k] }
												 onChange={ (e) => this.handleChange(e, k) } />
								</Col>
							</FormGroup>);
						}
					)
				}
				<Button type="submit">Submit</Button>
			</Form>
		);
	}
}

export default UserForm;
