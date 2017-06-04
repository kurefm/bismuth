import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('node', {}).then(r => r.sortBy('lastOnline').reverse());
  }
});
