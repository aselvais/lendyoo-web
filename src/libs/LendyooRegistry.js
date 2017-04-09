import Config from '../shared/models/frontend/Config';

import ContactCollection from '../shared/models/frontend/ContactCollection';
import LoanCollection from '../shared/models/frontend/LoanCollection';
import PhotoCollection from '../shared/models/frontend/PhotoCollection';
import UserCollection from '../shared/models/frontend/UserCollection';
import GroupCollection from '../shared/models/frontend/GroupCollection';

// container for the singleton
let _instance=null;

/**
 *
 */
class LendyooRegistry
{

	constructor()
	{
		if (!_instance)
		{
			this.config = new Config(process.env.NODE_ENV);
			// models container
			this.contactCollection = new ContactCollection();
			this.loanCollection = new LoanCollection();
			this.photoCollection = new PhotoCollection();
			this.userCollection = new UserCollection();
			this.groupCollection = new GroupCollection();

			_instance = this;
		}
		return _instance;
	}


}


export default LendyooRegistry;
