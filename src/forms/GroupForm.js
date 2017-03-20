import AbstractForm from './FormAbstract';
import _modelSchema from '../shared/models/schemas/Group.json';
import Model from '../shared/models/frontend/Group';

/**
 *
 */
class GroupForm extends AbstractForm {
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.model = new Model();
		this.modelName = 'group';
		this.modelSchema = _modelSchema;
		this.init();
	}
}

export default GroupForm;
