import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel, Button, Alert, Checkbox} from 'react-bootstrap';
import LendyooRegistry from '../libs/LendyooRegistry';

/**
 * Generic form component; will generate a form based on a Mongoose schema stored in this.modelSchema
 */
class AbstractForm extends Component {

	/**
	 * Initialization, taking the schema and building the states with its data
	 */
	init()
	{
		this.state = {
			alertVisible: false,
			alertMessage: '',
			alertStyle: 'info'
		};

		this.modelSchema._id = {"type": "String", "required": false};

		// get selected model from collection
		this.lendyooRegistry = new LendyooRegistry();
	}

	/**
	 *
	 */
	componentDidMount()
	{
		this.setupData();
		this.lendyooRegistry.currentForm = this;
	}

	/**
	 *
	 */
	setupData()
	{
		this._state = {};
		if (this.lendyooRegistry[this.modelName + 'Collection' ])
		{
			this.collection = this.lendyooRegistry[this.modelName + 'Collection' ];
			this.activeModel = this.collection.getActiveModel();
		}

		// setup data
		for (var k in this.modelSchema)
		{
			if (this.modelSchema.hasOwnProperty(k)) {
				this._state[k] = this.modelSchema[k].default ? this.modelSchema[k].default : "";
				if (this.activeModel && this.activeModel[k])
					this._state[k] = this.activeModel[k];
			}
		}
		console.log(this._state);
		this.setState(this._state);
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
		// console.log(_o);
		this.setState(_o);
	}

	/**
	 * Saves the data using the frontend model
	 * @returns {*|Promise.<TResult>}
	 */
	save()
	{
		this.model.populateParams(this.state);
		// @todo To implement this here this.model.validate();
		return this.model.save();
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
		this.save().then(
			function (statusBoolean)
			{
				var jsonData = that.model.validationErrorObject;
				if (jsonData !== false)
				{
					if (jsonData.error === 1)
					{
						var emsg = ': ';
						if (jsonData.data) {
							for (var i in jsonData.data)
							{
								if (jsonData.data[i] && jsonData.data[i].message)
									emsg += ' ' + jsonData.data[i].message + "\n";
							}
						}
						emsg += '';
						that.handleAlertShow(jsonData.message + emsg, 'danger');
					}
					else if (jsonData.error === 0)
					{
						that.handleAlertShow(jsonData.message, 'success');
					} else
						that.handleAlertShow('Unknown error', 'danger');
				} else
					that.handleAlertShow('Unknown error', 'danger');
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
