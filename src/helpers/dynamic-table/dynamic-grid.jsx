/* eslint-disable default-case */
import { memo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTranslation } from 'react-i18next';
import homeHandler from 'helpers/users';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey(process.env.REACT_APP_AG_LICENSE);

const DynamicGrid = ({
  data,
  fieldsTable,
  setGridApi,
  updateDynamicTableRegisteredNumber,
}) => {
  const [t] = useTranslation();
  const fields = homeHandler.fields(t);
  const columnDefs = [];
  let mutationObserver = MutationObserver;

  const blanks = (params) => {
    const value = params.value;

    if (value === ' ') {
      return t('user.fields.empty.title');
    }

    return value;
  };

  //generate columns for the dynamic table
  Array.from(fieldsTable || fields).forEach((field) => {
    if (field.key !== 'timezone') {
      columnDefs.push({
        headerName: field.label,
        field: field.key,
        filterParams: {
          valueFormatter: blanks,
        },
      });
    }
  });

  const onGridReady = (params) => {
    // css class selectors
    const headerSelector = '.ag-header';
    const scrollSelector = '.ag-body-horizontal-scroll';
    const scrollViewportSelector = '.ag-body-horizontal-scroll-viewport';
    const scrollContainerSelector = '.ag-body-horizontal-scroll-container';

    // get scrollbar elements
    const scrollElement = document.querySelector(scrollSelector);
    const scrollViewportElement = document.querySelector(
      scrollViewportSelector,
    );
    const scrollContainerElement = document.querySelector(
      scrollContainerSelector,
    );

    // create scrollbar clones
    const cloneElement = scrollElement.cloneNode(true);
    const cloneViewportElement = cloneElement.querySelector(
      scrollViewportSelector,
    );
    const cloneContainerElement = cloneElement.querySelector(
      scrollContainerSelector,
    );

    // insert scrollbar clone
    const headerElement = document.querySelector(headerSelector);
    headerElement.insertAdjacentElement('afterend', cloneElement);

    // add event listeners to keep scroll position synchronized
    scrollViewportElement.addEventListener('scroll', () =>
      cloneViewportElement.scrollTo({ left: scrollViewportElement.scrollLeft }),
    );
    cloneViewportElement.addEventListener('scroll', () =>
      scrollViewportElement.scrollTo({ left: cloneViewportElement.scrollLeft }),
    );

    // create a mutation observer to keep scroll size synchronized
    mutationObserver = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        switch (mutation.target) {
          case scrollElement:
            cloneElement.setAttribute(
              'style',
              scrollElement.getAttribute('style'),
            );
            break;
          case scrollViewportElement:
            cloneViewportElement.setAttribute(
              'style',
              scrollViewportElement.getAttribute('style'),
            );
            break;
          case scrollContainerElement:
            cloneContainerElement.setAttribute(
              'style',
              scrollContainerElement.getAttribute('style'),
            );
            break;
        }
      }
    });

    // start observing the scroll elements for `style` attribute changes
    mutationObserver.observe(scrollElement, {
      attributeFilter: ['style'],
      subtree: true,
    });

    setGridApi(params.api);

    const updateData = () => params.api.setRowData(data.slice(0, data.length));
    updateData();
  };

  useEffect(() => {
    return () => {
      setGridApi(null);
    };
  }, [setGridApi]);

  return (
    <AgGridReact
      defaultColDef={{
        sortable: true,
        filter: true,
      }}
      columnDefs={columnDefs}
      pagination={true}
      onGridReady={onGridReady}
      animateRows={true}
      rowData={data}
      onModelUpdated={updateDynamicTableRegisteredNumber}
      alwaysShowHorizontalScroll={true}
    ></AgGridReact>
  );
};

export default memo(DynamicGrid);
