/* eslint-env node */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'bismuth',
    environment: environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    i18n: {
      defaultLocale: 'zh-cn'
    },

    moment: {
      includeTimezone: 'all',
      allowEmpty: true,
      includeLocales: ['zh-cn']
    },

    'ember-form-for': {
      buttonClasses: ['btn'],
      fieldClasses: ['form-group'],
      fieldHasErrorClasses: 'has-error',
      errorClasses: ['help-block'],
      hintClasses: ['form-field--hint'],
      inputClasses: ['form-control'],
      labelClasses: ['control-label'],
      resetClasses: ['btn btn-default'],
      submitClasses: ['btn btn-primary'],
      errorsPath: 'error.PROPERTY_NAME.validation',
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
