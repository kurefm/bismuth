import Ember from 'ember';

/** global numeral **/

export function numeralHelper([value], { format }) {
  return numeral(value).format(format);
}

export default Ember.Helper.helper(numeralHelper);
