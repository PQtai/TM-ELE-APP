import postRouter from './post.router.js';
import authRouter from './auth.router.js';
import categoryRouter from './category.router.js';

const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/post', postRouter);
  app.use('/category', categoryRouter);
};

export default routes;

