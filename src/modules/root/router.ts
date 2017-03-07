import * as ctl from './controller';

export const baseUrl = '/';

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      ctl.IndexPage
    ]
  }
];
