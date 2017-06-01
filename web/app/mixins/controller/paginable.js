import Ember from 'ember';

export default Ember.Mixin.create({
  limit: 10,
  page: 1,
  windowSize: 5,
  total: Ember.computed.oneWay('model.meta.total'),

  hasRecord: Ember.computed('total', function() {
    return this.get('total') !== 0;
  }),

  startPage: Ember.computed('page', function() {
    let startPage = 1;
    let currentPage = this.get('page');
    let totalPages = this.get('totalPages');

    if(this.windowSize >= totalPages) {
      return 1;
    }

    if(currentPage - Math.floor((this.windowSize / 2)) > 1) {
      startPage = currentPage - Math.floor((this.windowSize / 2));
    }
    if(startPage + (this.windowSize - 1) >= totalPages) {
      startPage = totalPages - this.windowSize + 1;
    }

    return startPage;
  }),

  totalPages: Ember.computed('total', 'limit', function() {
    let totalPages = Math.ceil(this.get('total') / this.get('limit'));

    return totalPages > 0 ? totalPages : 0;
  }),

  actions: {
    page(page) {
      this.set('page', page);
    }
  }
});
