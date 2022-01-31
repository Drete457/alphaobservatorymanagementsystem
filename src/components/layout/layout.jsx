import { useState, useLayoutEffect } from 'react';
import { useGetCountries } from 'hooks/countries';
import { useGetGeneric } from 'hooks/generic';
import { useGetUsers } from 'hooks/users';
import { useGetReceptionCards } from 'hooks/reception';
import { useSetRecoilState } from 'recoil';
import { countries, generic, users, globalList } from 'state/atoms';
import homeHandler from 'helpers/users';
import Sidebar from './sidebar';
import Aside from './aside';
import Header from './header';
import Content from './content';
import ContextMenu from 'components/context-menu';

const Layout = () => {
  //delete the remain of cards positions on localStorage
  sessionStorage.removeItem('cardsPosition');
  localStorage.removeItem('cardsPosition');

  const [promiseResolved, setPromiseResolved] = useState({
    collaboratos: false,
    reception: false,
    countries: false,
    generic: false,
  });

  const setCountries = useSetRecoilState(countries);
  const setGeneric = useSetRecoilState(generic);
  const setListUsers = useSetRecoilState(users);
  const setGlobalList = useSetRecoilState(globalList);

  const { data, execute } = useGetUsers();
  const { data: dataEntry, execute: executeEntry } = useGetReceptionCards();
  const { data: countriesList, execute: executeCountries } = useGetCountries();
  const { data: genericList, execute: executeGeneric } = useGetGeneric();

  useLayoutEffect(() => {
    execute();
  }, [execute]);

  useLayoutEffect(() => {
    if (data && !promiseResolved.collaboratos) {
      setPromiseResolved({ ...promiseResolved, collaboratos: true });
      executeEntry();
    }

    if (dataEntry && !promiseResolved.reception) {
      setPromiseResolved({ ...promiseResolved, reception: true });
      executeCountries();
    }

    if (countriesList && !promiseResolved.countries) {
      setPromiseResolved({ ...promiseResolved, countries: true });
      executeGeneric();
    }

    if (genericList && !promiseResolved.generic) {
      setPromiseResolved({ ...promiseResolved, generic: true });
    }
  }, [
    data,
    dataEntry,
    countriesList,
    genericList,
    promiseResolved,
    executeEntry,
    executeCountries,
    executeGeneric,
  ]);

  useLayoutEffect(() => {
    const resultArray = Object.values(promiseResolved);

    if (resultArray.every((item) => item === true)) {
      const collaboratorsData = data ? Object.values(data) : [];
      const collaboratorsSort = collaboratorsData.sort((value1, value2) =>
        homeHandler.sortList(value1, value2, 'name'),
      );
      const receptionCardsData = dataEntry ? Object.values(dataEntry) : [];
      const receptionCardsSort = receptionCardsData.sort((value1, value2) =>
        homeHandler.sortList(value1, value2, 'name'),
      );

      const collaborators = collaboratorsSort.map?.((user) => {
        return { id: user.id, name: user.name, link: `/user/view/${user.id}` };
      });

      const entries = receptionCardsSort?.map?.((entry) => {
        return {
          id: entry.id,
          name: entry.name,
          link: `/reception/reception_edit/${entry.id}`,
        };
      });

      const collaboratorsWithFollowers =
        homeHandler.buildUsersListFilter(collaboratorsSort);
      collaboratorsWithFollowers.unshift({ id: '1', name: 'None' });

      const obj = {
        collaborators: collaboratorsData,
        entries: receptionCardsData,
        usersWithFollowers: collaboratorsWithFollowers,
      };

      setCountries(countriesList);
      setGeneric(genericList);
      setGlobalList([...collaborators, ...entries]);
      setListUsers(obj);
    }
  }, [
    data,
    dataEntry,
    countriesList,
    genericList,
    setGlobalList,
    setListUsers,
    setCountries,
    setGeneric,
    promiseResolved,
  ]);

  return (
    <>
      {false && <ContextMenu />}
      <div className="c-app c-classic-layout">
        <Sidebar />
        <Aside />
        <div className="c-wrapper">
          <Header />
          <div className="c-body">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
