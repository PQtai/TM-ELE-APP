import postRouter from './post.router.js';
const routes = (app) => {
  app.use('/post', postRouter);
};
export default routes;
