import AbstractGrid from './GridAbstract';
import _modelSchema from '../shared/models/schemas/User.json';

/**
 *
 */
class UserGrid extends AbstractGrid {
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.modelName = 'user';
		this.modelSchema = _modelSchema;
		this.init();
	}
}

export default UserGrid;
