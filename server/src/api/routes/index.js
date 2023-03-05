import postRouter from './post.router.js';
import authRouter from './auth.router.js';
const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/post', postRouter);
};

export default routes;
