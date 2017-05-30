import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card', 'animated', 'fadeInRight'],

  padding: false,

  didInsertElement() {
    this._super(...arguments);
    if (this.get('padding')) {
      this.$('.card-body').addClass('card-padding');
    }
  }
});
