const { simpleSearch } = require('../es');

function alerts(page = 1, limit = 10) {
  return simpleSearch('suricata', 'alert', page, limit, { sort: 'timestamp:desc' });
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
  dnsRecords,
  tlsRecords,
  fileinfoRecords,
  httpRecords,
  sshRecords
};
