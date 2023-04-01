const routes = {
   // client
   home: '/',
   login: '/login',
   register: '/register',
   emailVerify: '/email-verify',
   verifyEmailSuccess: '/auth/verify-email/:token',
   // private routes
   profile: '/profile',
   chat: '/chat',
   post: '/post',

   //    adminClient
   homeAdmin: '/admin',
   postManager: '/admin/manage/post',
   accountManager: '/admin/manage/account',
   categoryManager: '/admin/manage/category',
};

export default routes;
