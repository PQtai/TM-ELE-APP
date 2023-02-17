import postRouter from './post.router.js';
import userRouter from './user.router.js'
const routes = (app) => {
  app.use('/', postRouter);
  app.use('/user', userRouter);
};

export default routes;
