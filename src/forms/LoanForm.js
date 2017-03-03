import AbstractForm from './FormAbstract';
import _modelSchema from '../shared/models/schemas/Loan.json';


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
		this.modelSchema = _modelSchema;
		this.init();
	}
}

export default LoanForm;
