import Ember from 'ember';

export function listItem(args) {
  let index = args[0];
  let pageNumber = Ember.isEmpty(args[1]) ? 1 : args[1];
  let pageSize = Ember.isEmpty(args[2]) ? 10 : args[2];

  return index + 1 + (pageNumber - 1) * pageSize;
}

export default Ember.Helper.helper(listItem);
