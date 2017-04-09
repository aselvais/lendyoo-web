import AbstractForm from './FormAbstract';
import _modelSchema from '../shared/models/schemas/Photo.json';
import Model from '../shared/models/frontend/Photo';

/**
 *
 */
class PhotoForm extends AbstractForm {
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.model = new Model();
		this.modelName = 'photo';
		this.modelSchema = _modelSchema;
		this.init();
	}
}

export default PhotoForm;
