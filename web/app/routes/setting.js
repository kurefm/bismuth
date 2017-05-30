import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  ajax: service(),
  model() {
    return this.get('ajax').request('/api/v1/config');
  },

  actions: {
    update(model) {
      return this.get('ajax').put('/api/v1/config', { data: JSON.stringify(model) });
    }
  }
});
