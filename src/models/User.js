import UserAbstract from '../shared/models/UserAbstract';
import _schema from '../shared/models/schemas/User.json';

/**
 *
 */
class User extends UserAbstract
{

	constructor(params)
	{
		super(params);
		this.setSchema(_schema);
	}

}


export default User;
