const { Client, errors: { NoConnections } } = require('elasticsearch');
const { waterfall } = require('async');
const config = require('config').elasticsearch;
const { get, merge } = require('lodash');

const client = new Client({
  host: config.url
});

function waitElasticsearchStart() {
  return new Promise((resolve, reject) => {
    client.cluster.health({
      timeout: '5s'
    }, (error, resp, status) => {
      console.log(error instanceof NoConnections);
    });
  });
}

function indexExists(index) {
  return new Promise((resolve, reject) => {
    client.cluster.health({
      timeout: '5s', // tells es to not sit around and wait forever
      index,
      ignore: [408]
    }).then(resp => {
      if (!resp || resp.timed_out) {
        resolve(false);
      } else {
        resolve(true);
      }
    }, reject);
  });
}

function docExists(index, type, id) {
  return new Promise((resolve, reject) => {
    client.exists({
      index,
      type,
      id,
    }).then(resolve, reject);
  });
}

function createDoc(index, type, id, doc) {
  return new Promise((resolve, reject) => {
    client.create({
      index,
      type,
      id,
      body: doc
    }).then(resolve, reject);
  });
}

function ifNotExistsThenCreateDoc(index, type, id, doc) {
  return new Promise((resolve, reject) => {
    waterfall([
      callback => indexExists(index).then(result => callback(null, result), callback),
      (exists, callback) => {
        if (exists === false) callback(null, false);
        else docExists(index, type, id).then(result => callback(null, result), callback);
      },
      (exists, callback) => {
        if (exists === true) callback();
        else createDoc(index, type, id, doc).then(() => callback(), callback);
      }
    ], error => {
      if (error) reject(error);
      resolve();
    });
  });
}

function simpleSearch(index, type, page, limit) {
  return new Promise((resolve, reject) => {
    client.search({
      index,
      type,
      size: limit,
      from: (page - 1) * limit
    }).then(simplify, reject).then(resolve);
  });
}

function simplify(resp) {
  let simpled = get(resp, 'hits.hits', []).map(item =>
    merge(item._source, { id: item._id })
  );
  simpled.meta = { total: Math.min(get(resp, 'hits.total', 0), 10000) };
  return simpled;
}

module.exports = {
  client,
  waitElasticsearchStart,
  ifNotExistsThenCreateDoc,
  simpleSearch
};
