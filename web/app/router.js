import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('index', { path: '/' }, function () {
    this.route('jobs', { resetNamespace: true });
    this.route('hosts', { resetNamespace: true }, function() {});
    this.route('alerts', { resetNamespace: true });
    this.route('dns-records', { resetNamespace: true });
    this.route('fileinfo-records', { resetNamespace: true });
    this.route('tls-records', { resetNamespace: true });
    this.route('http-records', { resetNamespace: true });
    this.route('ssh-records', { resetNamespace: true });
    this.route('nodes', { resetNamespace: true }, function() {
      this.route('config', { path: '/:id/config'});
    });
  });
});

export default Router;
