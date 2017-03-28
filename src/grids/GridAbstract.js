import React, {Component} from 'react';
import {Table, Glyphicon, Button} from 'react-bootstrap';
import LendyooRegistry from '../libs/LendyooRegistry';

/**
 *
 */
class AbstractGrid extends Component {

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.lendyooRegistry = new LendyooRegistry();
		this.collection = null;
		this.state = {
			models: [],
			activeId: null
		};
	}

	/**
	 * Initialization, taking the schema and building the states with its data
	 */
	init()
	{
		this.refreshData();
	}

	/**
	 *
	 * @returns {Promise.<TResult>}
	 */
	refreshData() {
		var that = this;
		return that.collection.setRemoteCollection().then(
			function(d) {
				that.setState({models: that.collection.models });
			},
			function(er) {
				console.error(er);
			}
		);
	}

	 /**
	 *
	 * @param {ModelAbstract} _model
	 * @returns {Array}
	 */
	getTableLine(_model)
	{
		var toret = [];
		for (var i in this.modelSchema)
		{
			if (_model._id)
			{
				if (typeof _model[i] !== 'undefined')
					toret.push(<td key={_model._id + i}>{ this.filterEntryDislpay(_model[i]) }</td>);
				else
					toret.push(<td key={_model._id + i}></td>);
			}
		}
		return toret;
	}

	/**
	 *
	 * @param e
	 * @returns {*}
	 */
	filterEntryDislpay(e)
	{
		/**
		 * boolean, null, undefined, number, string
		 */
		var _type = typeof e;
		if (_type === 'string')
		{
			var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var mongoDbId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
			if (regEmail.test(e))
				_type = 'email';
			if (mongoDbId.test(e))
				_type = 'mongoDBid';
		}

		switch (_type)
		{
			case "object":
				return JSON.stringify(e);
			case "email":
				return (<a href={ 'mailto:'+e }>{e}</a>);
			case "mongoDBid":
				return (<a onClick={ () => this.showEntry(e) }>{e}</a>);
			case "boolean":
				return (e === true) ? (<center><Glyphicon glyph="check" /></center>) : (<center><Glyphicon glyph="unchecked" /></center>);
			default:
				return e;
		}
	}

	/**
	 * Show an entry with the _id passed as param
	 * @param _id
	 */
	showEntry(_id='')
	{
		alert('_id: ' + _id + ', BaseModelName: ' + this.modelName + ', ModelName: SHOULD BE THE ENTRY KEY MINUS _id');
	}

	/**
	 *
	 * @param {ModelAbstract}  _model
	 */
	deleteEntry(_model)
	{
		var _that = this;
		if (confirm('Are you sure you want to delete this entry?'))
		{
			_model.delete().then(
				function(d) {
					if (d && d.error === 0 && d.data && d.data.n && d.data.n === 1)
					{
						_that.collection.removeModel(_model);
						_that.setState({models: _that.collection.models });
					}
					else
						console.error('Delete - missing params', d);
				},
				function(err) {
					console.error('Could not delete the entry', err);
				},
			);
		}
	}

	/**
	 *
	 * @param {ModelAbstract} _model
	 */
	editEntry(_model)
	{
		this.collection.setActiveModel(_model);
		this.setState({activeId: _model.id});
//		this.forceUpdate();
	}

	/**
	 * Render the form
	 * @returns {XML}
	 */
	render()
	{
		var that = this;
		return (
			<div>
				<Table striped bordered condensed hover>
					<thead>
					<tr>
						{
							Object.keys(this.modelSchema).map((k) =>
								{
									return ( <th key={k}>{k}</th> );
								}
							)
						}
						<td></td>
					</tr>
					</thead>
					<tbody>
					{
						this.state.models.map(function (o)
						{
							return (<tr key={o._id}>{ that.getTableLine(o) }
								<td>
									<Button onClick={ () => that.deleteEntry(o) } bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="trash"/></Button>&nbsp;
									<Button onClick={ () => that.editEntry(o) } bsSize="xsmall" bsStyle="success"><Glyphicon glyph="pencil"/></Button>&nbsp;
								</td>
							</tr>);
						})
					}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default AbstractGrid;
