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
				if (_model[i])
					toret.push(<td key={_model._id + i}>{_model[i]}</td>);
				else
					toret.push(<td key={_model._id + i}></td>);
			}
		}
		return toret;
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
