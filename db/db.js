/* eslint-disable @typescript-eslint/no-var-requires */
const knex = require('knex');
const knexFile = require('./knexfile');

const db = knex(knexFile.development);
module.exports = db;
