import postRouter from "./post.router.js";
import conversationRouter from "./conversation.router.js";
import messageRouter from "./message.router.js";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import categoryRouter from "./category.router.js";
import chatRouter from "./chat.router.js";
import reviewRouter from "./review.router.js";
import statisticRouter from "./statistic.router.js";

const routes = (app) => {
  app.use("/auth", authRouter);
  app.use("/auth", userRouter);
  app.use("/post", postRouter);
  app.use("/conversation", conversationRouter);
  app.use("/category", categoryRouter);
  app.use("/chat", chatRouter);
  app.use("/message", messageRouter);
  app.use("/review", reviewRouter);
  app.use("/stats", statisticRouter);
};

export default routes;
