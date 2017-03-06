import AbstractForm from './FormAbstract';
import _modelSchema from '../shared/models/schemas/Group.json';

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
		this.modelName = 'group';
		this.modelSchema = _modelSchema;
		this.init();
	}
}

export default GroupForm;
