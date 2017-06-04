import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  user: { username: 'Shiqi Wang'},
  menu: computed(function () {
    const i18n = this.get('i18n');
    return Ember.A([
      {
        label: i18n.t('labels.index'),
        icon: 'zmdi zmdi-home',
        route: 'index'
      }, {
        label: i18n.t('labels.host-scan'),
        icon: 'zmdi zmdi-devices',
        submenu: [{
          label: i18n.t('labels.hosts'),
          route: 'hosts'
        }]
      }, {
        label: i18n.t('labels.ids'),
        icon: 'zmdi zmdi-remote-control-alt',
        submenu: [{
          label: i18n.t('labels.alerts'),
          route: 'alerts'
        }, {
          label: i18n.t('labels.dns-records'),
          route: 'dns-records'
        }, {
          label: i18n.t('labels.fileinfo-records'),
          route: 'fileinfo-records'
        }, {
          label: i18n.t('labels.tls-records'),
          route: 'tls-records'
        }, {
          label: i18n.t('labels.http-records'),
          route: 'http-records'
        }, {
          label: i18n.t('labels.ssh-records'),
          route: 'ssh-records'
        }]
      }, {
        label: i18n.t('labels.nodes'),
        icon: 'zmdi zmdi-apps',
        route: 'nodes'
      }, {
        label: i18n.t('labels.jobs'),
        icon: 'zmdi zmdi-format-list-numbered',
        route: 'jobs'
      }, {
        label: i18n.t('labels.setting'),
        icon: 'zmdi zmdi-settings',
        route: 'setting'
      }
    ])
  })
});
