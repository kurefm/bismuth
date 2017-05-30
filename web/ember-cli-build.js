/* eslint-env node */
const Funnel = require('broccoli-funnel');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // bootstrap
  app.import('bower_components/bootstrap/js/affix.js');
  app.import('bower_components/bootstrap/js/alert.js');
  app.import('bower_components/bootstrap/js/button.js');
  app.import('bower_components/bootstrap/js/carousel.js');
  app.import('bower_components/bootstrap/js/collapse.js');
  app.import('bower_components/bootstrap/js/dropdown.js');
  app.import('bower_components/bootstrap/js/modal.js');
  app.import('bower_components/bootstrap/js/tooltip.js');
  app.import('bower_components/bootstrap/js/popover.js');
  app.import('bower_components/bootstrap/js/scrollspy.js');
  app.import('bower_components/bootstrap/js/tab.js');
  app.import('bower_components/bootstrap/js/transition.js');

  // malihu-custom-scrollbar-plugin
  app.import('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js');
  app.import('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css');

  app.import('bower_components/bootstrap-sweetalert/lib/sweet-alert.css');
  app.import('bower_components/animate.css/animate.css');
  app.import('bower_components/material-design-iconic-font/css/material-design-iconic-font.css');

  app.import('bower_components/bootstrap-sweetalert/dist/sweetalert.js');
  app.import('bower_components/bootstrap-sweetalert/dist/sweetalert.css');

  app.import('bower_components/numeral/src/numeral.js');
  // app.import('vendor/material_admin/js/functions.js');

  return app.toTree(new Funnel('bower_components/material-design-iconic-font', {
    srcDir: '/fonts',
    destDir: '/fonts'
  }));
};
