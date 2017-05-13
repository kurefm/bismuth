const client = require('../es');
const { bismuth } = require('../../config');
const logger = require('../../logger').elasticsearch;
const { merge } = require('lodash');
const { waterfall } = require('async');

let config = {};

function indexExists() {
  return new Promise((resolve, reject) => {
    client.cluster.health({
      timeout: '5s', // tells es to not sit around and wait forever
      index: bismuth.index,
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

function configExists() {
  return new Promise((resolve, reject) => {
    client.exists({
      index: bismuth.index,
      type: bismuth.type,
      id: bismuth.id,
    }).then(resolve, reject);
  });
}

function initConfig() {
  return new Promise((resolve, reject) => {
    client.create({
      index: bismuth.index,
      type: bismuth.type,
      id: bismuth.id,
      body: require('./default')
    }).then(resolve, reject);
  });
}

function init() {
  return new Promise((resolve, reject) => {
    waterfall([
      callback => indexExists().then(result => callback(null, result), callback),
      (exists, callback) => {
        if (exists === false) callback(null, false);
        else configExists().then(result => callback(null, result), callback);
      },
      (exists, callback) => {
        if (exists === true) callback();
        else initConfig().then(() => callback(), callback);
      }
    ], error => {
      if (error) reject(error);
      load().then(resolve, reject);
    });
  });
}

function load() {
  return new Promise((resolve, reject) => {
    client.get({
      index: bismuth.index,
      type: bismuth.type,
      id: bismuth.id
    }, (error, resp) => {
      if (error) reject(error);
      if (resp) {
        config = resp._source;
        resolve(resp._source);
      }
      reject(resp);
    });
  });
}

function update(config) {
  return client.update({
    index: bismuth.index,
    type: bismuth.type,
    id: bismuth.id,
    body: { doc: config }
  });
}

module.exports = {
  init,
  load,
  update,
  config: () => config
};



