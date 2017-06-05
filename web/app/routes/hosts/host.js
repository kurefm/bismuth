import Ember from 'ember';

export default Ember.Route.extend({
  model({ ip }) {
    return this.store.findRecord('host', ip);
  }
});
