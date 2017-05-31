import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',

  classNames: ['pagination'],
  classNameBindings: ['sizingClassName'],

  start: 1,
  current: 1,
  size: 9,
  total: 1,
  url: '',

  show: Ember.computed.gt('total', 1),

  sizingClassName: Ember.computed('sizing', {
    get() {
      if (this.get('sizing') === 'large') {
        return 'pagination-lg';
      }

      if (this.get('sizing') === 'small') {
        return 'pagination-sm';
      }

      return '';
    }
  }),

  prev: Ember.computed('current', {
    get() {
      return this.get('current') > 1 ? this.get('current') - 1 : 1;
    }
  }),

  next: Ember.computed('current', 'total', {
    get() {
      return this.get('current') < this.get('total') ? this.get('current') + 1 : this.get('total');
    }
  }),

  end: Ember.computed('start', 'total', {
    get() {
      return this.get('start') + this.get('size') - 1 >= this.get('total') ? this.get('total') : this.get('start') + this.get('size') - 1;
    }
  }),

  content: Ember.computed('start', 'end', 'current', {
    get() {
      var content = Ember.A();
      content.pushObject(Ember.Object.create({ page: 1, text: Ember.String.htmlSafe('<i class="zmdi zmdi-more-horiz"></i>') }));
      content.pushObject(Ember.Object.create({ page: this.get('prev'), text: Ember.String.htmlSafe('<i class="zmdi zmdi-chevron-left"></i>') }));

      for(var i = this.get('start'); i <= this.get('end'); i++) {
        content.pushObject(Ember.Object.create({ page: i, text: i }));
      }

      content.pushObject(Ember.Object.create({ page: this.get('next'), text: Ember.String.htmlSafe('<i class="zmdi zmdi-chevron-right"></i>') }));
      content.pushObject(Ember.Object.create({ page: this.get('total'), text: Ember.String.htmlSafe('<i class="zmdi zmdi-more-horiz"></i>') }));

      return content;
    }
  }),

  actions: {
    page(page) {
      this.triggerAction({ action: 'page', actionContext: page });
    }
  }
});
