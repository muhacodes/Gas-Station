import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/customHooks';
import { isTokenExpired } from '../../store/helpers/authUtils';

// This props interface now expects children
interface ProtectedRouteProps {
  children: React.ReactNode;
  path?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, ...res }) => {
  const auth = useAppSelector((state) => state.auth);


  if(auth.refresh_token_expires !== ""){
    if(isTokenExpired(auth.refresh_token_expires)){
      return <Navigate to="/auth/login" replace />;
    }
    console.log();
    // if(res.path === '/settings' && auth.user.is_admin === false){
    //   return <Navigate to="/department" replace />; 
    // }
    return <>{children}</>;
  }else{

    return <Navigate to="/auth/login" replace />;
  }
  // if (!auth.list.refresh) {
  // } else {
  //   return <>{children}</>;
  // }
};

export default ProtectedRoute;
