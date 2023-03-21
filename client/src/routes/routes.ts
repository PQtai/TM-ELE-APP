import config from '~/config';
import Auth from '~/layouts/Auth/Auth';
import AccountManager from '~/pages/admin/AccountManager/accountManager';
import Category from '~/pages/admin/Category/Category';
import Overview from '~/pages/admin/Overview/overview';
import PostManager from '~/pages/admin/PostManager/postManager';
import Chat from '~/pages/client/Chat/Chat';
import Home from '~/pages/client/Home';
import Profile from '~/pages/client/Profile/Profile';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import { IRoutes } from '~/shared/model/global';

// Public routes
const publicRoutes: IRoutes[] = [
   { path: config.routes.home, component: Home },
   { path: config.routes.login, component: Login, layout: Auth },
   { path: config.routes.register, component: Register, layout: Auth },
];

const privateRoutesUser: IRoutes[] = [
   { path: config.routes.profile, component: Profile, layout: Auth },
   { path: config.routes.chat, component: Chat },
];

const privateRoutesAdmin: IRoutes[] = [
   { path: config.routes.homeAdmin, component: Overview },
   { path: config.routes.postManager, component: PostManager },
   { path: config.routes.accountManager, component: AccountManager },
   { path: config.routes.categoryManager, component: Category },
];

export { publicRoutes, privateRoutesAdmin, privateRoutesUser };
