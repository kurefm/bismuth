import Ember from 'ember';
import PollsterMixin from '../mixins/pollster';

export default Ember.Route.extend(PollsterMixin, {
  model() {
    return this.store.query('alert', { read: false });
  }
});
