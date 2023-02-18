import postRouter from './post.router.js';
import userRouter from './user.router.js'
const routes = (app) => {
  app.use('/', postRouter);
  app.use('/user', userRouter);
  app.use('/post', postRouter);
};

export default routes;
