import DS from 'ember-data';
import Ember from 'ember';
import SuricataModel from '../mixins/model/suricata';

const {
  attr
} = DS

export default DS.Model.extend(SuricataModel, {
  ajax: Ember.inject.service(),

  txId: attr(),
  alert: attr(),
  read: attr('boolean'),
  readChanged: Ember.observer('read', function() {
    this.get('ajax')
      .post(`/api/v1/alerts/${this.get('id')}/${this.get('read') ? 'read': 'unread'}`)
      .then(() => this.reload());
  })
});
