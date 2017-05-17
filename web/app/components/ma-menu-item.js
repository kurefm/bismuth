import Ember from 'ember';

const {
  computed: { notEmpty }
} = Ember;

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['hasSubmenu:sub-menu'],

  item: {},

  hasSubmenu: notEmpty('item.submenu')
});
