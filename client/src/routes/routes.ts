import config from '~/config';
import Auth from '~/layouts/Auth/Auth';
import NavOnly from '~/layouts/Client/NavOnly/NavOnly';
import AccountManager from '~/pages/admin/accountManager/accountManager';
import Category from '~/pages/admin/category/category';
import Overview from '~/pages/admin/overview/overview';
import PostManager from '~/pages/admin/postManager/postManager';
import Chat from '~/pages/client/Chat/chat';
import Home from '~/pages/client/Home';
import PostPage from '~/pages/client/Post';
import Profile from '~/pages/client/Profile/profile';
import Login from '~/pages/login/login';
import Register from '~/pages/register/register';
import VerifyEmail from '~/pages/register/verifyEmail';
import { IRoutes } from '~/shared/model/global';

// Public routes
const publicRoutes: IRoutes[] = [
   { path: config.routes.home, component: Home },
   { path: config.routes.login, component: Login, layout: Auth },
   { path: config.routes.register, component: Register, layout: Auth },
   { path: config.routes.emailVerify, component: VerifyEmail },
];

const privateRoutesUser: IRoutes[] = [
   { path: config.routes.profile, component: Profile, layout: Auth },
   { path: config.routes.chat, component: Chat },
   { path: config.routes.post, component: PostPage, layout: NavOnly },
];

const privateRoutesAdmin: IRoutes[] = [
   { path: config.routes.homeAdmin, component: Overview },
   { path: config.routes.postManager, component: PostManager },
   { path: config.routes.accountManager, component: AccountManager },
   { path: config.routes.categoryManager, component: Category },
];

export { publicRoutes, privateRoutesAdmin, privateRoutesUser };
