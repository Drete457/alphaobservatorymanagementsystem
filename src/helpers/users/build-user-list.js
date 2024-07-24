import homeHandler from '.';
import userHandler from 'helpers/user';

const buildUserList = (
  collaborators,
  collaboratoresWithFollowers,
  countriesList,
  genericList,
  setListUsers,
) => {
  const arrayData = [...collaborators];

  const fillArrayData = arrayData?.map?.((value) => {
    let user = { ...value };

    if (user.followed) {
      const followedBy = collaboratoresWithFollowers?.find?.(
        (value) => value.id === user?.followed,
      )?.name;

      user.followed = followedBy;
    }

    user.timezone = '';
    if (user.country) {
      const countryName = countriesList?.find?.(
        (country) => country.id === user?.country,
      );

      user.timezone = countryName?.timezone;
      user.country = userHandler.countryNameAndGmt(countryName);
    }

    if (user?.social && user?.socialInfo) {
      const contactList = user.social.map((userSocial) => {
        const socialName = genericList?.socialmedia?.find?.(
          (social) => social.id === userSocial,
        );

        return socialName?.name;
      });

      if (contactList.includes('Whatsapp')) {
        const position = contactList.indexOf('Whatsapp');
        const number = user.socialInfo[position]?.name;

        user.socialInfo = `Whatsapp: ${number}`;
      } else {
        user.socialInfo = `${contactList[0]}: ${user.socialInfo[0]?.name}`;
      }
    }

    if (user.personality) {
      const personalityName = genericList?.personality?.find?.(
        (value) => value.id === user.personality,
      )?.name;

      user.personality = personalityName;
    }

    if (user.introductionOption) {
      const introductionOption = genericList?.options?.find?.(
        (value) => value.id === user?.introductionOption,
      )?.name;

      user.introductionOption = introductionOption;
    }

    user.cardsInfo = '';
    user.reservation = '';
    if (user.cards) {
      const cardsNamesArray = user.cards.map((card) => {
        const cardInfo = genericList?.cardTypes?.find?.(
          (value) => value.id === card?.id,
        );

        if ('reservation' in card) {
          user.reservation = card?.reservation;
        }

        return cardInfo?.name;
      });

      user.cardsInfo = cardsNamesArray.join(', ');

      delete user?.cards;
    }

    if (user?.cardsPosition) {
      delete user.cardsPosition;
    }

    if (!user?.invitationAlphaCafe) {
      user.invitationAlphaCafe = '';
    }

    if (user.contacted) {
      let contactBy = collaboratoresWithFollowers?.find?.(
        (value) => value.id === user?.contacted,
      )?.name;

      if (contactBy === 'None') {
        contactBy = 'Training';
      }

      user.contacted = contactBy;
    }

    if (user.gender) {
      const profileName = genericList?.gender?.find?.(
        (value) => value.id === user?.gender,
      )?.name;

      user.gender = profileName;
    }

    if (user.birthyear) {
      const year = genericList?.years?.find?.(
        (year) => year.id === user?.birthyear,
      );
      user.birthyear = year?.name;
      user.groupAge = homeHandler.groupAge(year?.name, genericList?.groupAge);
    } else {
      user.groupAge = '';
    }

    if (user.employment) {
      const employmentName = genericList?.ocupation?.find?.(
        (value) => value.id === user?.employment,
      )?.name;

      user.employment = employmentName;
    }

    if (user?.typeSurvey) {
      const typeSurvey = genericList?.survey?.find?.(
        (value) => value.id === user?.typeSurvey,
      )?.name;

      user.typeSurvey = typeSurvey;
    } else {
      user.typeSurvey = '';
    }

    return user;
  });

  setListUsers(fillArrayData);
};

export default buildUserList;
