import DS from 'ember-data';
import SuricataModel from '../mixins/model/suricata';

const {
  attr
} = DS

export default DS.Model.extend(SuricataModel, {
  ssh: attr()
});
