import * as glob from 'glob';
import * as Router from 'koa-router';

exports = module.exports = (app) => {
  glob(`${__dirname}/*`, { ignore: '**/index.js*' }, (err, matches) => {
    if (err) { throw err; }

    matches.forEach((mod) => {
      const router = require(`${mod}/router`);
      const routes = router.default;
      const baseUrl = router.baseUrl;
      // 增加版本号
      const instance = new Router({ prefix: baseUrl });
      routes.forEach((config) => {
        const {
          method = '',
          route = '',
          handlers = []
        } = config;
        const lastHandler = handlers.pop();
        instance[method.toLowerCase()](route, ...handlers, async (ctx) => {
           await lastHandler(ctx);
        });

        app.use(instance.routes());
        app.use(instance.allowedMethods());
      });
    });

  });
};
