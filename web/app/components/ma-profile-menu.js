import Ember from 'ember';

const {
  computed: { notEmpty }
} = Ember;

export default Ember.Component.extend({
  classNames: ['profile-menu'],

  menu: [],

  hasMenu: notEmpty('menu'),

  didInsertElement() {
    this._super(...arguments);
    /*
    * Profile Menu
    */
    $('body').on('click', '.profile-menu > a', function (e) {
      e.preventDefault();
      $(this).parent().toggleClass('toggled');
      $(this).next().slideToggle(200);
    });
  }
});
