export function errorMiddleware() {
  return  (ctx, next) => {
    try {
       next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        code: ctx.status,
        msg: err.message
      };
      ctx.app.emit('error', err, ctx);
    }
  };
};
