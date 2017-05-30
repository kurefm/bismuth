import DS from 'ember-data';

const {
  attr
} = DS;

export default DS.Model.extend({
  upReason: attr(),
  mac: attr(),
  vendor: attr(),
  ipv4: attr(),
  scanAt: attr('date'),
  total: attr()
});
