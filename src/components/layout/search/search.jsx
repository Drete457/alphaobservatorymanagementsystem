import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { globalList } from 'state/atoms';
import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: state.isFocused ? '#2f4246' : '#2f4246',
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 0, 139, 1)' : '#2f4246',
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isDisabled
      ? 'null'
      : state.isSelected
      ? '#000985'
      : state.isFocused
      ? '#4D58FF'
      : null,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#ffffff',
  }),
  menuList: (base) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
  }),
  menu: (base) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
    background: 'rgba(50, 50, 50, 1)',
    color: '#ffffff',
  }),
  input: (base) => ({
    ...base,
    color: '#ffffff',
  }),
};

const createList = (options) => {
  const optionsList = [];
  Array.from(options)?.forEach((value) => {
    optionsList.push({ label: value.name, value: value.id });
  });

  return optionsList;
};

const Search = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const list = useRecoilValue(globalList);
  const [search, setSearch] = useState(null);
  const optionList = createList(list);

  return (
    <Select
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      styles={customStyles}
      name="search"
      placeholder={t('pages.search')}
      value={search}
      options={optionList}
      autoComplete="off"
      onChange={(event) => {
        setSearch(event);

        if (event) {
          const path = list.find((item) => item.id === event.value);

          history.push(path.link);
        }
      }}
      className="select-style"
      isMulti={false}
      isSearchable={true}
      isClearable={true}
    />
  );
};

export default Search;
