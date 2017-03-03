import AbstractForm from './FormAbstract';
import _modelSchema from '../shared/models/schemas/Contact.json';

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
		this.modelName = 'contact';
		this.modelSchema = _modelSchema;
		this.init();
	}
}

export default ContactForm;
