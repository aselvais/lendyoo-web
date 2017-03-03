import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button} from 'react-bootstrap';
let _modelSchema = {};

/**
 *
 */
class AbstractForm extends Component {

	/**
	 *
	 */
	init()
	{
		var _state = {};
		for (var k in this.modelSchema) {
			if (this.modelSchema.hasOwnProperty(k))
				_state[k] = this.modelSchema[k].default ? this.modelSchema[k].default : "";
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
					Object.keys(this.modelSchema).map( (k) => {
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

export default AbstractForm;
