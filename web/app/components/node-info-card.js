import MaCard from './ma-card';
import Ember from 'ember';

const {
  computed
} = Ember;

export default MaCard.extend({
  title: computed('node.id', function() {
    return this.get('node.id').toUpperCase();
  })
});
