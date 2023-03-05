import postRouter from './post.router.js';
import userRouter from './user.router.js';
import conversationRouter from './conversation.router.js';
import messageRouter from './message.router.js';
const routes = (app) => {
  app.use('/user', userRouter);
  app.use('/post', postRouter);
  app.use('/conversation', conversationRouter);
  app.use('/message', messageRouter);
};

export default routes;
