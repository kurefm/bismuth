import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      "up_reason": "arp-response",
      "mac": "B0:83:FE:B8:11:B8",
      "vendor": "Dell",
      "ipv4": "192.168.8.107",
      "scan_at": new Date(1495456619685)
    }, {
      "up_reason": "arp-response",
      "mac": "0C:C4:7A:1C:80:78",
      "vendor": "Super Micro Computer",
      "ipv4": "192.168.8.124",
      "scan_at": new Date(1495456519685)
    }, {
      "up_reason": "arp-response",
      "mac": "44:39:C4:51:A9:E7",
      "vendor": "Universal Global Scientific Industrial",
      "ipv4": "192.168.8.210",
      "scan_at": new Date(1495456519685)
    }, {
      "up_reason": "arp-response",
      "mac": "52:54:00:3E:B2:8E",
      "vendor": "QEMU virtual NIC",
      "ipv4": "192.168.8.241",
      "scan_at": new Date(1495456519685)
    }, {
      "up_reason": "arp-response",
      "mac": "00:90:28:01:20:79",
      "vendor": "Nippon Signal",
      "ipv4": "192.168.8.1",
      "scan_at": new Date(1495456519685)
    }, {
      "up_reason": "arp-response",
      "mac": "DC:85:DE:12:EE:6A",
      "vendor": "AzureWave Technology",
      "ipv4": "192.168.8.139",
      "scan_at": new Date(1495456519685)
    }, {
      "up_reason": "arp-response",
      "mac": "30:FC:68:A0:76:AD",
      "vendor": "Tp-link Technologies",
      "ipv4": "192.168.8.253",
      "scan_at": new Date(1495456219685)
    }, {
      "up_reason": "arp-response",
      "mac": "44:39:C4:51:AA:6D",
      "vendor": "Universal Global Scientific Industrial",
      "ipv4": "192.168.8.35",
      "scan_at": new Date(1495446519685)
    }];
  }
});
