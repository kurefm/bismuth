import Ember from 'ember';

export default Ember.Component.extend({
  elementId: 'header',
  tagName: 'header',
  classNames: ['clearfix'],
  attributeBindings: ['data-current-skin'],

  'data-current-skin': 'blue',

  indexRoute: 'index'
});
