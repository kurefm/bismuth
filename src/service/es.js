const { Client } = require('elasticsearch');
const { waterfall } = require('async');

const config = require('config').elasticsearch;

const client = new Client({
  host: config.url
});

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

function ensureExists(index, type, id, doc) {
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

module.exports = {
  client,
  ensureExists
};
