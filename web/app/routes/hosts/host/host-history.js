import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    return this.get('ajax').request(`/api/v1/hosts/${this.modelFor('hosts.host').get('ipv4')}/host-history`)
      .then(resp => resp.hosts.map(host => {
        host.scan_at = new Date(host.scan_at);
        return host;
      }));
  }
});
