import FrontEndModel from '../shared/models/frontend/ModelAbstract';
/**
 * This is here just to inherit from the front end ModelAbstract.
 * It is needed for the backend and all the shared model system; but on the
 * backend, it doesn't inherit from anthing.
 */
class ModelAbstract extends FrontEndModel
{



}

export default ModelAbstract;