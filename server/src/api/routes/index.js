import postRouter from './post.router.js';
import conversationRouter from './conversation.router.js';
import messageRouter from './message.router.js';
import authRouter from './auth.router.js';
import categoryRouter from './category.router.js';

const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/post', postRouter);
  app.use('/conversation', conversationRouter);
  app.use('/message', messageRouter);
  app.use('/category', categoryRouter);
};

export default routes;
