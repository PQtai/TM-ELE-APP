import accountManager from '~/pages/admin/accountManager/accountManager.reducer';
import register from '~/pages/register/register.reducer';
import login from '~/pages/login/login.reducer';
import postSlice from '~/pages/client/Post/post.reducer';
import selectLabelSlice from '~/components/SelectLabel/SelectLabel.reducer';
import OverlaySlice from '~/components/Overlay/overlay.reducer';
import loadingSlice from '~/components/Loading/Loading.reducer';
import alertSlice from '~/components/Alerts/Alerts.reducer';
import postAuthorSlice from '~/pages/client/ManagePosts/managePosts.reducer';
import postRoleAdminSlice from '~/pages/admin/postManager/postManager.reducer';
import postListSlice from '~/pages/client/Home/home.reducer';
import userDetailSlice from '~/pages/client/UserInfo/userInfo.reducer';
import postListSearchSlice from '~/pages/client/ListPostSearch/listPostSearch.reducer';

const rootReducer = {
   accountManager,
   postSlice,
   selectLabelSlice,
   OverlaySlice,
   register,
   login,
   loadingSlice,
   alertSlice,
   postAuthorSlice,
   postRoleAdminSlice,
   postListSlice,
   userDetailSlice,
   postListSearchSlice,
};

export default rootReducer;
