import { useState, useLayoutEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputField, SelectFieldComponent } from 'components/registration-form';
import ErrorInfo from 'components/error';
import Submit from 'components/user/buttons/submit';
import userHandler from 'helpers/user';
import uniqueId from 'helpers/id-generator';
import homeHandler from 'helpers/users';
import { useGetUsers } from 'hooks/users';
import { useGetCountries } from 'hooks/countries';
import { useGetGeneric } from 'hooks/generic';
import moment from 'moment-timezone';

sessionStorage.removeItem('cardsPosition');
localStorage.removeItem('cardsPosition');

const RegistrationForm = () => {
  const [t] = useTranslation();
  const [user, setUser] = useState({
    ...userHandler.userFormat,
    id: uniqueId(),
  });
  const [wasModified, setWasModified] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
  const [error, setError] = useState(null);
  const [validName, setValidName] = useState(false);
  const [hour, setHour] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [countries, setCountries] = useState([]);
  const [generic, setGeneric] = useState({});
  const [collaboratorsList, setCollaboratorsList] = useState([]);

  const { data: usersListData, execute } = useGetUsers();
  const { data: countriesListData, execute: executeCountries } =
    useGetCountries();
  const { data: genericListData, execute: executeGeneric } = useGetGeneric();

  useLayoutEffect(() => {
    execute();
    executeCountries();
    executeGeneric();
  }, [execute, executeCountries, executeGeneric]);

  useLayoutEffect(() => {
    if (Object.keys(usersListData).length > 0 && countriesListData.length > 0) {
      const collaboratorsData = usersListData
        ? Object.values(usersListData)
        : [];
      const collaboratorsSort = collaboratorsData.sort((value1, value2) =>
        homeHandler.sortList(value1, value2, 'name'),
      );

      const collaborators = collaboratorsSort.map?.((user) => {
        return { id: user.id, name: user.name, link: `/user/view/${user.id}` };
      });

      const date = new Date().toISOString().split('T')[0];
      const newCountriesList = countriesListData.map((country) => {
        return {
          id: country.id,
          name: country.country,
          ...country,
          gmt: moment(date).tz(country.timezone).format('Z'),
        };
      });

      setCountries(newCountriesList);
      setCollaboratorsList(collaborators);
    }
  }, [
    setCountries,
    setGeneric,
    usersListData,
    countriesListData,
    genericListData,
  ]);

  useLayoutEffect(() => {
    if (genericListData) setGeneric(genericListData);
  }, [genericListData]);

  useLayoutEffect(() => {
    if (user.name) {
      const result = userHandler.validName(user?.name, collaboratorsList);

      setErrorMsg(!result === false ? { name: true } : { name: false });

      setValidName(!result);
    }
  }, [user.name, collaboratorsList]);

  useLayoutEffect(() => {
    if (user.country) {
      const zone = countries.find(
        (country) => country.id === user.country,
      )?.timezone;

      homeHandler.minuteUpdate(setHour);
      setTimeZone(zone);
    }
  }, [user.country, countries]);
  console.log(user);
  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <form className="background">
          <Prompt
            when={wasModified}
            message={() => t('pages.user.leaving-the-page')}
          />

          {/*    <Submit
            user={user}
            setErrorMsg={setErrorMsg}
            setError={setError}
            setWasModified={setWasModified}
            validName={validName}
            hour={hour}
            timeZone={timeZone}
          /> */}

          <header>
            <h1 className="title-registration">
              Welcome to Alpha Observatory Registration Form / Formulario de
              Registro del Observatorio Alfa
            </h1>
          </header>

          <main>
            <div className="input-margin">
              <InputField
                title="Name / Nombre"
                name="name"
                placeholder="Write your name / Escribe tu nombre"
                type="text"
                value={user?.name}
                errorMsg={errorMsg?.name}
                onChange={(event) => {
                  userHandler.userInputHandler(event, setUser, user);
                  setWasModified(true);
                }}
                className="input-registration"
                validName={validName}
              />

              <SelectFieldComponent
                title="Birth Year / Nacimiento sí"
                name="birthyear"
                placeholder="Select your birth year / Seleccione su año de nacimiento"
                value={user?.birthyear}
                errorMsg={errorMsg?.birthyear}
                onChange={(value) => {
                  userHandler.userSelectHandler(
                    'birthyear',
                    value,
                    setUser,
                    user,
                  );
                  setWasModified(true);
                }}
                options={generic.years ?? []}
                className="input-registration"
              />
            </div>

            <div className="input-margin">
              <SelectFieldComponent
                title="Who invited you to Alpha Observatory? / Quién te invitó a Alpha Observatory?"
                name="contacted"
                placeholder="Who contacted you / Quem te contatou"
                value={user?.contacted}
                errorMsg={errorMsg?.contacted}
                onChange={(value) => {
                  userHandler.userSelectHandler(
                    'contacted',
                    value,
                    setUser,
                    user,
                  );
                  setWasModified(true);
                }}
                options={userHandler.contactByFilter(collaboratorsList)}
                className="input-registration"
              />

              <SelectFieldComponent
                title="Country / País"
                name="country"
                placeholder="Select your country / Seleccione su país"
                value={user?.country}
                errorMsg={errorMsg?.country}
                onChange={(value) => {
                  userHandler.userSelectHandler(
                    'country',
                    value,
                    setUser,
                    user,
                  );
                  setWasModified(true);
                }}
                options={countries}
                className="input-registration"
              />
            </div>

            <div className="input-margin">
              <SelectFieldComponent
                title="Gender / Género"
                name="gender"
                placeholder="Select your gender / Seleccione su género"
                value={user?.gender}
                errorMsg={errorMsg?.gender}
                onChange={(value) => {
                  userHandler.userSelectHandler('gender', value, setUser, user);
                  setWasModified(true);
                }}
                options={generic.gender ?? []}
                className="input-registration"
              />

              <SelectFieldComponent
                title="Employment / Empleo"
                name="employment"
                placeholder="Select your employment / Seleccione su empleo"
                value={user?.employment}
                errorMsg={errorMsg?.employment}
                onChange={(value) => {
                  userHandler.userSelectHandler(
                    'employment',
                    value,
                    setUser,
                    user,
                  );
                  setWasModified(true);
                }}
                options={generic.ocupation ?? []}
                className="input-registration"
              />
            </div>

            <div className="input-margin">
              <SelectFieldComponent
                title="How did you hear about us? / ¿Cómo se enteró de nosotros?"
                name="typeSurvey"
                placeholder="Select your answer / Seleccione su respuesta"
                value={user?.typeSurvey}
                errorMsg={errorMsg?.typeSurvey}
                onChange={(value) => {
                  userHandler.userSelectHandler(
                    'typeSurvey',
                    value,
                    setUser,
                    user,
                  );
                  setWasModified(true);
                }}
                options={generic.survey ?? []}
                className="input-registration"
              />

              <SelectFieldComponent
                title="Choose your social media / Elige tu red social"
                name="social"
                placeholder="Select your social media / Seleccione su red social"
                value={user?.social}
                onChange={(value) => {
                  userHandler.userSocialSelectHandler(
                    'social',
                    value,
                    setUser,
                    user,
                  );
                  setWasModified(true);
                }}
                options={generic.socialmedia ?? []}
                className="input-registration"
                isMulti={true}
              />
            </div>

            {Array.from(user.socialInfo)?.map?.((social, index) => {
              const socialMedia = generic.socialmedia.find(
                (socialMedia) => socialMedia.id === social.id,
              );

              return (
                <InputField
                  key={socialMedia.id}
                  title={socialMedia.name}
                  name={socialMedia.id}
                  placeholder="Write your social media / Escribe tu red social"
                  type="text"
                  value={social.name}
                  errorMsg={!social.name ? errorMsg?.socialInfo : ''}
                  onChange={(event) => {
                    userHandler.userSocialInfoHandler(
                      'socialInfo',
                      event,
                      setUser,
                      user,
                      index,
                    );
                  }}
                  className="input-registration"
                />
              );
            })}
          </main>
        </form>
      )}
    </>
  );
};

export default RegistrationForm;
