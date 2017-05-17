import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  didInsertElement() {
    this._super(...arguments);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $('html').addClass('ismobile');
    }
  }
});
