import AbstractForm from './FormAbstract';
import _modelSchema from '../shared/models/schemas/Loan.json';
import Model from '../shared/models/frontend/Loan';


/**
 *
 */
class LoanForm extends AbstractForm {
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.model = new Model();
		this.modelName = 'loan';
		this.modelSchema = _modelSchema;
		this.init();
	}
}

export default LoanForm;
