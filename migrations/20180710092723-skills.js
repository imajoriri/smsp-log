'use strict';

var dbm;
var type;
var seed;
var tableName = "skills";

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable(tableName, {
    id: {type: 'int', primaryKey: true},
    name: 'string',
    description: 'string',
    created_at: 'datetime',
    deleted_at: 'datetime',
  });
  return null;
};

exports.down = function(db) {
  db.dropTable(tableName);
  return null;
};

exports._meta = {
  "version": 1
};
