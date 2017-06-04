import DS from 'ember-data';

const {
  attr
} = DS;

export default DS.Model.extend({
  'hs:hostDetection:cron': attr(),
  'hs:network': attr(),
  'hs:osDetection:auto': attr('boolean'),
  'hs:versionDetection:auto': attr('boolean'),

  'ids:vars:address-groups': attr(),
  'ids:vars:port-groups': attr(),
  'ids:enable-rules': attr(),
  'ids:available-rules': attr('one-way-to-client')
});
