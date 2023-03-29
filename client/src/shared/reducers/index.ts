import accountManager from '~/pages/admin/accountManager/accountManager.reducer';
import register from '~/pages/register/register.reducer';
import login from '~/pages/login/login.reducer';
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
