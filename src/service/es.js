const { Client, errors: { NoConnections } } = require('elasticsearch');
const { waterfall } = require('async');
const config = require('config').elasticsearch;
const { get, merge } = require('lodash');
const { wait } =require('../utils');
const logger = require('../logger').base;

const client = new Client({
  host: config.url
});

const WAIT_MS = 2000;

function waitElasticsearchStart() {
  return isElasticsearchStart().then(isStart => {
    if (!isStart) {
      logger.warn('Waiting elasticsearch start');
      return wait(WAIT_MS).then(()=> waitElasticsearchStart());
    }
  });
}

function isElasticsearchStart() {
  return new Promise((resolve, reject) => {
    client.cluster.health({
      timeout: '5s'
    }, (error) => {
      if (error instanceof NoConnections) resolve(false);
      else if (error) reject(error);
      resolve(true);
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

function simpleSearch(index, type, page = 1, limit = 10, opts = {}) {
  return new Promise((resolve, reject) => {
    client.search(merge({
      index,
      type,
      size: limit,
      from: (page - 1) * limit,
    }, opts)).then(simplify, reject).then(resolve);
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
