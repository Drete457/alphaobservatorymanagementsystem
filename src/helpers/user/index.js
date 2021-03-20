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
};

export default userHandler;
