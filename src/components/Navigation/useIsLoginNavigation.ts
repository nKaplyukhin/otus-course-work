import { useLocation, useNavigate } from 'react-router-dom';

const token = true
export const useIsLoginNavigation = () => {

  const location = useLocation();
  const navigate = useNavigate();
  if (token && location.state?.from) setTimeout(() => navigate(location.state?.from));
};
