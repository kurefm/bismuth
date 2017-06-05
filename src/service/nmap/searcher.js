const { client, simpleSearch } = require('../es');
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
                  field: 'ipv4.raw',
                  size: 10000,
                  order: {
                    _term: 'asc'
                  }
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

function host(ip) {
  return client.search({
    index: 'nmap',
    type: 'os',
    body: {
      "size": 1,
      "query": {
        "bool": {
          "must": {
            "term": { "ipv4.raw": { "value": ip } }
          }
        }
      },
      "sort": [
        { "scan_at": "desc" }
      ]
    }
  }).then(resp => get(resp, 'hits.hits[0]._source'));
}

function createPortsMsearchBody(ip,ports) {
  let body = [];
  ports.forEach(port => {
    body.push({ index: 'nmap', type: 'port' });
    body.push({
      query: {
        bool: {
          must: [
            {term: { 'ipv4.raw': ip }},
            {term: { 'portid.raw': port }}
          ]
        }
      },
      size: 1,
      sort: [{ scan_at: { order: 'desc' } }]
    });
  });
  return body;
}

function ports(ip) {
  return new Promise((resolve, reject) => {
    waterfall([
      callback => {
        client.search({
          index: 'nmap',
          type: 'port',
          body: {
            "query": {
              "bool": {
                "must": {
                  "term": { "ipv4.raw": { "value": ip }}
                }
              }
            },
            "aggs": {
              "ports": {
                "terms": { "field":	"portid.raw" }
              }
            },
            "size": 0
          }
        }).then(
          resp => callback(null, get(resp, 'aggregations.ports.buckets').map(ports => ports.key)),
          callback
          );
      },
      (ports, callback) => {
        client.msearch({ body: createPortsMsearchBody(ip, ports) }).then(
          ({ responses }) => callback(null, responses.map(resp => merge(
            get(resp, 'hits.hits[0]._source'),
            { total: get(resp, 'hits.total') }
          ))),
          callback
        );
      }
    ], (error, ports) => {
      if (error) reject(error);
      resolve(ports);
    });
  });
}

function osHistory(ip) {
    return client.search({
    index: 'nmap',
    type: 'os',
    body: {
      "size": 10000,
      "query": {
        "bool": {
          "must": [
            {"term": { "ipv4.raw":  { "value": ip }}}
          ]
        }
      },
      "sort": [
        { "scan_at": "desc" }
      ]
    }
  }).then(resp => get(resp, 'hits.hits').map(hits => hits._source));
}

function hostHistory(ip) {
    return client.search({
    index: 'nmap',
    type: 'host',
    body: {
      "size": 10000,
      "query": {
        "bool": {
          "must": [
            {"term": { "ipv4.raw":  { "value": ip }}}
          ]
        }
      },
      "sort": [
        { "scan_at": "desc" }
      ]
    }
  }).then(resp => get(resp, 'hits.hits').map(hits => hits._source));
}

module.exports = {
  hosts,
  host,
  ports,
  osHistory,
  hostHistory
};
