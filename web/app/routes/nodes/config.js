import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model({ id }) {
    return this.store.findRecord('config', id);
  },

  actions: {
    update(config) {
      return config.save();
    }
  }
});
