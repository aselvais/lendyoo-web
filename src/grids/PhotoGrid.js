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
		this.init();
	}


	/**
	 * Returns a filtered/enhanced representation of a field
	 * @param e
	 * @param key
	 * @returns {*}
	 */
	filterEntryDislpay(e, key)
	{
		if (key === 'data')
		{
			return (<img src={ 'data:image/jpg;base64, '+ e } width="200" alt="Red dot" />);
		}
		else
			return super.filterEntryDislpay(e, key);
	}

}

export default PhotoGrid;
