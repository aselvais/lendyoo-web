import AbstractForm from './FormAbstract';
import _modelSchema from '../shared/models/schemas/User.json';
import Model from '../shared/models/frontend/User';

/**
 *
 */
class UserForm extends AbstractForm {

	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.model = new Model();
		this.modelName = 'user';
		this.modelSchema = _modelSchema;
		this.init();
	}

}

export default UserForm;
