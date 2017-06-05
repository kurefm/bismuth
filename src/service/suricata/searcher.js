const { simpleSearch, simpleGet, client } = require('../es');
const { merge } = require('lodash');

function alerts(page = 1, limit = 10, query = {}) {
  return simpleSearch('suricata', 'alert', page, limit, merge({ sort: 'timestamp:desc' }, { body: query }));
}

function getAlert(id) {
  return simpleGet('suricata', 'alert', id);
}

function updateAlertRead(id, read = true) {
  return new Promise((resolve, reject) => {
    client.update({
      index: 'suricata',
      type: 'alert',
      id,
      body: {
        doc: {
          read: read
        }
      }
    }).then(resolve, reject);
  });
}

function dnsRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'dns', page, limit, { sort: 'timestamp:desc' });
}

function tlsRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'tls', page, limit, { sort: 'timestamp:desc' });
}

function fileinfoRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'fileinfo', page, limit, { sort: 'timestamp:desc' });
}

function httpRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'http', page, limit, { sort: 'timestamp:desc' });
}

function sshRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'ssh', page, limit, { sort: 'timestamp:desc' });
}

module.exports = {
  alerts,
  getAlert,
  updateAlertRead,
  dnsRecords,
  tlsRecords,
  fileinfoRecords,
  httpRecords,
  sshRecords
};
