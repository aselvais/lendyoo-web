import AbstractGrid from './GridAbstract';
import _modelSchema from '../shared/models/schemas/Contact.json';

/**
 *
 */
class ContactGrid extends AbstractGrid {
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.modelName = 'contact';
		this.modelSchema = _modelSchema;
		this.collection = this.lendyooRegistry.contactCollection;
		this.init();
	}
}

export default ContactGrid;
