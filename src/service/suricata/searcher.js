const { simpleSearch } = require('../es');

function alerts(page = 1, limit = 10) {
  return simpleSearch('suricata', 'alert', page, limit);
}

function dnsRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'dns', page, limit);
}

function tlsRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'tls', page, limit);
}

function fileinfoRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'fileinfo', page, limit);
}

function httpRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'http', page, limit);
}

function sshRecords(page = 1, limit = 10) {
  return simpleSearch('suricata', 'ssh', page, limit);
}

module.exports = {
  alerts,
  dnsRecords,
  tlsRecords,
  fileinfoRecords,
  httpRecords,
  sshRecords
};
