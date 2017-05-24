import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  menu: computed(function () {
    const i18n = this.get('i18n');
    return Ember.A([
      {
        label: i18n.t('labels.index'),
        icon: 'zmdi zmdi-home',
        route: 'index'
      }, {
        label: i18n.t('labels.host-scan'),
        icon: 'zmdi zmdi-laptop-mac',
        submenu: [{
          label: i18n.t('labels.hosts'),
          route: 'hosts'
        }]
      }, {
        label: i18n.t('labels.jobs'),
        icon: 'zmdi zmdi-shape',
        route: 'jobs'
      }, {
        label: i18n.t('labels.setting'),
        icon: 'zmdi zmdi-settings',
        route: 'setting'
      }
    ])
  })
});
