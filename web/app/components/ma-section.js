import Ember from 'ember';

export default Ember.Component.extend({
  elementId: 'main',
  tagName: 'section',
  attributeBindings: ['data-layout'],

  'data-layout': 'layout-1'
});
