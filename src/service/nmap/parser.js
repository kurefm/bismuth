const { has, get, isArray, merge, mapKeys, isEqual } = require('lodash');

function getAddress(json, type) {
  for (let { $ } of json) {
    if ($.addrtype === type) {
      return $;
    }
  }
}

function parseHosts(json) {
  if (!has(json.nmaprun, 'host') && !isArray(get(json.nmaprun, 'host'))) {
    return [];
  }
  let scan_at = getTime(json);
  return json.nmaprun.host.map(item => {
    return merge(parseHost(item), {
      scan_at
    });
  });
}

function parseHost(host) {
  let result = {
    up_reason: host.status[0].$.reason,
  };
  let mac = getAddress(host.address, 'mac');
  let ipv4 = getAddress(host.address, 'ipv4');

  if (has(mac, 'addr')) result.mac = mac.addr;
  if (has(mac, 'vendor')) result.vendor = mac.vendor;
  if (has(ipv4, 'addr')) result.ipv4 = ipv4.addr;

  return result;
}

function parsePorts(json) {
  if (!has(json.nmaprun, 'host') && !isArray(get(json.nmaprun, 'host'))) {
    return [];
  }
  let scan_at = getTime(json);
  let result = [];
  for (let host of json.nmaprun.host) {
    if (!has(host, 'ports[0].port') && !isArray(get(host, 'ports[0].port'))) {
      continue;
    }
    for (let port of host.ports[0].port) {
      result.push(merge(
        parsePort(port),
        parseHost(host),
        { scan_at }
      ));
    }
  }
  return result;
}

function parsePort(port) {
  return merge(
    get(port, '$'),
    { open_reason: get(port, 'state[0].$.reason') },
    get(port, 'service[0].$')
  );
}

function parseOSs(json) {
  if (!has(json.nmaprun, 'host') && !isArray(get(json.nmaprun, 'host'))) {
    return [];
  }
  let scan_at = getTime(json);
  let result = [];
  for (let host of json.nmaprun.host) {
    if (!has(host, 'os') && !isArray(get(host, 'os'))) {
      continue;
    }
    for (let os of host.os) {
      result.push(merge(
        mapKeys(parseOS(os), (v, k) => isEqual(k, 'vendor') ? 'os_vendor' : k),
        parseHost(host),
        { scan_at }
      ));
    }
  }
  return result;
}

function parseOS(os) {
  return merge(
    { name: get(os, 'osmatch[0].$.name') },
    get(os, 'osmatch[0].osclass[0].$'),
    { cpe: get(os, 'osmatch[0].osclass[0].cpe[0]') }
  );
}

/**
 * epoch_millis
 *
 * @param {any} json
 */
function getTime({ nmaprun }) {
  return has(nmaprun, 'runstats[0].finished') ? parseInt(nmaprun.runstats[0].finished[0].$.time) * 1000 : 0;
}

function parse(json) {
  return {
    hosts: parseHosts(json),
    ports: parsePorts(json),
    os: parseOSs(json),
  };
}

module.exports = {
  getTime,
  parseHosts,
  parsePorts,
  parseOSs,
  parse
};
