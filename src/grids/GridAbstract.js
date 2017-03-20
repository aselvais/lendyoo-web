import React, {Component} from 'react';
import {Table, Glyphicon, Button} from 'react-bootstrap';

/**
 *
 */
class AbstractGrid extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			dbdata: []
		};
	}

	/**
	 * Initialization, taking the schema and building the states with its data
	 */
	init()
	{
		this.refreshData();
	}

	refreshData()
	{
		var that = this;
		var _baseUrl = 'http://localhost:3010/api-v2/';
		var command = 'getcollection';
		var fetchParams = {
			method: 'GET',
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({'Content-Type': 'application/json'})
		};
		return fetch(_baseUrl + this.modelName + '/' + command, fetchParams).then(
			function (res)
			{
				if (res.status === 200)
				{
					return res.json().then(function (d)
					{
						if (typeof d.error !== 'undefined' && d.error === 0 && d.data)
						{
							that.setState({dbdata: d.data});
							return true;
						}
						else
						{
							return false;
						}
					});
				}
				return false;
			},
			function (err)
			{
				console.error(err);
				return false;
			}
		);
	}

	getTableLine(o = {})
	{
		var toret = [];
		for (var i in this.modelSchema)
		{
			if (o._id)
			{
				if (o[i])
					toret.push(<td key={o._id + i}>{o[i]}</td>);
				else
					toret.push(<td key={o._id + i}></td>);
			}
		}
		return toret;
	}

	deleteEntry(_id='')
	{
		alert(_id);
	}

	editEntry(_id='')
	{
		alert(_id);
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
						this.state.dbdata.map(function (o)
						{
							return (<tr key={o._id}>{ that.getTableLine(o) }
								<td>
									<Button onClick={ () => that.deleteEntry(o._id) } bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="trash"/></Button>&nbsp;
									<Button onClick={ () => that.editEntry(o._id) } bsSize="xsmall" bsStyle="success"><Glyphicon glyph="pencil"/></Button>&nbsp;
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
