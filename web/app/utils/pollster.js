import Ember from 'ember';

const {
  run,
  run: { later, cancel }
} = Ember;

export default Ember.Object.extend({
  _isRunning: false,
  interval: 1000,
  _handle: null,

  start() {
    this.set('_isRunning', true);
    this._poll();
  },

  _poll() {
    if (this.get('_isRunning')) {
      cancel(this._handle);
      this._handle = later(() => {
        run(this.get('callback'));
        this._poll();
      }, this.get('interval'));
    }
  },

  stop() {
    this.set('_isRunning', false);
    if(this._handle) {
      cancel(this._handle);
    }
  }
});
