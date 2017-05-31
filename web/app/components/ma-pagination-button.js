import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  classNameBindings: ['disabled:disabled', 'active:active'],

  disabled: Ember.computed('current', 'content.{page,text}', {
    get() {
      let page = this.get('content.page');
      return page !== this.get('content.text') && page === this.get('current');
    }
  }),

  active: Ember.computed('current', 'content.{page,text}', {
    get() {
      let page = this.get('content.page');
      return page === this.get('content.text') && page === this.get('current');
    }
  }),

  actions: {
    page(page) {
      this.triggerAction({ action: 'page', actionContext: page });
    }
  }
});
