import userFormat from './user-object-format';
import {
  userInputHandler,
  userSelectHandler,
  userSocialSelectHandler,
  userSocialInfoHandler,
} from './user-handler';
import validation from './validation';
import layouts from './layouts';
import countryNameAndGmt from './country-name-gmt';
import updateCardsPosition from './save-cards-position';
import cardsIdToPutDate from './properties-receive-date';
import deviceOrientation from './device-orientation';
import screenOrientation from '../user/screen-orientation';
import validName from './validName';
import contactByFilter from './contactbyfilter';

const userHandler = {
  userFormat,
  userInputHandler,
  userSelectHandler,
  userSocialSelectHandler,
  userSocialInfoHandler,
  validation,
  layouts,
  countryNameAndGmt,
  updateCardsPosition,
  cardsIdToPutDate,
  deviceOrientation,
  screenOrientation,
  validName,
  contactByFilter,
};

export default userHandler;
