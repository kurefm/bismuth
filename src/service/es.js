const { Client } = require('elasticsearch');
const config = require('../config').elasticsearch;
const client = new Client({
  hosts: config.nodes
});

module.exports = client;
