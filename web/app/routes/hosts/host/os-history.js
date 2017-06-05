import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    return this.get('ajax').request(`/api/v1/hosts/${this.modelFor('hosts.host').get('ipv4')}/os-history`)
      .then(resp => resp.os.map(os => {
        os.scan_at = new Date(os.scan_at);
        return os;
      }));
  }
});
