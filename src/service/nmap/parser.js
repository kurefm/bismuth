const { has } = require('lodash');

function getAddress(json, type) {
  for (let { $ } of json) {
    if ($.addrtype === type) {
      return $;
    }
  }
}

/**
 * {
 *   ipv4,
 *   mac,
 *   vendor,
 *   up_reason,
 *   scan_at
 * }
 * @param {any} json
 */
function parseHost(json) {
  let scan_at = parseInt(json.nmaprun.runstats[0].finished[0].$.time);
  return json.nmaprun.host.map(host => {
    let result = {
      up_reason: host.status[0].$.reason,
      scan_at
    };
    let mac = getAddress(host.address, 'mac');
    let ipv4 = getAddress(host.address, 'ipv4');

    if (has(mac, 'addr')) result.mac = mac.addr;
    if (has(mac, 'vendor')) result.vendor = mac.vendor;
    if (has(ipv4, 'addr')) result.ipv4 = ipv4.addr;

    return result;
  });
}

/**
 * {
 *   ipv4,
 *   mac,
 *   vendor,
 *   up_reason,
 *   scan_at,
 *
 * }
 * @param {any} json
 */
function parsePort(json) {

}

module.exports = {
  parseHost
};
