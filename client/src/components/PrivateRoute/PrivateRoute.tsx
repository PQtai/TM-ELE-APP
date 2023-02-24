import { ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { IChildrenComponentProps } from '~/types/models/global';

interface PrivateRouteProps {
   isAuthenticated: boolean;
   component: React.ComponentType<IChildrenComponentProps>;
   children?: ReactNode;
   path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
   isAuthenticated,
   component: Component,
   children: Children,
   path,
   ...rest
}) => {
   return isAuthenticated ? (
      <Route path={path} element={<Component {...rest}>{Children}</Component>} />
   ) : (
      <Route path={path} element={<Navigate to="/login" replace />} />
   );
};

export default PrivateRoute;
