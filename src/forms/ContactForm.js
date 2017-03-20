import AbstractForm from './FormAbstract';
import _modelSchema from '../shared/models/schemas/Contact.json';
import Model from '../shared/models/frontend/Contact';

/**
 *
 */
class ContactForm extends AbstractForm {
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.model = new Model();
		this.modelName = 'contact';
		this.modelSchema = _modelSchema;
		this.init();
	}
}

export default ContactForm;
