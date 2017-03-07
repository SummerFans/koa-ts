import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as convert from 'koa-convert';
import * as logger from 'koa-logger';
import * as views from 'koa-views';

const app = new koa();
import CONFIG from './config';
import { errorMiddleware } from './middleware/error';

app.use(convert(logger()));
app.use(convert(bodyParser()));
app.use(convert(errorMiddleware()));
app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

const modules = require('./modules');
modules(app);

app.listen(CONFIG.PORT, () => {
  console.log(`Server started on ${CONFIG.PORT}`);
});
