import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    limit: { refreshModel: true },
    page: { refreshModel: true }
  },
  model({ limit, page}) {
    return this.store.query(this.get('modelName'), { limit, page });
  }
});
