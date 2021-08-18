import { useLayoutEffect } from 'react';
import useGetActivity from 'hooks/activities/useGetActivity';

const ViewActivity = ({ match }) => {
  const { data, execute } = useGetActivity();

  useLayoutEffect(() => {
    const id = match.params.id;
    execute(id);
  }, [match, execute]);

  useLayoutEffect(() => {
    if (data) {
      console.log('data: ', data);
    }
  });

  return (
    <>
      <p>view</p>
    </>
  );
};

export default ViewActivity;
