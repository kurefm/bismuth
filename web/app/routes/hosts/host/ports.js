import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    return this.get('ajax').request(`/api/v1/hosts/${this.modelFor('hosts.host').get('ipv4')}/ports`)
      .then(resp => resp.ports.map(port => {
        port.scan_at = new Date(port.scan_at);
        return port;
      }));
  }
});
