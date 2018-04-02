import AbstractGrid from './GridAbstract';
import _modelSchema from '../shared/models/schemas/Photo.json';
import React from 'react';

/**
 *
 */
class PhotoGrid extends AbstractGrid {

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.modelName = 'photo';
		this.modelSchema = _modelSchema;
		this.collection = this.lendyooRegistry.photoCollection;
	}

	/**
	 * Returns a filtered/enhanced representation of a field
	 * @param e
	 * @param key
	 * @returns {*}
	 */
	filterEntryDislpay(e, key, model)
	{
		if (key.toString() === 'Loan_id')
		{
			var toret = [];
			var imgurl = this.lendyooRegistry.config.API_URL + '/api-v2/photo/getloanimage/' + model.Loan_id + '/150';
			toret.push( super.filterEntryDislpay(e, key, model) );
			toret.push(<img alt={ 'img-' + model.Loan_id} src={ imgurl } width="150" />);
			return toret;
		}
		else
			return super.filterEntryDislpay(e, key, model);
	}

}

export default PhotoGrid;
