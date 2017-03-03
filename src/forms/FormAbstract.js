import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button, Alert} from 'react-bootstrap';

/**
 * Generic form component; will generate a form based on a Mongoose schema stored in this.modelSchema
 */
class AbstractForm extends Component {

	/**
	 * Initialization, taking the schema and building the states with its data
	 */
	init()
	{
		var _state = {
			alertVisible: false,
			alertMessage: '',
			alertStyle: 'info'
		};
		for (var k in this.modelSchema)
		{
			if (this.modelSchema.hasOwnProperty(k))
				_state[k] = this.modelSchema[k].default ? this.modelSchema[k].default : "";
		}
		this.state = _state;
	}

	/**
	 * Handles the change in a form element
	 * @param {Object} e Event
	 * @param {String} k Key/Name of the form element
	 */
	handleChange(e, k)
	{
		var _o = {};
		_o[k] = e.target.value;
		this.setState(_o);
	}

	/**
	 *
	 * @param model
	 * @param command
	 * @param payload
	 * @returns {Promise} Fetch result
	 */
	apiCall(model, command, payload)
	{
		// CRUD (Create, Update, Delete)
		// http://localhost:3010/api/user/insert
		var _baseUrl = 'http://localhost:3010/api/';
		// return fetch( _baseUrl + model + '/' + command);
		var fetchParams = {
			method: 'POST',
			body: JSON.stringify(payload),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({'Content-Type': 'application/json'})
		};
		return fetch(_baseUrl + model + '/' + command, fetchParams).then(
			function (res)
			{
				if (res.status === 200)
				{
					return res.json().then(function (d)
					{
						return d;
					});
				}
				return false;
			},
			function (error)
			{
				console.error('Error', error);
				return false;
			}
		);
	}

	/**
	 *
	 */
	handleAlertDismiss() {
		this.setState({alertVisible: false});
	}

	/**
	 *
	 * @param alertMessage
	 * @param alertStyle
	 */
	handleAlertShow(alertMessage='', alertStyle='info') {
		this.setState({alertVisible: true, alertMessage: alertMessage, alertStyle: alertStyle});
	}

	/**
	 * Handles the submission of the data to the API
	 * @param {Object} e
	 */
	handleSubmit(e)
	{
		e.preventDefault();
		var that = this;
		this.apiCall(this.modelName, 'create', this.state).then(
			function (jsonData)
			{
				if (jsonData !== false)
				{
					console.log(jsonData);
					if (jsonData.error === 1)
					{
						that.handleAlertShow(jsonData.message, 'danger');
					}
					else if (jsonData.error === 0)
					{
						that.handleAlertShow(jsonData.message, 'success');
					}
				} else
				{
					that.handleAlertShow('Unknown error', 'danger');
					console.error(jsonData);
				}
			},
			function (error)
			{
				that.handleAlertShow('Unknown server error', 'danger');
				console.error(error);
			}
		);

	}

	/**
	 * Render the form
	 * @returns {XML}
	 */
	render()
	{
		return (
			<div>
				<Alert bsStyle={this.state.alertStyle} onDismiss={() => this.handleAlertDismiss() } className={this.state.alertVisible ? '' : 'hidden' }>
					{ this.state.alertMessage }
				</Alert>
				<Form horizontal onSubmit={ (e) => this.handleSubmit(e) }>
					{
						Object.keys(this.modelSchema).map((k) =>
							{
								return (<FormGroup controlId="formHorizontalEmail" key={k}>
									<Col componentClass={ControlLabel} sm={2}>{ k }</Col>
									<Col sm={10}>
										<FormControl key={k} type="text" name={ k } placeholder={k} value={ this.state[k] }
													 onChange={ (e) => this.handleChange(e, k) }/>
									</Col>
								</FormGroup>);
							}
						)
					}
					<Col sm={2}></Col>
					<Col sm={10}>
						<Button type="submit" bsStyle="primary">Submit</Button>
					</Col>

				</Form>
			</div>
		);
	}
}

export default AbstractForm;
