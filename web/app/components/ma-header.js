import Ember from 'ember';

export default Ember.Component.extend({
  elementId: 'header',
  tagName: 'header',
  classNames: ['clearfix', 'animated', 'fadeInDown'],
  attributeBindings: ['data-current-skin'],

  'data-current-skin': 'blue',

  indexRoute: 'index'
});
