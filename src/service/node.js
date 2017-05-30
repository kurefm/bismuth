const { client } = require('./es');
const { waterfall } = require('async');
const { bismuth } = require('config');
const { get, merge } = require('lodash');

function getAlive(id) {
  return new Promise((resolve, reject) => {
    client.get({
      index: bismuth.alive.index,
      type: bismuth.alive.type,
      id
    }).then(resp => resolve(get(resp, '_source.lastOnline', 0)), reject);
  });
}

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
      },
      (nodes, callback) => {
        Promise.all(nodes.map(node => getAlive(node.id))).then(lastOnlines => {
          lastOnlines.forEach((lastOnline, index) => {
            nodes[index].last_online = lastOnline;
          });
          callback(null, nodes);
        }, callback);
      }
    ], (error, hosts) => {
      if (error) reject(error);
      resolve(hosts);
    });
  });
}

function getConfig(id) {
  return new Promise((resolve, reject) => {
    client.get({
      index: bismuth.config.index,
      type: bismuth.config.type,
      id
    }).then(resp => resolve(get(resp, '_source', {})), reject);
  });
}

function updateConfig(id, config) {
  return new Promise((resolve, reject) => client.update({
    index: bismuth.config.index,
    type: bismuth.config.type,
    id,
    body: { doc: config }
  }).then(resolve, reject));
}

module.exports = {
  nodes,
  getConfig,
  updateConfig
};
