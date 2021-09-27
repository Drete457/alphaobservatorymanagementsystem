import {
  genericCreate,
  genericSave,
  genericCancel,
  genericDelete,
  inputHandler,
  bodyHandler,
  selectHandler,
} from './generic-handler';
import validateGeneric from './validation';

const countriesHandler = {
  genericCreate,
  genericSave,
  genericCancel,
  genericDelete,
  inputHandler,
  bodyHandler,
  selectHandler,
  validateGeneric,
};

export default countriesHandler;
