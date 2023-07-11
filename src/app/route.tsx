import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  RouteProps,
  useNavigate,
} from 'react-router-dom';
import { useAuth } from './hooks';
import LoginPage from '@/pages/Login';
import HomePage from '@/pages';
import RegistratonPage from '@/pages/Registration';
import UserPage from '@/pages/User';

const redirectPage = '/login';

export const PrivateRoute = ({ children }: RouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const redirectTo =
    location.pathname == '/' ? redirectPage : `${redirectPage}?redirectForm?${location.pathname} `;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate replace={true} state={{ from: location }} to={redirectTo} />
  );
};

export const PublicRoute = ({ children }: RouteProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return <>{!isAuthenticated && children}</>;
};

const TheRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path='/users'
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
        <Route
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
          path='/login'
        />
        <Route
          element={
            <PublicRoute>
              <RegistratonPage />
            </PublicRoute>
          }
          path='/registration'
        />
      </Routes>
    </Router>
  );
};

export default TheRoutes;
