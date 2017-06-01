import Ember from 'ember';
import DS from 'ember-data';

const {
  attr
} = DS;


export default Ember.Mixin.create({
  timestamp: attr('date'),
  flowId: attr(),
  inIface: attr(),
  srcIp: attr(),
  srcPort: attr(),
  destIp: attr(),
  destPort: attr(),
  proto: attr(),
  host: attr()
});
