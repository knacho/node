import beerController from './Beer';
import userController from './User';

export default (app) => {
  beerController(app);
  userController(app);
};
