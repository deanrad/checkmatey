Package.describe({
  name: 'deanius:dispatch',
  version: '0.8.9',
  summary: 'Business Process Layer',
});

Npm.depends({
  'lodash': '4.17.1',
  'mongodb-diff': '0.4.3',
  redux: '3.6.0',
  'redux-act': '1.1.0',
  rxjs: '5.0.0-rc.3',
  'redux-observable': '0.12.1',
  uuid: '2.0.3',
});

Package.onUse((api) => {
  api.versionsFrom('1.4.1.1');
  api.use('ecmascript');
  api.use('promise');
  api.use('mongo');
  api.use('underscore');
  api.use('webapp');
  api.use('deanius:uni-method@1.0.1');

  api.mainModule('index.js', ['client', 'server']);
});
