import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Route.extend({
  title: computed(function() {
    return this.get('i18n').t('app.name');
  })
});
