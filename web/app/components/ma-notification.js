import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['dropdown'],
  header: 'Notification',
  titlePath: 'title',
  descPath: 'desc',

  hasNotification: Ember.computed.gt('total', 0)
});
