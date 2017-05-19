import Ember from 'ember';
import Pollster from '../utils/pollster';

export default Ember.Mixin.create({
  interval: 10000,

  init() {
    this._super(...arguments);
    this.set('pollster', Pollster.create({
      callback: () => this.model().then(r => this.set('controller.model', r)),
      interval: this.get('interval')
    }));
  },

  setupController() {
    this._super(...arguments);
    this.get('pollster').start();
  },

  deactivate() {
    this.get('pollster').stop();
  }
});
