const { client } = require('./es');
const { waterfall } = require('async');
const { bismuth } = require('config');
const { get, merge } = require('lodash');

function nodes() {
  return new Promise((resolve, reject) => {
    waterfall([
      callback => {
        client.search({
          index: bismuth.info.index,
          type: bismuth.info.type,
          size: 10000
        }).then(
          resp => callback(null, get(resp, 'hits.hits', []).map(node => merge(
            get(node, '_source'),
            { id: node._id }
          ))),
          callback
        );
      }
    ], (error, hosts) => {
      if (error) reject(error);
      resolve(hosts);
    });
  });
}

module.exports = {
  nodes
};
