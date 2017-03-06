import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button, Alert, Checkbox} from 'react-bootstrap';

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
		if (e.target.type === 'checkbox')
			_o[k] = !this.state[k];
		else if (e.target.value)
			_o[k] = e.target.value;
		console.log(_o);
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
		var _baseUrl = 'http://localhost:3010/api/';
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
	handleAlertDismiss()
	{
		this.setState({alertVisible: false});
	}

	/**
	 *
	 * @param alertMessage
	 * @param alertStyle
	 */
	handleAlertShow(alertMessage = '', alertStyle = 'info')
	{
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
	 * Returns the form element which form varies according to the schema
	 * @param k
	 * @returns {XML}
	 */
	getFormElement(k)
	{
		var _s = this.modelSchema[k];
		var _reqdeco = '';
		var _reqVal = false;
		var _type = 'text';
		var _element = '';
		if (typeof _s.required !== 'undefined' && _s.required === true)
		{
			_reqdeco = '*';
			_reqVal = true;
		}
		if (k.match(/password/g))
			_type = 'password';
		if (k.match(/email/g))
			_type = 'email';
		if (k.match(/date/g))
			_type = 'date';
		if (_s.type && _s.type === 'Number')
			_type = 'number';

		// form element - checkbox
		if (_s.type && _s.type === "Boolean")
		{
			_element = (<Checkbox key={k} checked={this.state[k]} name={ k } onChange={ (e) => this.handleChange(e, k) }></Checkbox>);
		}
		// form element - select
		else if (_s.enum && _s.enum.length > 0)
		{
			var _options = [];
			_s.enum.map((v) => _options.push( <option key={ k+v } value={v}>{v}</option> ));
			_element = (<FormControl componentClass="select" key={k} name={ k }
									 value={ this.state[k] } required={_reqVal}
									 onChange={ (e) => this.handleChange(e, k) }>{ _options }</FormControl>);
		}
		// form element - other (text)
		else
		{
			_element = (<FormControl key={k} type={ _type } name={ k } placeholder={k} value={ this.state[k] }
									 required={_reqVal} onChange={ (e) => this.handleChange(e, k) }/>);
		}

		return (
			<FormGroup controlId="formHorizontalEmail" key={k}>
				<Col componentClass={ControlLabel} sm={2}>{ k + _reqdeco }</Col>
				<Col sm={10}>{ _element }</Col>
			</FormGroup>
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
				<Alert bsStyle={this.state.alertStyle} onDismiss={() => this.handleAlertDismiss() }
					   className={this.state.alertVisible ? '' : 'hidden' }>
					{ this.state.alertMessage }
				</Alert>
				<Form horizontal onSubmit={ (e) => this.handleSubmit(e) }>
					{ Object.keys(this.modelSchema).map((k) => this.getFormElement(k)) }
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
