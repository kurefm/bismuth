import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL(modelName, id) {
    return `/${this.namespace}/nodes/${id}/config`;
  }
});
