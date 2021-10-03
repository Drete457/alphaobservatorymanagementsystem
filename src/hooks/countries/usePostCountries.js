import { useState, useCallback } from 'react';
import { getDatabase, ref, update } from 'firebase/database';
import { countries as referecence } from 'components/user';

export const postCountries = async (countries, setData) => {
  const database = getDatabase();
  const dbRef = ref(database);
  const updates = {};

  countries?.forEach((country, index) => {
    updates[referecence + index] = country;
  });

  await update(dbRef, updates).then(() => setData(true));
};

const usePostCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (countries) => {
    try {
      setIsLoading(true);
      postCountries(countries, setData);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, []),
  };
};

export default usePostCountries;
