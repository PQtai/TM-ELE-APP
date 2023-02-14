import postRouter from './post.router.js';
const routes = (app) => {
  app.use('/', postRouter);
};
export default routes;
