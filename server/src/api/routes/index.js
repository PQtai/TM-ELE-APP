import postRouter from './post.router.js';
import userRouter from './user.router.js'
import categoryRouter from './category.router.js';

const routes = (app) => {
  app.use('/user', userRouter);
  app.use('/post', postRouter);
  app.use('/category', categoryRouter);
};

export default routes;
