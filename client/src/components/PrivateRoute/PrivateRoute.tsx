import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { IChildrenComponentProps } from '~/shared/model/global';

interface PrivateRouteProps {
   isAuthenticated: boolean;
   component: React.ComponentType<IChildrenComponentProps>;
   children?: ReactNode;
}

const PrivateRoute = ({
   isAuthenticated,
   component: Component,
   children: Children,
   ...rest
}: PrivateRouteProps) => {
   // const navigate = useNavigate();
   return isAuthenticated ? <Component {...rest}>{Children}</Component> : <Navigate to="/login" />;
};

export default PrivateRoute;
