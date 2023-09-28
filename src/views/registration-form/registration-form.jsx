import { useState, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Prompt } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CButton } from '@coreui/react';
import moment from 'moment-timezone';
import { InputField, SelectFieldComponent } from 'components/registration-form';
import Loading from 'components/loading';
import ErrorInfo from 'components/error';
import userHandler from 'helpers/user';
import uniqueId from 'helpers/id-generator';
import dateGenerator from 'helpers/date-generator';
import { usePostUser } from 'hooks/users';
import { user as userInfo } from 'state/atoms';
import registrationData from 'assets/registration-form-data.json';

sessionStorage.removeItem('cardsPosition');
localStorage.removeItem('cardsPosition');

const submit = (user, setErrorMsg, t, execute, setWasModified, isUser) => {
  if (!userHandler.validation(user, setErrorMsg, t)) {
    setWasModified(false);

    //put the position of the cards in the user before sending them to the back-end
    user.cardsPosition = JSON.parse(sessionStorage.getItem('cardsPosition'));
    sessionStorage.removeItem('cardsPosition');

    //delete all spaces after and before the name
    user.name = user.name.trim();

    //convert all first letter of every word to uppercase
    user.name = userHandler.firstLetterUppercaseOnArray(user.name);

    if (!user?.createDate) {
      user.createDate = dateGenerator();
      user.createUser = '';
    }

    if (!user?.lastModification) {
      user.lastModification = [];
    }

    user.firstActivity = dateGenerator();

    //send the user information for the backend
    execute(user);
  }
};

const RegistrationForm = () => {
  const [t] = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState({
    ...userHandler.userFormat,
    id: uniqueId(),
  });
  const [wasModified, setWasModified] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ ...userHandler.userFormat });
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [generic, setGeneric] = useState({});
  const isUser = useRecoilValue(userInfo);
  const { isLoading, error: errorPost, data, execute } = usePostUser();
  console.log('user', isLoading, errorPost, data);

  useLayoutEffect(() => {
    if (registrationData.countries.length > 0) {
      const date = new Date().toISOString().split('T')[0];
      const newCountriesList = registrationData.countries.map((country) => {
        return {
          id: country.id,
          name: country.country,
          ...country,
          gmt: moment(date).tz(country.timezone).format('Z'),
        };
      });

      setCountries(newCountriesList);
    }
  }, [setCountries, setGeneric]);

  useLayoutEffect(() => {
    if (registrationData.generic) setGeneric(registrationData.generic);
  }, []);

  useLayoutEffect(() => {
    if (data) {
      window.location.href = 'https://alphacommunityworld.org/';
    }
  }, [data, user]);

  useLayoutEffect(() => {
    if (errorPost) setError(errorPost);
  }, [errorPost, setError]);

  return (
    <>
      {error ? (
        <ErrorInfo error={error} />
      ) : (
        <form
          className="background"
          onSubmit={(e) => {
            e.preventDefault();
            user.name = `${firstName} ${lastName}`;
            submit(user, setErrorMsg, t, execute, setWasModified, isUser);
          }}
        >
          <Prompt
            when={wasModified}
            message={() => t('pages.user.leaving-the-page')}
          />

          <header>
            <h1 className="title-registration">
              Welcome to Alpha Community Registration Form / Formulario de
              Registro del Alpha Community
            </h1>
          </header>

          <main>
            <div className="input-margin">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <InputField
                  title="First Name* / Primerizo Nombre*"
                  name="name"
                  placeholder="Write your first name / Escribe tu primerizo nombre"
                  type="text"
                  value={firstName}
                  errorMsg={errorMsg?.name}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                    setWasModified(true);
                  }}
                  className="user-input-format"
                  required
                />

                <InputField
                  title="Surname* / Apellido*"
                  name="name"
                  placeholder="Write your surname / Escribe tu Apellido"
                  type="text"
                  value={lastName}
                  errorMsg={errorMsg?.name}
                  onChange={(event) => {
                    setLastName(event.target.value);
                    setWasModified(true);
                  }}
                  className="user-input-format"
                  required
                />
              </div>

              <InputField
                title="Who contacted you?* / ¿Quién te contactó?*"
                name="contactYouRegistrationForm"
                placeholder="Who contacted you / Persona que te contacto"
                type="text"
                value={user?.contactYouRegistrationForm}
                errorMsg={errorMsg?.contactYouRegistrationForm}
                onChange={(event) => {
                  userHandler.userInputHandler(event, setUser, user);
                  setWasModified(true);
                }}
                className="input-registration"
                required
              />

              <SelectFieldComponent
                title="Birth Year* / Fecha de nacimiento*"
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
                required
              />
            </div>

            <div className="input-margin">
              <SelectFieldComponent
                title="Country* / País*"
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
                required
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
                title="Employment* / Empleo*"
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
                required
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
                required
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
                  placeholder="Type your mobile number or username / Escribe tu número de móvil o nombre de usuario"
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
                  required
                />
              );
            })}
            <div className="user-submit-buttons">
              <CButton
                type="submit"
                color="primary"
                size="xl"
                disabled={isLoading}
              >
                {!isLoading && 'Submit / Entregar'}
                {isLoading && 'Submitting / Entregando'}
              </CButton>
            </div>
            {isLoading && <Loading />}
          </main>
        </form>
      )}
    </>
  );
};

export default RegistrationForm;
