import { useLayoutEffect } from 'react';
import { useGetCountries } from 'hooks/countries';
import { useGetGeneric } from 'hooks/generic';
import { useSetRecoilState } from 'recoil';
import { countries, generic } from 'state/atoms';
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

  const { data: countriesList, execute: executeCountries } = useGetCountries();
  const { data: genericList, execute: executeGeneric } = useGetGeneric();

  useLayoutEffect(() => {
    executeCountries();
    executeGeneric();
  }, [executeCountries, executeGeneric]);

  useLayoutEffect(() => {
    if (countriesList) {
      setCountries(countriesList);
    }

    if (genericList) {
      setGeneric(genericList);
    }
  }, [countriesList, genericList, setCountries, setGeneric]);

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
