import AbstractGrid from './GridAbstract';
import _modelSchema from '../shared/models/schemas/Loan.json';

/**
 *
 */
class LoanGrid extends AbstractGrid {
	/**
	 *
	 * @param props
	 */
	constructor(props)
	{
		super(props);
		this.modelName = 'loan';
		this.modelSchema = _modelSchema;
		this.init();
	}
}

export default LoanGrid;
