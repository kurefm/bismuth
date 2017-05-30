const { client } = require('../es');
const { waterfall } = require('async');
const { get, merge } = require('lodash');

function createHostsMsearchBody(hosts) {
  let body = [];
  hosts.forEach(host => {
    body.push({ index: 'nmap', type: 'host' });
    body.push({
      query: {
        bool: {
          must: {
            term: { 'ipv4.raw': host }
          }
        }
      },
      size: 1,
      sort: [{ scan_at: { order: 'desc' } }]
    });
  });
  return body;
}

function hosts() {
  return new Promise((resolve, reject) => {
    waterfall([
      callback => {
        client.search({
          index: 'nmap',
          type: 'host',
          body: {
            size: 0,
            aggs: {
              hosts: {
                terms: {
                  field: 'ipv4.raw'
                }
              }
            }
          }
        }).then(
          resp => callback(null, get(resp, 'aggregations.hosts.buckets').map(host => host.key)),
          callback
          );
      },
      (hosts, callback) => {
        client.msearch({ body: createHostsMsearchBody(hosts) }).then(
          ({ responses }) => callback(null, responses.map(resp => merge(
            get(resp, 'hits.hits[0]._source'),
            { total: get(resp, 'hits.total') }
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
  hosts
};
