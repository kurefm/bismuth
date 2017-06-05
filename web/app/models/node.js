import DS from 'ember-data';
import Ember from 'ember';

const {
  attr
} = DS;

const {
  computed
} = Ember;

export default DS.Model.extend({
  arch: attr(),
  platform: attr(),
  release: attr(),
  cpus: attr(),
  freemem: attr(),
  totalmem: attr(),
  hostname: attr(),
  uptime: attr(),
  netifs: attr(),
  mode: attr(),
  lastOnline: attr('date'),
  isOnline: computed('lastOnline', function() {
    // 5 min
    return (new Date() - this.get('lastOnline') <= 300000);
  }),
  isConfigurable: computed('mode', function () {
    return this.get('mode').includes('hs') || this.get('mode').includes('ids');
  })
});
