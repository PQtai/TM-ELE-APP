import config from '~/config';
import overview from '~/pages/admin/overview/overview';
import PostManager from '~/pages/admin/postManager/postManager';
import Home from '~/pages/client/Home';
import { IChildrenComponentProps, IRoutes } from '~/types/models/global';

// Public routes
const publicRoutes: IRoutes[] = [{ path: config.routes.home, component: Home }];

const privateRoutesUser: IRoutes[] = [{ path: config.routes.home, component: Home }];

const privateRoutesAdmin: IRoutes[] = [
   { path: config.routes.homeAdmin, component: overview },
   { path: config.routes.postManager, component: PostManager },
];

export { publicRoutes, privateRoutesAdmin, privateRoutesUser };
