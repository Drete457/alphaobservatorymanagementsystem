import { useLayoutEffect } from 'react';
import { useGetGeneric } from 'hooks/generic';

const Generic = () => {
  const { isLoading, error, data, execute } = useGetGeneric();

  useLayoutEffect(() => {
    execute();
  }, [execute]);
  console.log(data);
  return (
    <>
      <p>hello</p>
    </>
  );
};

export default Generic;
