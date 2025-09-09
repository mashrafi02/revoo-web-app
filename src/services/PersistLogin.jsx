import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { useGetMeQuery } from './authApi';

function PersistLogin({ children }) {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && data?.data?.user) {
      dispatch(setUser(data.data.user));
    }
  }, [isSuccess, data, dispatch]);

  return children;
}

export default PersistLogin;
