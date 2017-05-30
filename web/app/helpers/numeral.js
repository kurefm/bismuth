import Ember from 'ember';

/** global numeral **/

export function numeral([value], { format }) {
  return numeral(value).format(format);
}

export default Ember.Helper.helper(numeral);
