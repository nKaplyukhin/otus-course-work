import { useToken } from 'hooks/useToken';
import { useLocation, useNavigate } from 'react-router-dom';

export const useIsLoginNavigation = () => {
  const token = useToken()
  const location = useLocation();
  const navigate = useNavigate();



  if (token && location.state?.from) setTimeout(() => navigate(location.state?.from));
};
