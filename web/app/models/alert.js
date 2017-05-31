import DS from 'ember-data';

const {
  attr
} = DS

export default DS.Model.extend({
  timestamp: attr('date'),
  flowId: attr(),
  inIface: attr(),
  srcIp: attr(),
  srcPort: attr(),
  destIp: attr(),
  destPort: attr(),
  proto: attr(),
  txId: attr(),
  alert: attr(),
  host: attr()
});
