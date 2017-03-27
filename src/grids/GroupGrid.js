import AbstractGrid from './GridAbstract';
import _modelSchema from '../shared/models/schemas/Group.json';

/**
 *
 */
class GroupGrid extends AbstractGrid {
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.modelName = 'group';
		this.modelSchema = _modelSchema;
		this.collection = this.lendyooRegistry.groupCollection;
		this.init();
	}
}

export default GroupGrid;
