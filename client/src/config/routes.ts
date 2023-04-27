const routes = {
   // client
   home: '/',
   login: '/login',
   register: '/register',
   emailVerify: '/email-verify',
   verifyEmailSuccess: '/auth/verify-email/:token',
   userInfo: '/user/:userId',
   listPostSearch: '/list-post-search',
   fogotPasswords: '/forgot-password',
   postDetail: '/post-detail/:postId',
   // private routes
   profile: '/profile',
   chat: '/chat',
   post: '/post',
   managePosts: '/manage/posts?/:options',
   postFavourite: '/post-favourite',
   editProfile: '/edit/profile',

   //    adminClient
   homeAdmin: '/admin',
   postManager: '/admin/manage/post',
   accountManager: '/admin/manage/account',
   categoryManager: '/admin/manage/category',
};

export default routes;
