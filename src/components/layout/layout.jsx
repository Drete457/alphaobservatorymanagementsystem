import { useLayoutEffect } from 'react';
import { useGetCountries } from 'hooks/countries';
import { useGetGeneric } from 'hooks/generic';
import { useGetUsers } from 'hooks/users';
import { useGetReceptionCards } from 'hooks/reception';
import { useSetRecoilState } from 'recoil';
import { countries, generic, users, globalList, logs } from 'state/atoms';
import homeHandler from 'helpers/users';
import Sidebar from './sidebar';
import Aside from './aside';
import Header from './header';
import Content from './content';

const Layout = () => {
  //delete the remain of cards positions on localStorage
  sessionStorage.removeItem('cardsPosition');
  localStorage.removeItem('cardsPosition');

  const setCountries = useSetRecoilState(countries);
  const setGeneric = useSetRecoilState(generic);
  const setListUsers = useSetRecoilState(users);
  const setGlobalList = useSetRecoilState(globalList);
  const setLogs = useSetRecoilState(logs);

  const { data, execute } = useGetUsers();
  const { data: dataEntry, execute: executeEntry } = useGetReceptionCards();
  const { data: countriesList, execute: executeCountries } = useGetCountries();
  const { data: genericList, execute: executeGeneric } = useGetGeneric();

  useLayoutEffect(() => {
    execute();
    executeEntry();
    executeCountries();
    executeGeneric();
  }, [execute, executeEntry, executeCountries, executeGeneric]);

  useLayoutEffect(() => {
    if (countriesList) {
      setCountries(countriesList);
    }

    if (genericList) {
      setGeneric(genericList);
    }
  }, [countriesList, genericList, setCountries, setGeneric]);

  useLayoutEffect(() => {
    const collaboratorsLogs = [];
    const entriesLogs = [];

    if (data && genericList && countriesList) {
      homeHandler.buildUserList(data, countriesList, genericList, setListUsers);
    }

    if (data && dataEntry) {
      const collaboratorsData = Object.values(data);
      const receptionCardsData = Object.values(dataEntry);

      const collaborators = collaboratorsData.map?.((user) => {
        if (user?.lastModification) {
          user.lastModification.forEach((log) =>
            collaboratorsLogs.push({ ...log, name: user.name }),
          );
        }

        return { id: user.id, name: user.name, link: `/user/view/${user.id}` };
      });

      const entries = receptionCardsData?.map?.((entry) => {
        if (entry?.lastModification) {
          entry.lastModification.forEach((log) => {
            entriesLogs.push({ ...log, name: entry.name });
          });
        }

        return {
          id: entry.id,
          name: entry.name,
          link: `/reception/reception_edit/${entry.id}`,
        };
      });

      setGlobalList([...collaborators, ...entries]);
      setLogs({
        collaborators: collaboratorsLogs,
        entries: entriesLogs,
      });
    } else if (data) {
      const collaboratorsData = Object.values(data);
      const collaborators = collaboratorsData.map?.((user) => {
        if (user?.lastModification) {
          user.lastModification.forEach((log) =>
            collaboratorsLogs.push({ ...log, name: user.name }),
          );
        }

        return { id: user.id, name: user.name, link: `/user/view/${user.id}` };
      });

      setGlobalList(collaborators);
      setLogs({
        collaborators: collaboratorsLogs,
      });
    }
  }, [
    data,
    dataEntry,
    countriesList,
    genericList,
    setListUsers,
    setGlobalList,
    setLogs,
  ]);

  return (
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
  );
};

export default Layout;
