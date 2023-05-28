import config from '~/config';
import Auth from '~/layouts/Auth/Auth';
import NavOnly from '~/layouts/Client/NavOnly/NavOnly';
import AccountManager from '~/pages/admin/accountManager/accountManager';
import Category from '~/pages/admin/category/category';
import Overview from '~/pages/admin/overview/overview';
import PostManager from '~/pages/admin/postManager/postManager';
import Chat from '~/pages/client/Chat/chat';
import Home from '~/pages/client/Home';
import ManagePosts from '~/pages/client/ManagePosts';
import PostPage from '~/pages/client/Post';
import Profile from '~/pages/client/Profile/profile';
import UserInfo from '~/pages/client/UserInfo/userInfo';
import ListPostSearch from '~/pages/client/ListPostSearch/listPostSearch';
import Login from '~/pages/login/login';
import Register from '~/pages/register/register';
import VerifiEmailSuccess from '~/pages/verifiEmailSuccess/verifiEmailSuccess';
import { IRoutes } from '~/shared/model/global';
import PostFavourite from '~/pages/client/PostFavourite';
import EditProfile from '~/pages/client/EditProfile';
import ForgotPassword from '~/pages/client/ForgotPassword';
// import PostDetail from '~/pages/client/PostDetail';
import Evaluate from '~/pages/client/Evaluate/evaluate';
import PostDetail from '~/pages/client/PostDetail';

// Public routes
const publicRoutes: IRoutes[] = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: Auth },
    { path: config.routes.register, component: Register, layout: Auth },
    { path: config.routes.verifyEmailSuccess, component: VerifiEmailSuccess, layout: NavOnly },
    { path: config.routes.userInfo, component: UserInfo },
    { path: config.routes.listPostSearch, component: ListPostSearch },
    { path: config.routes.fogotPasswords, component: ForgotPassword },
    { path: config.routes.postDetail, component: PostDetail },
];

const privateRoutesUser: IRoutes[] = [
    { path: config.routes.profile, component: Profile },
    { path: config.routes.chat, component: Chat },
    { path: config.routes.post, component: PostPage, layout: NavOnly },
    { path: config.routes.managePosts, component: ManagePosts },
    { path: config.routes.postFavourite, component: PostFavourite },
    { path: config.routes.editProfile, component: EditProfile },
    { path: config.routes.evaluateUser, component: Evaluate },
];

const privateRoutesAdmin: IRoutes[] = [
    { path: config.routes.homeAdmin, component: Overview },
    { path: config.routes.postManager, component: PostManager },
    { path: config.routes.accountManager, component: AccountManager },
    { path: config.routes.categoryManager, component: Category },
];

export { publicRoutes, privateRoutesAdmin, privateRoutesUser };
