Package.describe({
  name: 'deanius:dispatch',
  version: '0.1.0',
  summary: 'Business Process Layer',
});

Npm.depends({
  'mongodb-diff': '0.4.3',
  redux: '3.6.0',
  'redux-act': '1.1.0',
  rxjs: '5.0.0-rc.3',
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
