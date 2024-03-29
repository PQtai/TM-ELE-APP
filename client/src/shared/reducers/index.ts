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
import updateUserSlice from '~/pages/client/EditProfile/editProfile.reducer';
import listChatSlice from '~/pages/client/Chat/chat.reducer';
import listCategorySlice from '~/pages/admin/category/category.reducer';
import reviewSlice from '~/pages/client/Evaluate/evaluate.reducer';

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
    updateUserSlice,
    listChatSlice,
    listCategorySlice,
    reviewSlice,
};

export default rootReducer;
