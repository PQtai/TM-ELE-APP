import accountManager from '~/pages/admin/AccountManager/accountManager.reducer';
import register from '~/pages/Register/register.reducer';
import login from '~/pages/Login/login.reducer';
import postSlice from '~/pages/client/Post/post.reducer';
import selectLabelSlice from '~/components/SelectLabel/SelectLabel.reducer';
import OverlaySlice from '~/components/Overlay/overlay.reducer';
const rootReducer = {
   accountManager,
   postSlice,
   selectLabelSlice,
   OverlaySlice,
   register,
   login,
};

export default rootReducer;
