import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import useApi from '../../../services/api/api';
import CheckAuth from "../check-auth/CheckAuth";

const ProtectedRoute: React.FC<{ exact: boolean, path: string, component: React.FC }> = ({ exact, path, component }) => {

  const { verifyToken } = useApi();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await verifyToken();
      setIsAuthenticated(isValid);
      setIsCheckingToken(false);
    }
    checkToken();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isCheckingToken) {
      history.replace("/access");
    }
  }, [isAuthenticated, isCheckingToken, history]);

  if (isCheckingToken) {
    /* return <div>Checking token...</div>; // Puedes reemplazar esto con un componente de carga */
    return <CheckAuth />; 
  }

  return <Route exact={exact} path={path} component={component} />;
}

export default ProtectedRoute;