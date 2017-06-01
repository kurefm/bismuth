import Ember from 'ember';
import PaginableRoute from '../mixins/route/paginable';

export default Ember.Route.extend(PaginableRoute, {
  modelName: 'fileinfo-record'
});
