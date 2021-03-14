import userFormat from './user-object-format';
import {
  userInputHandler,
  userSelectHandler,
  userSocialSelectHandler,
  userSocialInfoHandler,
} from './user-handler';
import validation from './validation';
import layouts from './layouts';

const userHandler = {
  userFormat,
  userInputHandler,
  userSelectHandler,
  userSocialSelectHandler,
  userSocialInfoHandler,
  validation,
  layouts,
};

export default userHandler;
